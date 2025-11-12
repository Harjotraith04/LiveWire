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
	 * Get language-specific code requirements for the compiler
	 */
	private getLanguageRequirements(language: string): string {
		const languageMap: { [key: string]: string } = {
			javascript: `
- MUST be immediately executable in Node.js (Piston API)
- Use console.log() for ALL output
- Include example usage that RUNS automatically
- Use proper Node.js syntax
- DO NOT just define functions - CALL them with examples
- Code structure:
  1. Function definitions
  2. Example calls with console.log()
  3. MUST show output when executed`,
			typescript: `
- Use TypeScript syntax with proper types
- Include type annotations
- Use console.log() for output
- Include example usage that runs
- Ensure code compiles to valid JavaScript`,
			python: `
- Use Python 3 syntax
- Use print() for ALL output
- MUST include proper indentation
- Import required modules at the top
- ALWAYS include example usage with print statements
- Code structure:
  1. Function/class definitions
  2. if __name__ == "__main__": block
  3. Example calls showing output`,
			java: `
- MUST include public class with same name as filename
- MUST include: public static void main(String[] args)
- Use System.out.println() for output
- Import required packages
- Include example usage in main method`,
			cpp: `
- Include necessary headers (#include <iostream>)
- MUST include: int main() { ... return 0; }
- Use std::cout for output
- Use proper namespace (std::)
- Include example usage in main()`,
			c: `
- Include necessary headers (#include <stdio.h>)
- MUST include: int main() { ... return 0; }
- Use printf() for output
- Include example usage in main()`,
			go: `
- MUST include: package main
- MUST include: func main() { ... }
- Use fmt.Println() for output
- Import "fmt" package
- Include example usage in main()`,
			rust: `
- MUST include: fn main() { ... }
- Use println!() macro for output
- Ensure proper ownership and borrowing
- Include necessary use statements
- Include example usage in main()`,
			php: `
- Start with <?php tag
- Use echo or print for output
- End statements with semicolon
- Include example usage that outputs results`,
			ruby: `
- Use Ruby syntax
- Use puts or print for output
- No semicolons needed
- Include example usage with output`,
		}

		return languageMap[language.toLowerCase()] || `
- Follow ${language} best practices
- Ensure code is IMMEDIATELY executable
- Include proper main entry point
- Add example usage with output
- Include necessary imports/includes`
	}

	/**
	 * Build context string from various sources for the AI
	 */
	private buildContextPrompt(context: AIContext): string {
		let contextPrompt = ""

		if (context.currentFile) {
			const langRequirements = this.getLanguageRequirements(
				context.currentFile.language
			)
			contextPrompt += `\n### Current File: ${context.currentFile.name} (${context.currentFile.language})\n`
			contextPrompt += `\`\`\`${context.currentFile.language}\n${context.currentFile.content}\n\`\`\`\n`
			contextPrompt += `\n### Language Requirements for Code Execution:\n${langRequirements}\n`
			contextPrompt += `\n⚠️ IMPORTANT: Generated code must be executable in the Piston API compiler. Follow the language requirements above.\n`
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

			let systemPrompt = `You are an expert AI coding assistant integrated into a collaborative code editor called CodeFlow. You have access to:
- The current code file being edited
- The entire file structure of the project
- Any drawings or diagrams created by users
- Recent chat history between collaborators

⚠️ CRITICAL: This editor uses the Piston API for code execution. All code you generate MUST be executable and follow these rules:

1. **EXECUTABLE CODE ONLY**: Generate complete, runnable code that can execute in the Piston compiler
2. **PROPER STRUCTURE**: Include all necessary imports, main functions, and entry points
3. **LANGUAGE-SPECIFIC**: Follow the exact syntax and requirements for ${context.currentFile?.language || "the target language"}
4. **OUTPUT VISIBLE**: Use appropriate output methods (console.log, print, System.out.println, etc.)
5. **NO PLACEHOLDERS**: Never use "...", "// rest of code", or incomplete snippets
6. **COMPLETE FILES**: Always provide the FULL file content, not partial updates

📋 MANDATORY STRUCTURE REQUIREMENTS:

For JavaScript/TypeScript:
  - Define functions/classes at the top
  - IMMEDIATELY call them with example usage
  - Use console.log() to show results
  - Example:
    function isPalindrome(str) { 
      return str === str.split('').reverse().join('');
    }
    // Example usage
    console.log("Testing 'racecar':", isPalindrome("racecar")); // true
    console.log("Testing 'hello':", isPalindrome("hello")); // false

For Python:
  - Define functions/classes
  - MUST include: if __name__ == "__main__":
  - Call functions with examples in that block
  - Use print() to show results

For Java:
  - public class Main { public static void main(String[] args) { ... } }
  - Call your code from main method
  - Use System.out.println() for output

For C/C++:
  - Include headers (#include <iostream> or #include <stdio.h>)
  - int main() { ... return 0; }
  - Use std::cout or printf() for output

For Go:
  - package main
  - func main() { ... }
  - Use fmt.Println() for output

Your role is to:
1. Analyze code and provide helpful suggestions
2. Explain code concepts clearly
3. Help debug issues
4. Suggest improvements and optimizations
5. When asked to modify code, provide COMPLETE, EXECUTABLE code that runs immediately and shows output

${contextPrompt}

User Query: ${query}
`

			if (needsCodeMod && context.currentFile) {
				systemPrompt += `\n\n⚠️ CODE MODIFICATION REQUEST DETECTED

CRITICAL REQUIREMENTS:
1. Provide the COMPLETE file content from start to finish
2. Include ALL necessary imports/includes at the top
3. Include the main function or entry point (main(), if __name__ == "__main__", etc.)
4. Ensure code is IMMEDIATELY EXECUTABLE in Piston API
5. Use proper ${context.currentFile.language} syntax
6. Add clear output statements to show results
7. NO partial code, NO "...", NO placeholders

Format your response as:
1. Brief explanation of changes (2-3 sentences)
2. Complete, executable code in a code block with language specified
3. Additional notes if needed

Example format:
I've added error handling and input validation to the function.

\`\`\`${context.currentFile.language}
[COMPLETE EXECUTABLE CODE HERE]
\`\`\`

The code now includes proper error messages and edge case handling.
\n`
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
