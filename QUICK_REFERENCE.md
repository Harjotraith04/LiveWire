# 🎯 AI Integration Quick Reference

## 🚀 Quick Start Commands

### Server
```powershell
cd server
npm install
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY
npm run dev
```

### Client
```powershell
cd client
npm install
npm run dev
```

---

## 🔑 Get API Key
👉 https://aistudio.google.com/app/apikey

---

## 💬 Example AI Queries

### Code Analysis
```
"Explain this code"
"Find bugs in this function"
"What does this regex do?"
"Review this code for security issues"
```

### Code Modification
```
"Add error handling to this function"
"Refactor to use async/await"
"Add TypeScript types"
"Optimize this algorithm"
"Convert to ES6 syntax"
```

### Code Generation
```
"Create a function to validate emails"
"Generate unit tests for this function"
"Add JSDoc comments"
"Create a REST API endpoint"
```

---

## 🎨 UI Elements

| Icon | Purpose |
|------|---------|
| ✨ | AI Assistant (sidebar) |
| 💡 | Code Suggestion |
| 🟢 Accept | Apply code suggestion |
| 🔴 Reject | Dismiss suggestion |
| ⚠️ | Pending suggestions badge |
| 🗑️ Clear | Reset conversation |

---

## 🔌 Socket Events

### Send to Server
- `AI_QUERY` - Ask AI
- `AI_CODE_ACCEPTED` - Accept suggestion
- `AI_CODE_REJECTED` - Reject suggestion

### Receive from Server
- `AI_RESPONSE` - AI answer
- `AI_CODE_SUGGESTION` - Code change
- `AI_TYPING` - Processing indicator

---

## 📡 API Endpoints

```
GET  /api/ai/status
POST /api/ai/analyze
POST /api/ai/generate
POST /api/ai/explain
```

---

## 🎯 AI Context Access

✅ Current file & code
✅ File structure
✅ Drawings/diagrams
✅ Chat history

---

## 🐛 Quick Troubleshooting

### No AI Service
→ Check GEMINI_API_KEY in .env

### No Response
→ Check internet connection
→ Check API key validity
→ View server logs

### Suggestions Not Applying
→ Ensure file is open
→ Check file isn't locked
→ Verify correct room

---

## 📂 Key Files

### Server
- `server/src/ai-service.ts` - AI logic
- `server/src/server.ts` - Socket handlers
- `server/.env` - Configuration

### Client
- `client/src/context/AIContext.tsx` - State
- `client/src/components/sidebar/sidebar-views/AIView.tsx` - UI
- `client/src/components/ai/CodeSuggestion.tsx` - Suggestions

---

## ✅ Testing Checklist

- [ ] Server starts successfully
- [ ] AI icon visible in sidebar
- [ ] Can send queries
- [ ] AI responds correctly
- [ ] Code suggestions appear
- [ ] Can accept suggestions
- [ ] Code updates in editor
- [ ] Multiple users see updates

---

## 💡 Pro Tips

1. **Be specific** in queries
2. **Review before accepting** suggestions
3. **Use expand** to see code diffs
4. **Collaborate** with team on suggestions
5. **Context matters** - AI sees your files

---

## 📖 Full Documentation

- **Setup**: SETUP_GUIDE.md
- **Features**: AI_README.md
- **Changes**: CHANGES_SUMMARY.md

---

**Need Help?** Check SETUP_GUIDE.md for detailed instructions!
