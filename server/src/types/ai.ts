export interface AIMessage {
	id: string
	query: string
	response: string
	timestamp: string
	username: string
	hasCodeSuggestion: boolean
	codeSuggestion?: CodeSuggestion
}

export interface CodeSuggestion {
	id: string
	fileId: string
	fileName: string
	originalCode: string
	suggestedCode: string
	explanation: string
	status: "pending" | "accepted" | "rejected"
	lineStart?: number
	lineEnd?: number
}

export interface AIContext {
	currentFile?: {
		id: string
		name: string
		content: string
		language: string
	}
	fileStructure?: string
	drawingContext?: string
	chatHistory?: Array<{ username: string; message: string }>
	userQuery: string
}

export interface AIQueryRequest {
	roomId: string
	username: string
	query: string
	context: AIContext
}

export interface AIResponsePayload {
	messageId: string
	response: string
	codeSuggestion?: CodeSuggestion
	error?: string
}
