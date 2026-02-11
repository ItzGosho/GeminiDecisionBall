# Gemini Decision Ball - Complete Setup Guide

## ⚙️ Prerequisites

- **Node.js 16+** installed
- **Google Cloud Account** with billing enabled
- **Gemini API access** (free tier available)

## 🔐 Step 1: Create Google OAuth Credentials

### In Google Cloud Console:

1. Go to [cloud.google.com/console](https://console.cloud.google.com/)
2. Create a new project
   - Click project dropdown → New Project
   - Name: "Gemini Decision Ball"
   - Click Create

3. Enable required APIs
   - Search for "Google People API"
   - Click → Enable

4. Create OAuth consent screen
   - Left sidebar → "OAuth consent screen"
   - Choose "External" user type
   - Fill in app name: "Gemini Decision Ball"
   - Add your email as test user
   - Save & Continue

5. Create OAuth credentials
   - Left sidebar → Credentials
   - Click "Create Credentials" → OAuth Client ID
   - Application type: Web application
   - Add authorized redirect URIs:
     ```
     http://localhost:3001/api/auth/google/callback
     ```
   - Click Create
   - Copy **Client ID** and **Client Secret** to notepad

## 🔑 Step 2: Get Gemini API Key

1. Visit [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
2. Click "Create API Key"
3. Copy the key to notepad

## 🎫 Step 3: Generate JWT Secret

Open terminal and run:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Copy the output to notepad (it will be a 128-character hex string).

## 📝 Step 4: Configure Environment Variables

### Server Configuration

Navigate to the server directory and create `.env`:

```bash
cd server
```

Edit `server/.env` (or create if doesn't exist):

```
PORT=3001
JWT_SECRET=<paste_your_jwt_secret_here>
GOOGLE_CLIENT_ID=<paste_your_google_client_id>
GOOGLE_CLIENT_SECRET=<paste_your_google_client_secret>
GOOGLE_CALLBACK_URL=http://localhost:3001/api/auth/google/callback
GEMINI_API_KEY=<paste_your_gemini_api_key>
CLIENT_URL=http://localhost:5173
CORS_ORIGIN=http://localhost:5173
```

**Example:**
```
PORT=3001
JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f
GOOGLE_CLIENT_ID=123456789-abc1def2ghi3jkl4mno5pqr6stu7vwx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-a1b2c3d4e5f6g7h8i9j0k1l2m3
GOOGLE_CALLBACK_URL=http://localhost:3001/api/auth/google/callback
GEMINI_API_KEY=AIzaSyD1-a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p
CLIENT_URL=http://localhost:5173
CORS_ORIGIN=http://localhost:5173
```

### Client Configuration (Optional)

Navigate to client directory:

```bash
cd client
```

Edit `client/.env` (optional for development):

```
VITE_APP_NAME=Gemini Decision Ball
```

## 🚀 Step 5: Install Dependencies

### Install Server Dependencies

```bash
cd server
npm install
```

### Install Client Dependencies

```bash
cd client
npm install
```

## ✅ Step 6: Verify Setup

### Check Server Configuration

```bash
cd server
node verify.js
```

You should see:
```
✅ Database initialized with tables:
   - decisions
   - users
```

### Start Development Servers

**Terminal 1 - Backend:**

```bash
cd server
npm run dev
```

You should see:
```
Server running on http://localhost:3001
```

Open new terminal...

**Terminal 2 - Frontend:**

```bash
cd client
npm run dev
```

You should see:
```
Local: http://localhost:5173/
```

## 🌐 Step 7: Test the App

1. Open browser to `http://localhost:5173`
2. Click "🔐 Login with Google"
3. Grant permissions when prompted
4. You should be redirected back to the app logged in
5. Select a personality mode (Normal/Crazy/Bombastic)
6. Type a question in the text area
7. Click "Shake the Ball"
8. Watch the animation and get your answer!
9. Click "📚" to view your decision history

## 🐛 Troubleshooting

### Issue: "Invalid or expired token"
**Solution:**
- Clear browser localStorage: DevTools → Application → Local Storage → Clear All
- Logout and login again
- Verify JWT_SECRET in server/.env

### Issue: OAuth redirect loop or "Redirect URI mismatch"
**Solution:**
- Go to Google Cloud Console → Credentials
- Check the OAuth Client ID has `http://localhost:3001/api/auth/google/callback`
- Clear cookies and try again

### Issue: "Failed to generate decision" after asking
**Solution:**
- Verify GEMINI_API_KEY is correct in server/.env
- Check Google Cloud console for Gemini API quota
- Ensure Gemini API is enabled (should be by default)

### Issue: CORS errors in browser console
**Solution:**
- Verify CORS_ORIGIN in server/.env matches frontend origin
- Should be `http://localhost:5173`
- Restart server after changing

### Issue: Can't connect to server
**Solution:**
- Verify server is running on port 3001
- Check no other app is using port 3001: `netstat -ano | findstr :3001` (Windows)
- Verify Vite proxy in `client/vite.config.js` points to `http://localhost:3001`

### Issue: "Cannot open database because the directory does not exist"
**Solution:**
- Run from server directory:
  ```bash
  mkdir data
  ```

## 📚 What's Running

| Service | Port | URL |
|---------|------|-----|
| Express Server | 3001 | http://localhost:3001 |
| React Frontend (Vite) | 5173 | http://localhost:5173 |
| Vite Proxy (dev only) | - | /api → http://localhost:3001 |

## 🎯 Next Steps

### Development
- Modify components in `client/src/components/`
- Edit routes in `server/src/routes/`
- Add new features to services

### Production
- Set up GitHub repo: `git init && git add . && git commit -m "initial"`
- Deploy backend to Heroku, Render, or Railway
- Deploy frontend to Vercel or Netlify
- Update environment variables for production URLs

### Customization
- Change personality mode prompts in `server/src/services/geminiService.js`
- Modify 3D ball style in `client/src/components/EightBall/EightBall.css`
- Adjust colors in `--color-primary`, `--color-secondary`, etc.

---

**You're all set! 🚀 Enjoy seeking cosmic wisdom with Gemini Decision Ball!**

## 📞 Support

If you encounter issues:

1. Check `.env` files have actual values (not placeholders)
2. Verify all services are running in separate terminals
3. Clear cache: `rm -rf server/data/decisions.db` (WARNING: deletes history)
4. Check server logs for error messages
5. Use browser DevTools Network tab to debug API calls

## ✨ Features Checklist

- [x] Google OAuth login
- [x] Gemini AI decision generation
- [x] 3 personality modes
- [x] Decision history with filtering
- [x] Delete individual decisions
- [x] Clear all history
- [x] 3D eight-ball animation
- [x] Responsive mobile design
- [x] User profile display
- [x] JWT authentication

---
