# LiveWire - AI-Powered Collaborative Code Editor

## 🤖 AI Integration Features

LiveWire now includes a powerful AI assistant powered by **Google Gemini 2.5 Flash** that provides intelligent code assistance with full context awareness.

### ✨ Key AI Capabilities

1. **Context-Aware Assistance**
   - Full access to your current file and code
   - Awareness of your entire file structure
   - Access to drawing/diagram context
   - Integration with chat history

2. **Code Modification**
   - AI can suggest code changes
   - Accept/Reject workflow for code suggestions
   - Automatic file updates when suggestions are accepted
   - Real-time synchronization across all users

3. **Intelligent Analysis**
   - Code explanation and documentation
   - Bug detection and fixes
   - Performance optimization suggestions
   - Security vulnerability identification

4. **Collaborative AI**
   - All team members see AI responses
   - Shared code suggestions
   - Synchronized decision-making (accept/reject)

## 🚀 Setup Instructions

### Server Setup

1. **Install Dependencies**
   ```bash
   cd server
   npm install
   ```

2. **Configure Environment Variables**
   - Copy `.env.example` to `.env`
   ```bash
   cp .env.example .env
   ```

3. **Get Gemini API Key**
   - Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Create a new API key
   - Add it to your `.env` file:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   PORT=3000
   ```

4. **Start the Server**
   ```bash
   npm run dev
   ```

### Client Setup

1. **Install Dependencies**
   ```bash
   cd client
   npm install
   ```

2. **Start the Client**
   ```bash
   npm run dev
   ```

## 📖 How to Use the AI Assistant

### Accessing the AI

1. Open the sidebar in LiveWire
2. Click the **✨ AI Assistant** icon (sparkles icon)
3. The AI chat interface will open

### Asking Questions

The AI can help with:

- **Code Explanation**: "Explain this function"
- **Bug Fixes**: "Find and fix bugs in this code"
- **Code Generation**: "Create a function to validate email addresses"
- **Refactoring**: "Refactor this code to be more efficient"
- **Optimization**: "Optimize this algorithm"
- **Documentation**: "Add comments to explain this code"

### Example Queries

```
"Add error handling to this function"
"Convert this code to use async/await"
"Explain what this regex pattern does"
"Refactor this to use modern ES6 syntax"
"Add TypeScript types to this file"
"Find potential security issues in this code"
```

### Working with Code Suggestions

When the AI suggests code changes:

1. **Review the Suggestion**
   - Click the expand button to see original vs suggested code
   - Read the explanation of changes

2. **Accept the Suggestion**
   - Click the green "Accept" button
   - Code is automatically applied to your file
   - All team members see the update

3. **Reject the Suggestion**
   - Click the red "Reject" button
   - Suggestion is dismissed
   - File remains unchanged

## 🎯 AI Context Awareness

The AI has access to:

### 1. Current File Context
```typescript
{
  id: "file-uuid",
  name: "app.tsx",
  content: "// your code here",
  language: "typescript"
}
```

### 2. File Structure
The AI sees your entire project structure:
```
- src/
  - components/
    - Button.tsx
    - Input.tsx
  - utils/
    - helpers.ts
```

### 3. Drawing Context
If you've created diagrams or drawings, the AI is aware:
```
"User has created diagrams/drawings in the canvas. Total elements: 15"
```

### 4. Chat History
The AI can see recent team conversations:
```
Alice: "Let's add authentication"
Bob: "Good idea, use JWT tokens"
```

## 🔧 API Endpoints

### Check AI Status
```http
GET /api/ai/status
```
Returns whether AI service is available.

### Analyze Code
```http
POST /api/ai/analyze
Content-Type: application/json

{
  "code": "function example() { ... }",
  "language": "javascript",
  "fileName": "app.js"
}
```

### Generate Code
```http
POST /api/ai/generate
Content-Type: application/json

{
  "description": "Create a user authentication function",
  "language": "typescript",
  "context": "Using JWT tokens"
}
```

### Explain Code
```http
POST /api/ai/explain
Content-Type: application/json

{
  "code": "const result = arr.reduce(...)",
  "language": "javascript"
}
```

## 🔌 Socket Events

### Client → Server

- `AI_QUERY`: Send query to AI
- `AI_CODE_ACCEPTED`: User accepted code suggestion
- `AI_CODE_REJECTED`: User rejected code suggestion

### Server → Client

- `AI_RESPONSE`: AI's response to query
- `AI_CODE_SUGGESTION`: New code suggestion available
- `AI_TYPING`: AI is processing (typing indicator)
- `AI_CODE_ACCEPTED`: Code suggestion was accepted by someone
- `AI_CODE_REJECTED`: Code suggestion was rejected by someone

## 🏗️ Architecture

### Server-Side Components

1. **AIService** (`server/src/ai-service.ts`)
   - Interfaces with Gemini API
   - Processes queries with full context
   - Generates code suggestions
   - Analyzes and explains code

2. **Socket Handlers** (`server/src/server.ts`)
   - Handle AI query events
   - Broadcast responses to all users
   - Manage code suggestion workflow

3. **API Routes** (`server/src/server.ts`)
   - REST endpoints for AI operations
   - Status checks
   - Direct code analysis/generation

### Client-Side Components

1. **AIContext** (`client/src/context/AIContext.tsx`)
   - Manages AI state
   - Handles query sending
   - Manages code suggestions
   - Accept/reject workflow

2. **AIView** (`client/src/components/sidebar/sidebar-views/AIView.tsx`)
   - Main AI chat interface
   - Message display
   - Query input
   - Suggestion management

3. **CodeSuggestion** (`client/src/components/ai/CodeSuggestion.tsx`)
   - Displays code suggestions
   - Accept/reject buttons
   - Expandable code diff view

## 🎨 UI Features

- **Typing Indicator**: Shows when AI is processing
- **Pending Suggestions Badge**: Alerts you to unreviewed suggestions
- **Expandable Code Diffs**: Compare original vs suggested code
- **Clear Chat**: Reset conversation
- **Context Awareness Badge**: See what context AI has access to

## 🔐 Security Notes

1. **API Key Protection**: Never commit `.env` file to version control
2. **Rate Limiting**: Gemini API has rate limits, plan accordingly
3. **Code Review**: Always review AI suggestions before accepting
4. **Data Privacy**: Code is sent to Gemini API for processing

## 🐛 Troubleshooting

### AI Not Available
- Check that `GEMINI_API_KEY` is set in `.env`
- Verify API key is valid at [Google AI Studio](https://aistudio.google.com/)
- Check server logs for initialization errors

### No Response from AI
- Check internet connection
- Verify Gemini API service status
- Check server logs for errors
- Ensure query is not empty

### Code Suggestions Not Applying
- Verify you have the correct file open
- Check that file IDs match
- Ensure file is not locked by another process
- Check browser console for errors

## 📊 Performance Considerations

- **Response Time**: Typical AI response: 2-5 seconds
- **Context Size**: Larger files may take longer to process
- **Concurrent Users**: AI responses are broadcast to all users
- **Rate Limits**: Gemini API has usage limits (check Google's documentation)

## 🚦 Best Practices

1. **Be Specific**: Detailed queries get better responses
2. **Review Suggestions**: Always review before accepting
3. **Provide Context**: Mention relevant information in queries
4. **Incremental Changes**: Request smaller, focused modifications
5. **Team Communication**: Discuss AI suggestions with team before accepting

## 📝 Example Workflow

1. **Open a file** with code you want to improve
2. **Switch to AI view** in the sidebar
3. **Ask a question**: "Add error handling to this async function"
4. **Review the response** and code suggestion
5. **Expand to see** original vs suggested code
6. **Accept the suggestion** if it looks good
7. **Code is automatically updated** and synced with team

## 🤝 Contributing

To extend AI capabilities:

1. Modify `AIService` class in `server/src/ai-service.ts`
2. Add new socket events in `types/socket.ts`
3. Update UI components as needed
4. Test with your team in a collaborative session

## 📚 Resources

- [Google Gemini API Documentation](https://ai.google.dev/docs)
- [Socket.IO Documentation](https://socket.io/docs/)
- [LiveWire Original Repository](https://github.com/Harjotraith04/LiveWire_CN)

## ⚡ Quick Start Checklist

- [ ] Install server dependencies
- [ ] Get Gemini API key
- [ ] Configure `.env` file
- [ ] Start server
- [ ] Install client dependencies
- [ ] Start client
- [ ] Create or join a room
- [ ] Open AI assistant in sidebar
- [ ] Ask your first question!

---

**Enjoy coding with AI assistance! 🚀✨**
