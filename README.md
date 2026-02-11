# Gemini Decision Ball 🔮

A full-stack 8-ball decision app powered by Gemini AI with Google OAuth, decision history, and 3 personality modes.

## Features

- 🔐 Google OAuth authentication
- 🎱 Interactive 3D eight-ball with shake animation
- 🎭 3 personality modes: Normal (mystical), Crazy (absurdist), Bombastic (shakespearean drama)
- 📜 Decision history with filtering and deletion
- ⚡ Real-time Gemini AI responses
- 🎨 Beautiful gradient UI with Framer Motion animations

## Stack

**Backend:** Node.js + Express + SQLite + Gemini AI
**Frontend:** React + Vite + Framer Motion

## Prerequisites

1. **Google Cloud Console** - OAuth credentials
2. **Gemini API Key** - From aistudio.google.com/apikey
3. **Node.js 16+** - Runtime

## Setup Instructions

### 1. Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable **Google People API**
4. Go to **OAuth consent screen** → select "External" → add yourself as test user
5. Go to **Credentials** → Create **OAuth Client ID** (Web application)
6. Add redirect URI: `http://localhost:3001/api/auth/google/callback`
7. Copy your **Client ID** and **Client Secret**

### 2. Get Gemini API Key

1. Visit [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
2. Click "Create API Key"
3. Copy the key

### 3. Generate JWT Secret

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 4. Setup Server Environment

```bash
cd server
cp .env.example .env
```

Edit `server/.env`:

```
PORT=3001
JWT_SECRET=<your_generated_jwt_secret>
GOOGLE_CLIENT_ID=<your_google_client_id>
GOOGLE_CLIENT_SECRET=<your_google_client_secret>
GOOGLE_CALLBACK_URL=http://localhost:3001/api/auth/google/callback
GEMINI_API_KEY=<your_gemini_api_key>
CLIENT_URL=http://localhost:5173
CORS_ORIGIN=http://localhost:5173
```

### 5. Setup Client Environment

```bash
cd client
cp .env.example .env
```

The `.env` is optional for development, but you can set:

```
VITE_APP_NAME=Gemini Decision Ball
```

## Running the App

### Terminal 1 - Start Backend

```bash
cd server
npm run dev
```

Backend runs on `http://localhost:3001`

### Terminal 2 - Start Frontend

```bash
cd client
npm run dev
```

Frontend runs on `http://localhost:5173`

## Usage Flow

1. Open `http://localhost:5173`
2. Click "Login with Google"
3. Grant permissions and get redirected back
4. Select a personality mode (Normal/Crazy/Bombastic)
5. Type your question in the input
6. Click the ball or press submit
7. Watch the shake animation and get your cosmic answer
8. Click "📚" to view decision history

## API Endpoints

### Authentication

- `GET /api/auth/google` - Initiate OAuth
- `GET /api/auth/google/callback` - OAuth callback (redirects to client)
- `GET /api/auth/me` - Get current user (JWT required)
- `POST /api/auth/logout` - Logout (client-side)

### Decisions

- `POST /api/decisions` - Ask a question (JWT required)
  ```json
  { "question": "Should I...", "mode": "normal|crazy|bombastic" }
  ```

### History

- `GET /api/history` - Fetch user decisions (JWT required)
  - Query params: `page=1&limit=20&mode=normal`
- `DELETE /api/history/:id` - Delete one decision (JWT required)
- `DELETE /api/history` - Clear all history (JWT required)

## Personality Modes

### 🔮 Normal Mode
Mystical, cosmic wisdom with thoughtful 1-3 sentence responses.

### 🤪 Crazy Mode
Absurdist, chaotic humor with pigeon-and-lemon energy.

### 🎭 Bombastic Mode
Shakespearean apocalyptic drama with theatrical despair and ALL CAPS moments.

## Database Schema

### Users Table

```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  google_id TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  avatar TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_login DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Decisions Table

```sql
CREATE TABLE decisions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  mode TEXT CHECK(mode IN ('normal', 'crazy', 'bombastic')) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## Troubleshooting

### "Invalid or expired token"
- Clear localStorage and login again
- Check JWT_SECRET matches between server and client

### "Failed to generate decision"
- Verify GEMINI_API_KEY is valid
- Check Gemini API quota in console

### CORS errors
- Ensure CLIENT_URL in server .env matches your frontend origin
- Vite proxy should handle `/api` calls

### OAuth redirect loop
- Verify GOOGLE_CALLBACK_URL in .env
- Check Google Cloud console has correct redirect URI
- Clear cookies and try again

## Project Structure

```
GeminiDecisionBall/
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   └── passport.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── decisions.js
│   │   │   └── history.js
│   │   ├── services/
│   │   │   └── geminiService.js
│   │   └── app.js
│   ├── package.json
│   └── .env
└── client/
    ├── src/
    │   ├── components/
    │   │   ├── EightBall/
    │   │   ├── ModeSelector/
    │   │   ├── DecisionForm/
    │   │   ├── History/
    │   │   └── Auth/
    │   ├── context/
    │   │   ├── AuthContext.jsx
    │   │   └── DecisionContext.jsx
    │   ├── pages/
    │   │   ├── HomePage.jsx
    │   │   └── AuthCallbackPage.jsx
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    ├── package.json
    └── .env
```

## License

MIT
