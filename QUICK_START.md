# Quick Start (5 Minutes)

## You Need
1. **Google OAuth Credentials** (Client ID + Secret)
2. **Gemini API Key**
3. **JWT Secret** (from `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`)

## Go

### 1. Configure Server
```bash
cd server
```

Edit `server/.env` with your credentials:
```
PORT=3001
JWT_SECRET=<your_jwt_secret>
GOOGLE_CLIENT_ID=<your_client_id>
GOOGLE_CLIENT_SECRET=<your_client_secret>
GOOGLE_CALLBACK_URL=http://localhost:3001/api/auth/google/callback
GEMINI_API_KEY=<your_gemini_key>
CLIENT_URL=http://localhost:5173
CORS_ORIGIN=http://localhost:5173
```

### 2. Start Backend
```bash
npm run dev
```

→ Server runs on `http://localhost:3001`

### 3. Start Frontend (new terminal)
```bash
cd client
npm run dev
```

→ Frontend runs on `http://localhost:5173`

### 4. Open Browser
Visit `http://localhost:5173`

### 5. Login & Ask
- Click "🔐 Login with Google"
- Select personality mode
- Ask a question
- Click the ball
- Get cosmic wisdom! 🔮

---

For detailed setup, see `SETUP_GUIDE.md`
