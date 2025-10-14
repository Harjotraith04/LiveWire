import { AIMessage, CodeSuggestion, AIContext as AIContextType } from "@/types/ai"
import { ReactNode, createContext, useContext, useState, useEffect } from "react"
import { useSocket } from "./SocketContext"
import { useAppContext } from "./AppContext"
import { useFileSystem } from "./FileContext"
import { useChatRoom } from "./ChatContext"
import { SocketEvent } from "@/types/socket"
import { v4 as uuidv4 } from "uuid"
import { formatDate } from "@/utils/formateDate"
import toast from "react-hot-toast"

interface AIContextValue {
    messages: AIMessage[]
    isAITyping: boolean
    pendingSuggestions: CodeSuggestion[]
    sendQuery: (query: string) => void
    acceptSuggestion: (suggestionId: string) => void
    rejectSuggestion: (suggestionId: string) => void
    clearMessages: () => void
}

const AIContext = createContext<AIContextValue | null>(null)

export const useAI = (): AIContextValue => {
    const context = useContext(AIContext)
    if (!context) {
        throw new Error("useAI must be used within AIProvider")
    }
    return context
}

export function AIProvider({ children }: { children: ReactNode }) {
    const { socket } = useSocket()
    const { currentUser, drawingData } = useAppContext()
    const { fileStructure, activeFile, setActiveFile } = useFileSystem()
    const { messages: chatMessages } = useChatRoom()

    const [messages, setMessages] = useState<AIMessage[]>([])
    const [isAITyping, setIsAITyping] = useState(false)
    const [pendingSuggestions, setPendingSuggestions] = useState<CodeSuggestion[]>([])

    /**
     * Build context for AI query
     */
    const buildAIContext = (query: string): AIContextType => {
        const context: AIContextType = {
            userQuery: query,
        }

        // Add current file context
        if (activeFile && activeFile.type === "file") {
            context.currentFile = {
                id: activeFile.id,
                name: activeFile.name,
                content: activeFile.content || "",
                language: activeFile.name.split(".").pop() || "text",
            }
        }

        // Add file structure context
        const buildStructureString = (item: any, depth = 0): string => {
            const indent = "  ".repeat(depth)
            let str = `${indent}- ${item.name}${item.type === "directory" ? "/" : ""}\n`
            if (item.children) {
                item.children.forEach((child: any) => {
                    str += buildStructureString(child, depth + 1)
                })
            }
            return str
        }
        context.fileStructure = buildStructureString(fileStructure)

        // Add drawing context if available
        if (drawingData && Object.keys(drawingData).length > 0) {
            context.drawingContext = `User has created diagrams/drawings in the canvas. Total elements: ${Object.keys(drawingData.store || {}).length}`
        }

        // Add recent chat history (last 10 messages)
        if (chatMessages.length > 0) {
            context.chatHistory = chatMessages.slice(-10).map((msg) => ({
                username: msg.username,
                message: msg.message,
            }))
        }

        return context
    }

    /**
     * Send query to AI
     */
    const sendQuery = (query: string) => {
        if (!query.trim()) return

        const messageId = uuidv4()
        const timestamp = formatDate(new Date().toISOString())

        // Create user message
        const userMessage: AIMessage = {
            id: messageId,
            query: query,
            response: "",
            timestamp: timestamp,
            username: currentUser.username,
            hasCodeSuggestion: false,
        }

        setMessages((prev) => [...prev, userMessage])

        // Build context and send to server
        const context = buildAIContext(query)
        socket.emit(SocketEvent.AI_QUERY, {
            query,
            context,
            messageId,
            roomId: currentUser.roomId,
            username: currentUser.username,
        })
    }

    /**
     * Validate code before acceptance
     */
    const validateCode = (code: string, language: string): { valid: boolean; error?: string } => {
        // Basic validation rules
        if (!code || code.trim().length === 0) {
            return { valid: false, error: "Code is empty" }
        }

        // Check for common placeholders that indicate incomplete code
        const placeholders = ["...", "// TODO", "// rest of code", "/* ... */", "# ..."]
        for (const placeholder of placeholders) {
            if (code.includes(placeholder)) {
                return { 
                    valid: false, 
                    error: "Code contains placeholders. Please request complete code from AI." 
                }
            }
        }

        // Language-specific validation
        const languageValidation: { [key: string]: () => { valid: boolean; error?: string } } = {
            javascript: () => {
                // Check for output - must have console.log
                if (!code.includes("console.log") && !code.includes("console.info") && !code.includes("console.warn")) {
                    return { 
                        valid: false, 
                        error: "JavaScript code must include console.log() to show output when executed" 
                    }
                }
                return { valid: true }
            },
            typescript: () => {
                // Check for output
                if (!code.includes("console.log") && !code.includes("console.info") && !code.includes("console.warn")) {
                    return { 
                        valid: false, 
                        error: "TypeScript code must include console.log() to show output when executed" 
                    }
                }
                return { valid: true }
            },
            python: () => {
                // Check for proper indentation (Python requirement)
                const lines = code.split("\n").filter(line => line.trim().length > 0)
                if (lines.length === 0) {
                    return { valid: false, error: "Python code is empty" }
                }
                // Check for output
                if (!code.includes("print(")) {
                    return { 
                        valid: false, 
                        error: "Python code must include print() to show output when executed" 
                    }
                }
                return { valid: true }
            },
            java: () => {
                // Check for class and main method
                if (!code.includes("class ") || !code.includes("public static void main")) {
                    return { 
                        valid: false, 
                        error: "Java code must include a class and main method" 
                    }
                }
                // Check for output
                if (!code.includes("System.out.print")) {
                    return { 
                        valid: false, 
                        error: "Java code must include System.out.println() to show output" 
                    }
                }
                return { valid: true }
            },
            cpp: () => {
                // Check for main function
                if (!code.includes("int main(")) {
                    return { 
                        valid: false, 
                        error: "C++ code must include main() function" 
                    }
                }
                // Check for output
                if (!code.includes("std::cout") && !code.includes("cout <<")) {
                    return { 
                        valid: false, 
                        error: "C++ code must include std::cout to show output" 
                    }
                }
                return { valid: true }
            },
            c: () => {
                // Check for main function
                if (!code.includes("int main(")) {
                    return { 
                        valid: false, 
                        error: "C code must include main() function" 
                    }
                }
                // Check for output
                if (!code.includes("printf(")) {
                    return { 
                        valid: false, 
                        error: "C code must include printf() to show output" 
                    }
                }
                return { valid: true }
            }
        }

        const validator = languageValidation[language.toLowerCase()]
        if (validator) {
            return validator()
        }

        // Default: code is valid
        return { valid: true }
    }

    /**
     * Accept code suggestion with validation
     */
    const acceptSuggestion = (suggestionId: string) => {
        const suggestion = pendingSuggestions.find((s) => s.id === suggestionId)
        if (!suggestion) {
            toast.error("Suggestion not found")
            return
        }

        // Validate the code before accepting
        const validation = validateCode(
            suggestion.suggestedCode, 
            activeFile?.name.split(".").pop() || "text"
        )

        if (!validation.valid) {
            toast.error(validation.error || "Invalid code")
            return
        }

        // Check if the file is still the same
        if (activeFile && activeFile.id === suggestion.fileId) {
            // Update the file with suggested code
            const updatedFile = {
                ...activeFile,
                content: suggestion.suggestedCode,
            }
            
            setActiveFile(updatedFile)

            // Emit file update to other users
            socket.emit(SocketEvent.FILE_UPDATED, {
                fileId: activeFile.id,
                newContent: suggestion.suggestedCode,
            })

            // Update suggestion status
            setPendingSuggestions((prev) =>
                prev.map((s) =>
                    s.id === suggestionId ? { ...s, status: "accepted" } : s
                )
            )

            // Notify other users
            socket.emit(SocketEvent.AI_CODE_ACCEPTED, {
                suggestionId,
                fileId: suggestion.fileId,
            })

            toast.success("✅ Code suggestion applied! You can now run it in the compiler.")
        } else {
            toast.error("File mismatch. Please ensure the correct file is open.")
        }
    }

    /**
     * Reject code suggestion with proper cleanup
     */
    const rejectSuggestion = (suggestionId: string) => {
        const suggestion = pendingSuggestions.find((s) => s.id === suggestionId)
        if (!suggestion) {
            toast.error("Suggestion not found")
            return
        }

        // Update suggestion status to rejected
        setPendingSuggestions((prev) =>
            prev.map((s) =>
                s.id === suggestionId ? { ...s, status: "rejected" } : s
            )
        )

        // Notify other users
        socket.emit(SocketEvent.AI_CODE_REJECTED, { suggestionId })

        // Remove from pending after a short delay (for visual feedback)
        setTimeout(() => {
            setPendingSuggestions((prev) =>
                prev.filter((s) => s.id !== suggestionId)
            )
        }, 1000)

        toast.success("❌ Code suggestion rejected and removed")
    }

    /**
     * Clear all messages
     */
    const clearMessages = () => {
        setMessages([])
        setPendingSuggestions([])
    }

    // Listen for AI responses
    useEffect(() => {
        const handleAIResponse = ({ messageId, response, error, codeSuggestion }: any) => {
            if (error) {
                toast.error(error)
                setMessages((prev) =>
                    prev.map((msg) =>
                        msg.id === messageId
                            ? { ...msg, response: `Error: ${error}` }
                            : msg
                    )
                )
                return
            }

            setMessages((prev) =>
                prev.map((msg) =>
                    msg.id === messageId
                        ? {
                              ...msg,
                              response,
                              hasCodeSuggestion: !!codeSuggestion,
                              codeSuggestion,
                          }
                        : msg
                )
            )

            if (codeSuggestion) {
                setPendingSuggestions((prev) => [...prev, codeSuggestion])
            }
        }

        const handleAITyping = ({ isTyping }: { isTyping: boolean }) => {
            setIsAITyping(isTyping)
        }

        const handleCodeSuggestion = ({ suggestion }: any) => {
            setPendingSuggestions((prev) => [...prev, suggestion])
        }

        const handleCodeAccepted = ({ suggestionId }: { suggestionId: string }) => {
            setPendingSuggestions((prev) =>
                prev.map((s) =>
                    s.id === suggestionId ? { ...s, status: "accepted" } : s
                )
            )
        }

        const handleCodeRejected = ({ suggestionId }: { suggestionId: string }) => {
            setPendingSuggestions((prev) =>
                prev.map((s) =>
                    s.id === suggestionId ? { ...s, status: "rejected" } : s
                )
            )
        }

        socket.on(SocketEvent.AI_RESPONSE, handleAIResponse)
        socket.on(SocketEvent.AI_TYPING, handleAITyping)
        socket.on(SocketEvent.AI_CODE_SUGGESTION, handleCodeSuggestion)
        socket.on(SocketEvent.AI_CODE_ACCEPTED, handleCodeAccepted)
        socket.on(SocketEvent.AI_CODE_REJECTED, handleCodeRejected)

        return () => {
            socket.off(SocketEvent.AI_RESPONSE, handleAIResponse)
            socket.off(SocketEvent.AI_TYPING, handleAITyping)
            socket.off(SocketEvent.AI_CODE_SUGGESTION, handleCodeSuggestion)
            socket.off(SocketEvent.AI_CODE_ACCEPTED, handleCodeAccepted)
            socket.off(SocketEvent.AI_CODE_REJECTED, handleCodeRejected)
        }
    }, [socket, activeFile, setActiveFile])

    return (
        <AIContext.Provider
            value={{
                messages,
                isAITyping,
                pendingSuggestions,
                sendQuery,
                acceptSuggestion,
                rejectSuggestion,
                clearMessages,
            }}
        >
            {children}
        </AIContext.Provider>
    )
}
