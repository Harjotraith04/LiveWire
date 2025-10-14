# 🚀 Quick Setup Guide for AI Integration

## Step 1: Server Setup (5 minutes)

### 1.1 Navigate to server directory
```powershell
cd "c:\Users\HARJOT SINGH\Desktop\NLP\LiveWire\server"
```

### 1.2 Install dependencies (if not done)
```powershell
npm install
```

### 1.3 Create .env file
```powershell
Copy-Item .env.example .env
```

### 1.4 Get your Gemini API Key
1. Visit: https://aistudio.google.com/app/apikey
2. Click "Create API Key"
3. Copy the key

### 1.5 Edit .env file
Open `.env` and add your key:
```env
PORT=3000
GEMINI_API_KEY=your_actual_key_here
```

### 1.6 Start the server
```powershell
npm run dev
```

You should see:
```
✅ AI Service initialized successfully
Listening on port 3000
```

## Step 2: Client Setup (2 minutes)

### 2.1 Open new terminal and navigate to client
```powershell
cd "c:\Users\HARJOT SINGH\Desktop\NLP\LiveWire\client"
```

### 2.2 Install dependencies (if not done)
```powershell
npm install
```

### 2.3 Start the client
```powershell
npm run dev
```

## Step 3: Test the AI Integration

### 3.1 Access the application
- Open browser to: http://localhost:5173 (or the port shown)
- Create or join a room
- Enter with a username

### 3.2 Open AI Assistant
1. Look at the sidebar (left side on desktop, bottom on mobile)
2. Click the ✨ (sparkles) icon for "AI Assistant"
3. AI panel will open

### 3.3 Test Queries

Try these example queries:

**Simple Question:**
```
What is this project about?
```

**Code Analysis (with a file open):**
```
Explain what this code does
```

**Code Modification:**
```
Add error handling to this function
```

**Code Generation:**
```
Create a function that validates email addresses
```

### 3.4 Test Code Suggestions

1. Open any file in the editor
2. Ask AI: "Add comments to explain this code"
3. Wait for response
4. You should see a code suggestion box with:
   - 💡 Code Suggestion badge
   - Explanation
   - Accept (green) / Reject (red) buttons
5. Click expand to see original vs suggested code
6. Click "Accept" to apply the changes

## Step 4: Test Collaborative Features

### 4.1 Open second browser/incognito window
- Go to the same room URL
- Join with different username

### 4.2 From Browser 1
- Ask AI a question in AI view
- Accept a code suggestion

### 4.3 From Browser 2
- You should see:
  - AI responses appear in real-time
  - Code changes when accepted
  - Typing indicator when AI is processing

## 🎯 What the AI Can Access

When you ask a question, the AI automatically has access to:

✅ **Current File**: The file you're currently editing
✅ **File Structure**: Your entire project tree
✅ **Drawings**: Any diagrams created in drawing mode
✅ **Chat History**: Recent messages from the team chat

## 🔍 Troubleshooting

### Server shows: "❌ Failed to initialize AI Service"
- Check that `GEMINI_API_KEY` is set in `.env`
- Verify the API key is correct
- Make sure you copied `.env.example` to `.env`

### AI says "AI Service is not available"
- Restart the server
- Check server console for errors
- Verify Gemini API key is valid

### No response from AI
- Check internet connection
- Look at browser console (F12) for errors
- Check server logs for errors
- Make sure query is not empty

### Code suggestions not applying
- Make sure you have a file open
- Check that you're in the correct room
- Verify file permissions

## 📊 Testing Checklist

- [ ] Server starts without errors
- [ ] "AI Service initialized successfully" message appears
- [ ] Client connects to server
- [ ] Can create/join a room
- [ ] AI icon visible in sidebar
- [ ] Can open AI assistant
- [ ] Can send queries to AI
- [ ] AI responds with answers
- [ ] Typing indicator shows while processing
- [ ] Code suggestions appear when appropriate
- [ ] Can expand code suggestion to see diff
- [ ] Can accept code suggestions
- [ ] Code updates in editor when accepted
- [ ] Can reject code suggestions
- [ ] Other users see AI responses (test with 2 browsers)
- [ ] Other users see code changes when accepted

## 🎨 Features to Try

1. **Code Explanation**
   - Open any file
   - Ask: "Explain this code in detail"

2. **Bug Finding**
   - Ask: "Find bugs in this code"

3. **Refactoring**
   - Ask: "Refactor this to use modern syntax"

4. **Documentation**
   - Ask: "Add JSDoc comments to all functions"

5. **Optimization**
   - Ask: "How can I make this code faster?"

6. **Type Safety**
   - Ask: "Add TypeScript types to this file"

## 🚀 Next Steps

- Explore the AI_README.md for detailed documentation
- Try different types of queries
- Test with your team in real collaboration
- Experiment with complex code modifications
- Try asking about drawings after creating diagrams

## 💡 Pro Tips

1. Be specific in your queries for better results
2. Always review AI suggestions before accepting
3. Use the expand button to compare original vs suggested code
4. AI remembers context from chat and drawings
5. Multiple team members can review suggestions together

---

**Happy Coding with AI! 🎉**
