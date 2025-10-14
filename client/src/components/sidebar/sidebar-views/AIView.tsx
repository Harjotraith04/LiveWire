import { useAI } from "@/context/AIContext"
import { FormEvent, useRef, useEffect } from "react"
import { LuSendHorizonal, LuSparkles, LuTrash2, LuPlay } from "react-icons/lu"
import CodeSuggestion from "../../ai/CodeSuggestion"
import { useFileSystem } from "@/context/FileContext"

function AIView() {
    const { messages, isAITyping, pendingSuggestions, sendQuery, acceptSuggestion, rejectSuggestion, clearMessages } = useAI()
    const { activeFile } = useFileSystem()
    const inputRef = useRef<HTMLInputElement | null>(null)
    const messagesEndRef = useRef<HTMLDivElement | null>(null)

    const handleSendQuery = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const query = inputRef.current?.value.trim()
        if (query) {
            sendQuery(query)
            if (inputRef.current) inputRef.current.value = ""
        }
    }

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages, isAITyping])

    return (
        <div className="flex h-full flex-col p-4">
            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <LuSparkles className="text-primary" size={24} />
                    <h2 className="text-lg font-bold text-primary">AI Assistant</h2>
                </div>
                {messages.length > 0 && (
                    <button
                        onClick={clearMessages}
                        className="flex items-center gap-1 rounded bg-red-600 px-2 py-1 text-xs text-white transition hover:bg-red-700"
                        title="Clear chat"
                    >
                        <LuTrash2 size={14} />
                        Clear
                    </button>
                )}
            </div>

            <div className="mb-4 flex-grow overflow-auto rounded-md bg-darkHover p-3">
                {messages.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center text-center text-gray-400">
                        <LuSparkles size={48} className="mb-3 text-primary" />
                        <p className="mb-2 text-lg font-semibold">
                            AI Assistant Ready
                        </p>
                        <p className="text-sm">
                            Ask me anything about your code, request changes, or get
                            suggestions!
                        </p>
                        <div className="mt-4 space-y-1 text-xs">
                            <p>✅ I can see your current file</p>
                            <p>✅ I have access to your file structure</p>
                            <p>✅ I can view your drawings and chat history</p>
                            <p>✅ I generate compiler-ready code</p>
                            <p>🚀 Accepted code runs directly in the compiler!</p>
                        </div>
                        {activeFile && (
                            <div className="mt-4 rounded-md bg-dark p-2 text-xs">
                                <p className="mb-1 text-primary">📄 Current File:</p>
                                <p className="font-mono">{activeFile.name}</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {messages.map((message) => (
                            <div key={message.id} className="space-y-2">
                                {/* User Query */}
                                <div className="ml-auto w-[85%] rounded-md bg-primary px-3 py-2 text-black">
                                    <div className="mb-1 flex justify-between text-xs">
                                        <span className="font-semibold">
                                            {message.username}
                                        </span>
                                        <span>{message.timestamp}</span>
                                    </div>
                                    <p className="text-sm">{message.query}</p>
                                </div>

                                {/* AI Response */}
                                {message.response && (
                                    <div className="w-[85%] rounded-md bg-dark px-3 py-2">
                                        <div className="mb-1 flex items-center gap-2 text-xs">
                                            <LuSparkles className="text-primary" />
                                            <span className="font-semibold text-primary">
                                                AI Assistant
                                            </span>
                                        </div>
                                        <div className="prose prose-invert max-w-none text-sm">
                                            <pre className="whitespace-pre-wrap">
                                                {message.response}
                                            </pre>
                                        </div>

                                        {/* Code Suggestion */}
                                        {message.hasCodeSuggestion &&
                                            message.codeSuggestion && (
                                                <CodeSuggestion
                                                    suggestion={message.codeSuggestion}
                                                    onAccept={acceptSuggestion}
                                                    onReject={rejectSuggestion}
                                                />
                                            )}
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Typing Indicator */}
                        {isAITyping && (
                            <div className="w-[85%] rounded-md bg-dark px-3 py-2">
                                <div className="flex items-center gap-2 text-xs">
                                    <LuSparkles className="animate-pulse text-primary" />
                                    <span className="font-semibold text-primary">
                                        AI is thinking...
                                    </span>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>

            {/* Pending Suggestions Summary */}
            {pendingSuggestions.filter((s) => s.status === "pending").length > 0 && (
                <div className="mb-3 rounded-md bg-yellow-900/30 border border-yellow-700 p-3 text-xs">
                    <div className="flex items-center gap-2 mb-2 text-yellow-300 font-semibold">
                        <LuPlay className="text-yellow-300" />
                        <span>Ready to Run!</span>
                    </div>
                    <p className="text-yellow-200">
                        ⚠️ You have {pendingSuggestions.filter((s) => s.status === "pending").length} pending code suggestion(s). 
                        Accept to update your file and run in the compiler!
                    </p>
                </div>
            )}

            {/* Input Form */}
            <form onSubmit={handleSendQuery} className="flex gap-2">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder={activeFile ? `Ask AI about ${activeFile.name}...` : "Ask AI about your code..."}
                    className="flex-1 rounded-md border border-primary bg-dark px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                    disabled={isAITyping}
                />
                <button
                    type="submit"
                    className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-black transition hover:bg-primary/90 disabled:opacity-50"
                    disabled={isAITyping}
                >
                    <LuSendHorizonal />
                    Send
                </button>
            </form>

            <div className="mt-2 text-xs text-gray-500">
                💡 Tip: Generated code is compiler-ready! Accept suggestions and use the Run view to execute.
            </div>
        </div>
    )
}

export default AIView
