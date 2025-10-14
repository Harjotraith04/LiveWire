import express, { Response, Request } from "express"
import dotenv from "dotenv"
import http from "http"
import cors from "cors"
import { SocketEvent, SocketId } from "./types/socket"
import { USER_CONNECTION_STATUS, User } from "./types/user"
import { Server } from "socket.io"
import path from "path"
import AIService from "./ai-service"
import { AIQueryRequest } from "./types/ai"

dotenv.config()

const app = express()

app.use(express.json())

app.use(cors())

app.use(express.static(path.join(__dirname, "public"))) // Serve static files

const server = http.createServer(app)
const io = new Server(server, {
	cors: {
		origin: "*",
	},
	maxHttpBufferSize: 1e8,
	pingTimeout: 60000,
})

// Initialize AI Service
let aiService: AIService | null = null
try {
	aiService = new AIService()
	console.log("✅ AI Service initialized successfully")
} catch (error) {
	console.error("❌ Failed to initialize AI Service:", error)
	console.log("💡 Set GEMINI_API_KEY in .env to enable AI features")
}

let userSocketMap: User[] = []

// Function to get all users in a room
function getUsersInRoom(roomId: string): User[] {
	return userSocketMap.filter((user) => user.roomId == roomId)
}

// Function to get room id by socket id
function getRoomId(socketId: SocketId): string | null {
	const roomId = userSocketMap.find(
		(user) => user.socketId === socketId
	)?.roomId

	if (!roomId) {
		console.error("Room ID is undefined for socket ID:", socketId)
		return null
	}
	return roomId
}

function getUserBySocketId(socketId: SocketId): User | null {
	const user = userSocketMap.find((user) => user.socketId === socketId)
	if (!user) {
		console.error("User not found for socket ID:", socketId)
		return null
	}
	return user
}

io.on("connection", (socket) => {
	// Handle user actions
	socket.on(SocketEvent.JOIN_REQUEST, ({ roomId, username }) => {
		// Check is username exist in the room
		const isUsernameExist = getUsersInRoom(roomId).filter(
			(u) => u.username === username
		)
		if (isUsernameExist.length > 0) {
			io.to(socket.id).emit(SocketEvent.USERNAME_EXISTS)
			return
		}

		const user = {
			username,
			roomId,
			status: USER_CONNECTION_STATUS.ONLINE,
			cursorPosition: 0,
			typing: false,
			socketId: socket.id,
			currentFile: null,
		}
		userSocketMap.push(user)
		socket.join(roomId)
		socket.broadcast.to(roomId).emit(SocketEvent.USER_JOINED, { user })
		const users = getUsersInRoom(roomId)
		io.to(socket.id).emit(SocketEvent.JOIN_ACCEPTED, { user, users })
	})

	socket.on("disconnecting", () => {
		const user = getUserBySocketId(socket.id)
		if (!user) return
		const roomId = user.roomId
		socket.broadcast
			.to(roomId)
			.emit(SocketEvent.USER_DISCONNECTED, { user })
		userSocketMap = userSocketMap.filter((u) => u.socketId !== socket.id)
		socket.leave(roomId)
	})

	// Handle file actions
	socket.on(
		SocketEvent.SYNC_FILE_STRUCTURE,
		({ fileStructure, openFiles, activeFile, socketId }) => {
			io.to(socketId).emit(SocketEvent.SYNC_FILE_STRUCTURE, {
				fileStructure,
				openFiles,
				activeFile,
			})
		}
	)

	socket.on(
		SocketEvent.DIRECTORY_CREATED,
		({ parentDirId, newDirectory }) => {
			const roomId = getRoomId(socket.id)
			if (!roomId) return
			socket.broadcast.to(roomId).emit(SocketEvent.DIRECTORY_CREATED, {
				parentDirId,
				newDirectory,
			})
		}
	)

	socket.on(SocketEvent.DIRECTORY_UPDATED, ({ dirId, children }) => {
		const roomId = getRoomId(socket.id)
		if (!roomId) return
		socket.broadcast.to(roomId).emit(SocketEvent.DIRECTORY_UPDATED, {
			dirId,
			children,
		})
	})

	socket.on(SocketEvent.DIRECTORY_RENAMED, ({ dirId, newName }) => {
		const roomId = getRoomId(socket.id)
		if (!roomId) return
		socket.broadcast.to(roomId).emit(SocketEvent.DIRECTORY_RENAMED, {
			dirId,
			newName,
		})
	})

	socket.on(SocketEvent.DIRECTORY_DELETED, ({ dirId }) => {
		const roomId = getRoomId(socket.id)
		if (!roomId) return
		socket.broadcast
			.to(roomId)
			.emit(SocketEvent.DIRECTORY_DELETED, { dirId })
	})

	socket.on(SocketEvent.FILE_CREATED, ({ parentDirId, newFile }) => {
		const roomId = getRoomId(socket.id)
		if (!roomId) return
		socket.broadcast
			.to(roomId)
			.emit(SocketEvent.FILE_CREATED, { parentDirId, newFile })
	})

	socket.on(SocketEvent.FILE_UPDATED, ({ fileId, newContent }) => {
		const roomId = getRoomId(socket.id)
		if (!roomId) return
		socket.broadcast.to(roomId).emit(SocketEvent.FILE_UPDATED, {
			fileId,
			newContent,
		})
	})

	socket.on(SocketEvent.FILE_RENAMED, ({ fileId, newName }) => {
		const roomId = getRoomId(socket.id)
		if (!roomId) return
		socket.broadcast.to(roomId).emit(SocketEvent.FILE_RENAMED, {
			fileId,
			newName,
		})
	})

	socket.on(SocketEvent.FILE_DELETED, ({ fileId }) => {
		const roomId = getRoomId(socket.id)
		if (!roomId) return
		socket.broadcast.to(roomId).emit(SocketEvent.FILE_DELETED, { fileId })
	})

	// Handle user status
	socket.on(SocketEvent.USER_OFFLINE, ({ socketId }) => {
		userSocketMap = userSocketMap.map((user) => {
			if (user.socketId === socketId) {
				return { ...user, status: USER_CONNECTION_STATUS.OFFLINE }
			}
			return user
		})
		const roomId = getRoomId(socketId)
		if (!roomId) return
		socket.broadcast.to(roomId).emit(SocketEvent.USER_OFFLINE, { socketId })
	})

	socket.on(SocketEvent.USER_ONLINE, ({ socketId }) => {
		userSocketMap = userSocketMap.map((user) => {
			if (user.socketId === socketId) {
				return { ...user, status: USER_CONNECTION_STATUS.ONLINE }
			}
			return user
		})
		const roomId = getRoomId(socketId)
		if (!roomId) return
		socket.broadcast.to(roomId).emit(SocketEvent.USER_ONLINE, { socketId })
	})

	// Handle chat actions
	socket.on(SocketEvent.SEND_MESSAGE, ({ message }) => {
		const roomId = getRoomId(socket.id)
		if (!roomId) return
		socket.broadcast
			.to(roomId)
			.emit(SocketEvent.RECEIVE_MESSAGE, { message })
	})

	// Handle cursor position
	socket.on(SocketEvent.TYPING_START, ({ cursorPosition }) => {
		userSocketMap = userSocketMap.map((user) => {
			if (user.socketId === socket.id) {
				return { ...user, typing: true, cursorPosition }
			}
			return user
		})
		const user = getUserBySocketId(socket.id)
		if (!user) return
		const roomId = user.roomId
		socket.broadcast.to(roomId).emit(SocketEvent.TYPING_START, { user })
	})

	socket.on(SocketEvent.TYPING_PAUSE, () => {
		userSocketMap = userSocketMap.map((user) => {
			if (user.socketId === socket.id) {
				return { ...user, typing: false }
			}
			return user
		})
		const user = getUserBySocketId(socket.id)
		if (!user) return
		const roomId = user.roomId
		socket.broadcast.to(roomId).emit(SocketEvent.TYPING_PAUSE, { user })
	})

	socket.on(SocketEvent.REQUEST_DRAWING, () => {
		const roomId = getRoomId(socket.id)
		if (!roomId) return
		socket.broadcast
			.to(roomId)
			.emit(SocketEvent.REQUEST_DRAWING, { socketId: socket.id })
	})

	socket.on(SocketEvent.SYNC_DRAWING, ({ drawingData, socketId }) => {
		socket.broadcast
			.to(socketId)
			.emit(SocketEvent.SYNC_DRAWING, { drawingData })
	})

	socket.on(SocketEvent.DRAWING_UPDATE, ({ snapshot }) => {
		const roomId = getRoomId(socket.id)
		if (!roomId) return
		socket.broadcast.to(roomId).emit(SocketEvent.DRAWING_UPDATE, {
			snapshot,
		})
	})

	// Handle AI queries
	socket.on(SocketEvent.AI_QUERY, async ({ query, context, messageId }: AIQueryRequest & { messageId: string }) => {
		const roomId = getRoomId(socket.id)
		if (!roomId) return

		// Emit typing indicator
		socket.broadcast.to(roomId).emit(SocketEvent.AI_TYPING, { isTyping: true })

		if (!aiService) {
			io.to(socket.id).emit(SocketEvent.AI_RESPONSE, {
				messageId,
				response: "",
				error: "AI Service is not available. Please configure GEMINI_API_KEY.",
			})
			socket.broadcast.to(roomId).emit(SocketEvent.AI_TYPING, { isTyping: false })
			return
		}

		try {
			const result = await aiService.processQuery(query, context, messageId)
			
			// Send response to all users in the room
			io.to(roomId).emit(SocketEvent.AI_RESPONSE, result)
			
			// If there's a code suggestion, emit it separately
			if (result.codeSuggestion) {
				io.to(roomId).emit(SocketEvent.AI_CODE_SUGGESTION, {
					suggestion: result.codeSuggestion,
					messageId,
				})
			}
		} catch (error: any) {
			console.error("AI Query Error:", error)
			io.to(socket.id).emit(SocketEvent.AI_RESPONSE, {
				messageId,
				response: "",
				error: error.message || "An error occurred while processing your request.",
			})
		} finally {
			socket.broadcast.to(roomId).emit(SocketEvent.AI_TYPING, { isTyping: false })
		}
	})

	// Handle code suggestion acceptance
	socket.on(SocketEvent.AI_CODE_ACCEPTED, ({ suggestionId, fileId }) => {
		const roomId = getRoomId(socket.id)
		if (!roomId) return
		socket.broadcast.to(roomId).emit(SocketEvent.AI_CODE_ACCEPTED, {
			suggestionId,
			fileId,
		})
	})

	// Handle code suggestion rejection
	socket.on(SocketEvent.AI_CODE_REJECTED, ({ suggestionId }) => {
		const roomId = getRoomId(socket.id)
		if (!roomId) return
		socket.broadcast.to(roomId).emit(SocketEvent.AI_CODE_REJECTED, {
			suggestionId,
		})
	})
})

const PORT = process.env.PORT || 3000

app.get("/", (req: Request, res: Response) => {
	// Send the index.html file
	res.sendFile(path.join(__dirname, "..", "public", "index.html"))
})

// API endpoint to check AI service status
app.get("/api/ai/status", (req: Request, res: Response) => {
	res.json({
		available: aiService !== null,
		message: aiService
			? "AI Service is available"
			: "AI Service is not configured. Set GEMINI_API_KEY in environment.",
	})
})

// API endpoint to analyze code
app.post("/api/ai/analyze", async (req: Request, res: Response) => {
	if (!aiService) {
		return res.status(503).json({
			error: "AI Service is not available",
		})
	}

	try {
		const { code, language, fileName } = req.body

		if (!code || !language || !fileName) {
			return res.status(400).json({
				error: "Missing required fields: code, language, fileName",
			})
		}

		const analysis = await aiService.analyzeCode(code, language, fileName)
		res.json({ analysis })
	} catch (error: any) {
		console.error("Code analysis error:", error)
		res.status(500).json({
			error: error.message || "Failed to analyze code",
		})
	}
})

// API endpoint to generate code
app.post("/api/ai/generate", async (req: Request, res: Response) => {
	if (!aiService) {
		return res.status(503).json({
			error: "AI Service is not available",
		})
	}

	try {
		const { description, language, context } = req.body

		if (!description || !language) {
			return res.status(400).json({
				error: "Missing required fields: description, language",
			})
		}

		const code = await aiService.generateCode(description, language, context)
		res.json({ code })
	} catch (error: any) {
		console.error("Code generation error:", error)
		res.status(500).json({
			error: error.message || "Failed to generate code",
		})
	}
})

// API endpoint to explain code
app.post("/api/ai/explain", async (req: Request, res: Response) => {
	if (!aiService) {
		return res.status(503).json({
			error: "AI Service is not available",
		})
	}

	try {
		const { code, language } = req.body

		if (!code || !language) {
			return res.status(400).json({
				error: "Missing required fields: code, language",
			})
		}

		const explanation = await aiService.explainCode(code, language)
		res.json({ explanation })
	} catch (error: any) {
		console.error("Code explanation error:", error)
		res.status(500).json({
			error: error.message || "Failed to explain code",
		})
	}
})

server.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`)
})
