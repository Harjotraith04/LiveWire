# Deployment Guide

Complete guide for deploying CodeFlow to production.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
- [Backend Deployment (Railway)](#backend-deployment-railway)
- [Alternative Deployments](#alternative-deployments)
- [Environment Variables](#environment-variables)
- [Post-Deployment](#post-deployment)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before deploying, ensure you have:

- [ ] GitHub account
- [ ] Gemini API key ([Get one free](https://makersuite.google.com/app/apikey))
- [ ] Tested locally and everything works
- [ ] Committed all changes to GitHub
- [ ] Updated version numbers if needed

## 🚀 Frontend Deployment (Vercel)

Vercel is the recommended platform for deploying the React frontend (free tier available).

### Step 1: Prepare Your Frontend

1. **Create a `vercel.json` in the client folder** (already exists):

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite"
}
```

2. **Update environment variables**:

Create `client/.env.production`:
```env
VITE_SERVER_URL=https://your-backend-url.railway.app
```

### Step 2: Deploy to Vercel

**Option A: Deploy via Vercel Dashboard (Easiest)**

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Import your GitHub repository (`LiveWire`)
4. Configure settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add environment variables:
   - `VITE_SERVER_URL`: Your backend URL (we'll add this after backend deployment)
6. Click **"Deploy"**

**Option B: Deploy via Vercel CLI**

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy from client folder
cd client
vercel

# Follow prompts and select your project settings
```

### Step 3: Configure Domain (Optional)

- Vercel provides a free `.vercel.app` domain
- Or add your custom domain in Vercel dashboard → Settings → Domains

---

## 🚂 Backend Deployment (Railway)

Railway is recommended for the Node.js backend (free tier available with credit card).

### Step 1: Prepare Your Backend

1. **Create a `Procfile` in the server folder**:

```
web: npm start
```

2. **Ensure `server/package.json` has proper scripts**:

```json
{
  "scripts": {
    "start": "node dist/server.js",
    "build": "tsc",
    "dev": "nodemon --exec ts-node src/server.ts"
  }
}
```

### Step 2: Deploy to Railway

1. Go to [railway.app](https://railway.app) and sign in with GitHub
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your `LiveWire` repository
5. Railway will detect it's a Node.js app
6. Configure settings:
   - **Root Directory**: `server`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`

### Step 3: Add Environment Variables

In Railway dashboard → Variables tab, add:

```env
PORT=3000
NODE_ENV=production
GEMINI_API_KEY=your_gemini_api_key_here
CLIENT_URL=https://your-frontend-url.vercel.app
```

**Important**: Set `CLIENT_URL` to your Vercel frontend URL for CORS.

### Step 4: Deploy

- Railway automatically deploys on push to `main` branch
- Wait for deployment to complete (usually 2-3 minutes)
- Copy your Railway app URL (e.g., `https://your-app.up.railway.app`)

### Step 5: Update Frontend Environment Variable

Go back to Vercel:
1. Dashboard → Your Project → Settings → Environment Variables
2. Update `VITE_SERVER_URL` to your Railway URL
3. Redeploy the frontend (Deployments → ⋯ → Redeploy)

---

## 🔄 Alternative Deployments

### Frontend Alternatives

#### Netlify

1. Go to [netlify.com](https://netlify.com)
2. Import from GitHub
3. Settings:
   - **Base directory**: `client`
   - **Build command**: `npm run build`
   - **Publish directory**: `client/dist`
4. Add environment variables

#### GitHub Pages (Static Only)

```bash
cd client
npm run build
npx gh-pages -d dist
```

### Backend Alternatives

#### Render

1. Go to [render.com](https://render.com)
2. New → Web Service
3. Connect GitHub repository
4. Settings:
   - **Root Directory**: `server`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. Add environment variables

#### Heroku

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create your-app-name

# Set buildpacks
heroku buildpacks:set heroku/nodejs

# Set root directory
echo "server" > .heroku/root

# Deploy
git subtree push --prefix server heroku main

# Set environment variables
heroku config:set GEMINI_API_KEY=your_key
heroku config:set CLIENT_URL=https://your-frontend.vercel.app
```

#### DigitalOcean App Platform

1. Go to [digitalocean.com](https://www.digitalocean.com/products/app-platform)
2. Create → Apps → GitHub
3. Select repository and branch
4. Detect `server` directory
5. Configure environment variables
6. Deploy

---

## 🔐 Environment Variables

### Frontend (Client)

```env
VITE_SERVER_URL=https://your-backend-url.com
```

### Backend (Server)

```env
PORT=3000
NODE_ENV=production
GEMINI_API_KEY=your_gemini_api_key
CLIENT_URL=https://your-frontend-url.com
```

**Security Tips:**
- Never commit `.env` files to GitHub
- Use platform-specific secret management
- Rotate API keys regularly
- Use different keys for dev/staging/production

---

## ✅ Post-Deployment

### 1. Test Your Deployment

- [ ] Visit your frontend URL
- [ ] Create a test room
- [ ] Join from another browser/device
- [ ] Test real-time sync
- [ ] Test chat functionality
- [ ] Test AI assistant
- [ ] Test file operations
- [ ] Test on mobile

### 2. Monitor Performance

**Vercel:**
- Dashboard → Analytics
- Check build times and errors

**Railway:**
- Dashboard → Metrics
- Monitor CPU, memory, network usage

### 3. Set Up Custom Domain (Optional)

**Vercel:**
1. Settings → Domains
2. Add your domain
3. Update DNS records (CNAME or A record)

**Railway:**
1. Settings → Domains
2. Add custom domain
3. Update DNS records

### 4. Enable HTTPS

Both Vercel and Railway provide free SSL certificates automatically.

### 5. Set Up CI/CD

Create `.github/workflows/deploy.yml` (already created in this repo):

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: cd client && npm ci && npm run build
      - run: cd server && npm ci && npm run build
```

---

## 🐛 Troubleshooting

### CORS Errors

**Problem**: `Access to XMLHttpRequest has been blocked by CORS policy`

**Solution**:
1. Check `CLIENT_URL` in backend environment variables
2. Ensure it matches your frontend URL exactly (no trailing slash)
3. Redeploy backend after updating

### WebSocket Connection Failed

**Problem**: `WebSocket connection failed` or `Socket.IO not connecting`

**Solution**:
1. Ensure backend is deployed and running
2. Check `VITE_SERVER_URL` in frontend matches backend URL
3. Verify backend allows WebSocket connections
4. Check Railway/Render logs for errors

### Build Failures

**Frontend Build Fails:**
```bash
# Locally test the build
cd client
npm run build

# Check for TypeScript errors
npm run type-check
```

**Backend Build Fails:**
```bash
# Locally test the build
cd server
npm run build

# Check TypeScript configuration
```

### Environment Variables Not Working

1. Ensure variable names are correct (case-sensitive)
2. Prefix frontend vars with `VITE_`
3. Restart/redeploy after changing variables
4. Check logs for "undefined" values

### Performance Issues

1. **Enable caching**: Configure CDN caching headers
2. **Optimize bundle**: Use code splitting
3. **Compress assets**: Enable gzip/brotli
4. **Use production build**: Never deploy dev builds
5. **Monitor resources**: Check Railway metrics

---

## 📊 Monitoring and Logging

### Frontend Monitoring

**Vercel Analytics** (Built-in):
- Real User Monitoring (RUM)
- Web Vitals
- Page views and traffic

**Additional Options**:
- [Google Analytics](https://analytics.google.com/)
- [Sentry](https://sentry.io/) for error tracking

### Backend Monitoring

**Railway Logs**:
```bash
# View logs
railway logs
```

**Additional Options**:
- [LogRocket](https://logrocket.com/)
- [Datadog](https://www.datadoghq.com/)
- [New Relic](https://newrelic.com/)

---

## 💰 Cost Estimation

### Free Tier Limits

**Vercel (Free)**:
- ✅ Unlimited personal projects
- ✅ 100GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ 6,000 build minutes/month

**Railway (Free Trial)**:
- ✅ $5 free credit/month (no CC required for trial)
- ✅ Then $5/month minimum
- ⚠️ Credit card required after trial

**Alternatives**:
- Render: Free tier available (slower cold starts)
- Heroku: $7/month for basic dyno (no free tier since 2022)

---

## 🚀 Production Checklist

Before going live:

- [ ] All tests pass
- [ ] No console errors
- [ ] Environment variables configured
- [ ] HTTPS enabled
- [ ] CORS properly configured
- [ ] API keys secured
- [ ] Error tracking setup
- [ ] Analytics configured
- [ ] Monitoring enabled
- [ ] Backups configured (if applicable)
- [ ] Documentation updated
- [ ] Team has access to deployment platforms
- [ ] Rollback plan in place

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app/)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Socket.IO Production Guide](https://socket.io/docs/v4/using-multiple-nodes/)

---

## 🆘 Need Help?

- [GitHub Issues](https://github.com/Harjotraith04/LiveWire/issues)
- [GitHub Discussions](https://github.com/Harjotraith04/LiveWire/discussions)
- Railway Discord: [discord.gg/railway](https://discord.gg/railway)
- Vercel Discord: [vercel.com/discord](https://vercel.com/discord)

---

**Happy Deploying! 🎉**
