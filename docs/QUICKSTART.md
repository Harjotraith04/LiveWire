# Quick Start Guide

Get CodeFlow up and running in less than 5 minutes!

## 🎯 Prerequisites

- **Node.js** v18 or higher ([Download](https://nodejs.org/))
- **npm**, **yarn**, or **pnpm**
- **Git** ([Download](https://git-scm.com/))

Check your versions:
```bash
node --version  # Should be v18 or higher
npm --version   # Should be 9 or higher
```

## 🚀 Quick Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Harjotraith04/LiveWire.git
cd LiveWire
```

### 2. Install Dependencies

**Option A: Using npm (recommended)**
```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

**Option B: Using yarn**
```bash
cd client && yarn install
cd ../server && yarn install
```

**Option C: Using pnpm**
```bash
cd client && pnpm install
cd ../server && pnpm install
```

### 3. Set Up Environment Variables

**Server Configuration** (`server/.env`):
```bash
cd server
cp .env.example .env  # If .env.example exists, or create new .env
```

Add the following to `server/.env`:
```env
PORT=3000
GEMINI_API_KEY=your_api_key_here
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

**Get a Gemini API Key** (Free):
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy and paste it into your `.env` file

**Client Configuration** (Optional):

If needed, create `client/.env`:
```env
VITE_SERVER_URL=http://localhost:3000
```

### 4. Start Development Servers

You'll need **two terminal windows**:

**Terminal 1 - Start Backend:**
```bash
cd server
npm run dev
```

You should see:
```
Server running on port 3000
Socket.IO server ready
```

**Terminal 2 - Start Frontend:**
```bash
cd client
npm run dev
```

You should see:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### 5. Open Your Browser

Navigate to: **http://localhost:5173**

You should see the CodeFlow landing page! 🎉

## 🎮 Using CodeFlow

### Creating Your First Room

1. Click **"Get Started Free"**
2. Enter your username (e.g., "John")
3. Choose one of:
   - **"Create New Room"** - Generate a new room ID
   - **"Join Existing Room"** - Enter a room ID from a teammate

### Inviting Team Members

1. After creating a room, you'll see a **Room ID** (e.g., `abc-def-123`)
2. Share this Room ID with your team
3. They should:
   - Go to http://localhost:5173
   - Click "Get Started Free"
   - Enter their username
   - Choose "Join Existing Room"
   - Enter the Room ID

### Start Coding Together

- **Type in the editor** - Changes appear instantly for everyone
- **Create files** - Click the "+" icon in the file tree
- **Open chat** - Click the chat icon in the sidebar
- **Use drawing board** - Click the drawing icon
- **Get AI help** - Click the AI icon for code suggestions

## 🔧 Troubleshooting

### Port Already in Use

If you get "Port 3000 is already in use":

**Windows (PowerShell):**
```powershell
# Find process on port 3000
netstat -ano | findstr :3000
# Kill process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

**macOS/Linux:**
```bash
# Find and kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

**Or use a different port:**
Edit `server/.env`:
```env
PORT=3001
```

And `client/.env`:
```env
VITE_SERVER_URL=http://localhost:3001
```

### Dependencies Installation Failed

Clear cache and reinstall:
```bash
# For client
cd client
rm -rf node_modules package-lock.json
npm install

# For server
cd ../server
rm -rf node_modules package-lock.json
npm install
```

### Connection Issues

1. **Check if backend is running** - Terminal 1 should show "Server running"
2. **Check the URL** - Frontend should be at `http://localhost:5173`
3. **Check CORS** - Make sure `CLIENT_URL` in server `.env` matches your frontend URL
4. **Check firewall** - Allow Node.js through your firewall

### Frontend Not Loading

1. **Clear browser cache** - Press `Ctrl+Shift+Delete` (or `Cmd+Shift+Delete` on Mac)
2. **Hard refresh** - Press `Ctrl+F5` (or `Cmd+Shift+R` on Mac)
3. **Check console** - Open DevTools (F12) and look for errors
4. **Restart Vite** - Stop the frontend server (Ctrl+C) and run `npm run dev` again

### AI Not Working

1. **Check API key** - Make sure you added your Gemini API key to `server/.env`
2. **Verify API key** - Test it at [Google AI Studio](https://makersuite.google.com/)
3. **Check quota** - Free tier has usage limits
4. **Restart server** - Stop and start the backend server

## 📱 Testing on Mobile

To test on your phone/tablet on the same network:

1. Find your computer's IP address:

**Windows:**
```powershell
ipconfig
# Look for "IPv4 Address"
```

**macOS/Linux:**
```bash
ifconfig | grep "inet "
# Or: ip addr show
```

2. Start the frontend with `--host`:
```bash
cd client
npm run dev -- --host
```

3. On your mobile device, visit:
```
http://YOUR_IP_ADDRESS:5173
```

Example: `http://192.168.1.100:5173`

## 🎓 Next Steps

- **Explore features** - Try the chat, drawing board, and AI assistant
- **Read the docs** - Check out [README.md](../README.md) for detailed documentation
- **Customize** - Modify themes, add languages, or tweak the UI
- **Deploy** - Ready to share? See [DEPLOYMENT.md](DEPLOYMENT.md)
- **Contribute** - Want to help? Read [CONTRIBUTING.md](../CONTRIBUTING.md)

## 💡 Tips

- **Keyboard shortcuts** - Press `Ctrl+/` (or `Cmd+/`) for shortcuts
- **Multiple files** - Create folders and organize your code
- **Themes** - Switch between light and dark themes in settings
- **Language support** - CodeFlow supports 50+ programming languages
- **Download project** - Export your workspace as a ZIP file

## ❓ Need Help?

- **Documentation**: Check the [README](../README.md)
- **Issues**: [GitHub Issues](https://github.com/Harjotraith04/LiveWire/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Harjotraith04/LiveWire/discussions)

---

**Happy Coding! 🚀**

Made with ❤️ by the CodeFlow team
