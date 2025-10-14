import { GoogleGenerativeAI } from "@google/generative-ai"
import { AIContext, AIResponsePayload, CodeSuggestion } from "./types/ai"
import { v4 as uuidv4 } from "uuid"

class AIService {
	private genAI: GoogleGenerativeAI
	private model: any

	constructor() {
		const apiKey = process.env.GEMINI_API_KEY
		if (!apiKey) {
			throw new Error("GEMINI_API_KEY is not set in environment variables")
		}
		this.genAI = new GoogleGenerativeAI(apiKey)
		this.model = this.genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })
	}

	/**
	 * Build context string from various sources for the AI
	 */
	private buildContextPrompt(context: AIContext): string {
		let contextPrompt = ""

		if (context.currentFile) {
			contextPrompt += `\n### Current File: ${context.currentFile.name} (${context.currentFile.language})\n`
			contextPrompt += `\`\`\`${context.currentFile.language}\n${context.currentFile.content}\n\`\`\`\n`
		}

		if (context.fileStructure) {
			contextPrompt += `\n### File Structure:\n${context.fileStructure}\n`
		}

		if (context.drawingContext) {
			contextPrompt += `\n### Drawing/Diagram Context:\n${context.drawingContext}\n`
		}

		if (context.chatHistory && context.chatHistory.length > 0) {
			contextPrompt += `\n### Recent Chat History:\n`
			context.chatHistory.forEach((chat) => {
				contextPrompt += `${chat.username}: ${chat.message}\n`
			})
		}

		return contextPrompt
	}

	/**
	 * Analyze if the query requires code modification
	 */
	private requiresCodeModification(query: string): boolean {
		const codeModificationKeywords = [
			"change",
			"modify",
			"update",
			"fix",
			"refactor",
			"add",
			"remove",
			"edit",
			"improve",
			"optimize",
			"implement",
			"create function",
			"create class",
			"add feature",
			"bug fix",
		]

		const lowerQuery = query.toLowerCase()
		return codeModificationKeywords.some((keyword) =>
			lowerQuery.includes(keyword)
		)
	}

	/**
	 * Extract code suggestion from AI response
	 */
	private extractCodeSuggestion(
		response: string,
		context: AIContext
	): CodeSuggestion | null {
		// Try to extract code blocks from the response
		const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g
		const matches = [...response.matchAll(codeBlockRegex)]

		if (matches.length === 0 || !context.currentFile) {
			return null
		}

		// Get the last code block as the suggestion
		const lastMatch = matches[matches.length - 1]
		const suggestedCode = lastMatch[2].trim()

		// Extract explanation (text before the code block)
		const explanationMatch = response.split("```")[0].trim()

		return {
			id: uuidv4(),
			fileId: context.currentFile.id,
			fileName: context.currentFile.name,
			originalCode: context.currentFile.content,
			suggestedCode: suggestedCode,
			explanation: explanationMatch || "AI suggested code modification",
			status: "pending",
		}
	}

	/**
	 * Process AI query with full context awareness
	 */
	async processQuery(
		query: string,
		context: AIContext,
		messageId: string
	): Promise<AIResponsePayload> {
		try {
			const needsCodeMod = this.requiresCodeModification(query)
			const contextPrompt = this.buildContextPrompt(context)

			let systemPrompt = `You are an expert AI coding assistant integrated into a collaborative code editor called LiveWire. You have access to:
- The current code file being edited
- The entire file structure of the project
- Any drawings or diagrams created by users
- Recent chat history between collaborators

Your role is to:
1. Analyze code and provide helpful suggestions
2. Explain code concepts clearly
3. Help debug issues
4. Suggest improvements and optimizations
5. When asked to modify code, provide complete, working code suggestions

${contextPrompt}

User Query: ${query}
`

			if (needsCodeMod && context.currentFile) {
				systemPrompt += `\n\nIMPORTANT: The user wants to modify the code. Provide:
1. A clear explanation of what changes you're making
2. The complete modified code in a code block with the language specified
3. Make sure the code is production-ready and follows best practices\n`
			}

			const result = await this.model.generateContent(systemPrompt)
			const response = result.response
			const responseText = response.text()

			let codeSuggestion: CodeSuggestion | undefined

			if (needsCodeMod && context.currentFile) {
				const extracted = this.extractCodeSuggestion(responseText, context)
				if (extracted) {
					codeSuggestion = extracted
				}
			}

			return {
				messageId,
				response: responseText,
				codeSuggestion,
			}
		} catch (error: any) {
			console.error("AI Service Error:", error)
			return {
				messageId,
				response: "",
				error: error.message || "Failed to process AI query",
			}
		}
	}

	/**
	 * Analyze code for potential issues
	 */
	async analyzeCode(
		code: string,
		language: string,
		fileName: string
	): Promise<string> {
		try {
			const prompt = `Analyze the following ${language} code from ${fileName} and provide:
1. Potential bugs or issues
2. Security concerns
3. Performance optimization suggestions
4. Code quality improvements

\`\`\`${language}
${code}
\`\`\`
`

			const result = await this.model.generateContent(prompt)
			return result.response.text()
		} catch (error: any) {
			console.error("Code analysis error:", error)
			throw new Error("Failed to analyze code")
		}
	}

	/**
	 * Generate code based on description
	 */
	async generateCode(
		description: string,
		language: string,
		context?: string
	): Promise<string> {
		try {
			const prompt = `Generate ${language} code based on the following description:
${description}

${context ? `Additional context:\n${context}` : ""}

Provide clean, well-commented, production-ready code.`

			const result = await this.model.generateContent(prompt)
			return result.response.text()
		} catch (error: any) {
			console.error("Code generation error:", error)
			throw new Error("Failed to generate code")
		}
	}

	/**
	 * Explain code
	 */
	async explainCode(code: string, language: string): Promise<string> {
		try {
			const prompt = `Explain the following ${language} code in detail:

\`\`\`${language}
${code}
\`\`\`

Provide:
1. What the code does
2. How it works
3. Key concepts used
4. Any potential issues or improvements`

			const result = await this.model.generateContent(prompt)
			return result.response.text()
		} catch (error: any) {
			console.error("Code explanation error:", error)
			throw new Error("Failed to explain code")
		}
	}
}

export default AIService
