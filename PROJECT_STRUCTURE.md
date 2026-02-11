# Gemini Decision Ball - Project Structure

## 📁 Directory Layout

```
GeminiDecisionBall/
│
├── 📄 README.md                    # Project overview & documentation
├── 📄 SETUP_GUIDE.md              # Detailed setup instructions
├── 📄 QUICK_START.md              # 5-minute quick start
├── 📄 PROJECT_STRUCTURE.md        # This file
├── 📄 .gitignore                  # Git ignore rules
│
├── 📂 server/                     # Express backend
│   ├── 📄 package.json            # Dependencies & scripts
│   ├── 📄 .env                    # Environment variables (user fills in)
│   ├── 📄 .env.example            # Environment template
│   ├── 📄 verify.js               # Setup verification script
│   │
│   ├── 📂 data/                   # SQLite database (auto-created)
│   │   └── decisions.db
│   │
│   └── 📂 src/
│       ├── 📄 app.js              # Express app entry point
│       │
│       ├── 📂 config/
│       │   ├── database.js        # SQLite initialization & schema
│       │   └── passport.js        # Google OAuth strategy
│       │
│       ├── 📂 middleware/
│       │   └── auth.js            # JWT token verification
│       │
│       ├── 📂 routes/
│       │   ├── auth.js            # /api/auth/* endpoints
│       │   ├── decisions.js       # POST /api/decisions
│       │   └── history.js         # GET/DELETE /api/history*
│       │
│       └── 📂 services/
│           └── geminiService.js   # Gemini AI integration
│
└── 📂 client/                     # React + Vite frontend
    ├── 📄 package.json            # Dependencies & scripts
    ├── 📄 vite.config.js          # Vite config with proxy
    ├── 📄 index.html              # HTML entry point
    ├── 📄 .env                    # Environment variables (optional)
    ├── 📄 .env.example            # Environment template
    │
    └── 📂 src/
        ├── 📄 App.jsx             # Root app component
        ├── 📄 App.css             # Global styles
        ├── 📄 main.jsx            # React entry point
        │
        ├── 📂 components/
        │   ├── 📂 EightBall/
        │   │   ├── EightBall.jsx  # 3D ball with animations
        │   │   └── EightBall.css  # Ball styling & 3D effects
        │   │
        │   ├── 📂 ModeSelector/
        │   │   ├── ModeSelector.jsx   # Personality mode tabs
        │   │   └── ModeSelector.css
        │   │
        │   ├── 📂 DecisionForm/
        │   │   ├── DecisionForm.jsx   # Question input form
        │   │   └── DecisionForm.css
        │   │
        │   ├── 📂 History/
        │   │   ├── History.jsx    # Slide-in history drawer
        │   │   └── History.css
        │   │
        │   └── 📂 Auth/
        │       ├── Auth.jsx       # Login/user profile
        │       └── Auth.css
        │
        ├── 📂 context/
        │   ├── AuthContext.jsx    # User auth state & JWT
        │   └── DecisionContext.jsx   # Decision state & API calls
        │
        ├── 📂 pages/
        │   ├── HomePage.jsx       # Main app page
        │   ├── HomePage.css
        │   └── AuthCallbackPage.jsx  # OAuth callback handler
        │
        └── 📂 services/
            └── api.js             # Axios instance with JWT interceptor
```

## 🔄 Data Flow

```
Frontend                          Backend
─────────────────────────────────────────

User Click "Login"
    │
    └──→ /api/auth/google ──→ Passport Google Strategy
                                    │
                              Google redirects user
                                    │
User approves on Google
    │
    ←── Callback to /api/auth/google/callback
                                    │
                            Upsert user in SQLite
                            Create JWT token
                                    │
    ←── Redirect with ?token=JWT

AuthCallbackPage
    │
    └──→ Stores token in localStorage
         Calls useAuth.login()

User asks question
    │
    └──→ POST /api/decisions ──→ Verify JWT token
        { question, mode }          │
                            Call Gemini AI API
                                    │
                            Save decision to SQLite
                                    │
    ←── { id, question, answer, mode, created_at }

Show answer with animation
    │
    └──→ GET /api/history ──→ Query user's decisions from DB
        (pagination, filter)    │
                        ←── [decisions, pagination]

Display history drawer
```

## 🗄️ Database Schema

```sql
-- Users Table
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  google_id TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  avatar TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_login DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Decisions Table
CREATE TABLE decisions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  mode TEXT CHECK(mode IN ('normal', 'crazy', 'bombastic')) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Indices for fast queries
CREATE INDEX idx_decisions_user_id ON decisions(user_id);
CREATE INDEX idx_decisions_created_at ON decisions(created_at);
```

## 🔌 API Endpoints

### Authentication
```
GET /api/auth/google
  → Initiate OAuth, redirect to Google login

GET /api/auth/google/callback?code=...
  → Exchange code for user, create JWT, redirect to client

GET /api/auth/me
  → Get current user profile
  → Headers: Authorization: Bearer <JWT>

POST /api/auth/logout
  → Client-side only, clears localStorage
```

### Decisions
```
POST /api/decisions
  → Ask Gemini a question
  → Headers: Authorization: Bearer <JWT>
  → Body: { question, mode: 'normal|crazy|bombastic' }
  → Response: { id, question, answer, mode, created_at }
```

### History
```
GET /api/history?page=1&limit=20&mode=normal
  → Fetch user's decision history
  → Headers: Authorization: Bearer <JWT>
  → Response: { decisions: [...], pagination: {...} }

DELETE /api/history/:id
  → Delete specific decision
  → Headers: Authorization: Bearer <JWT>

DELETE /api/history
  → Clear all user history
  → Headers: Authorization: Bearer <JWT>
```

## 🎨 Component Hierarchy

```
App (Router)
├── AuthProvider
│   └── DecisionProvider
│       └── Routes
│           ├── / → HomePage
│           │   ├── Auth (Login/Profile)
│           │   ├── ModeSelector (Normal/Crazy/Bombastic)
│           │   ├── DecisionForm (Question input)
│           │   ├── EightBall (3D ball + answer)
│           │   └── History (Drawer)
│           │
│           └── /auth/callback → AuthCallbackPage
```

## 🎯 Key Features

### 1. Google OAuth
- Passport.js strategy with Express
- Auto-upsert users on first login
- JWT tokens with 7-day expiry

### 2. Gemini AI Integration
- Three system prompts (normal, crazy, bombastic)
- Real-time text generation
- Error handling with fallback messages

### 3. 3D Eight Ball
- CSS radial-gradient background
- Shine overlay effect
- Framer Motion shake animation (800ms)
- Triangle + text reveal with staggered delays
- Click to flip back to number 8

### 4. Decision History
- Paginated list (20 per page)
- Filter by personality mode
- Delete individual items or clear all
- Slide-in drawer animation

### 5. Responsive Design
- Mobile-first CSS
- Flexbox layout
- Media queries for tablets/phones
- Touch-friendly buttons

## 🔐 Security

- **JWT**: No session storage, stateless auth
- **CORS**: Restricted to CLIENT_URL
- **HTTPS**: (Set up in production)
- **Input Validation**: Mode enum check, question length check
- **Ownership Verification**: User can only delete their own decisions

## 🚀 Performance

- **Database Indices**: On user_id and created_at
- **API Response Caching**: Client-side localStorage
- **Lazy Loading**: History loads on demand
- **Code Splitting**: Vite auto-splits components
- **Image Optimization**: Avatar images from Google

## 📦 Dependencies

### Backend
- `express` - Web framework
- `passport` - Authentication middleware
- `passport-google-oauth20` - OAuth strategy
- `jsonwebtoken` - JWT creation/verification
- `better-sqlite3` - SQL database
- `@google/generative-ai` - Gemini API client
- `cors` - Cross-origin middleware
- `dotenv` - Environment variables

### Frontend
- `react` - UI library
- `react-dom` - React DOM
- `react-router-dom` - Routing
- `framer-motion` - Animations
- `axios` - HTTP client
- `vite` - Build tool

## 🔄 Development Workflow

```bash
# Terminal 1: Start backend
cd server
npm run dev

# Terminal 2: Start frontend
cd client
npm run dev

# Open http://localhost:5173
# Make changes, hot reload happens automatically
```

## 📝 Environment Variables

### Server (.env)
```
PORT                 # Server port (default 3001)
JWT_SECRET          # For signing tokens (64-char hex)
GOOGLE_CLIENT_ID    # OAuth credential
GOOGLE_CLIENT_SECRET # OAuth credential
GOOGLE_CALLBACK_URL # OAuth redirect URL
GEMINI_API_KEY      # Gemini AI API key
CLIENT_URL          # Frontend URL for redirects
CORS_ORIGIN         # Frontend URL for CORS
```

### Client (.env, optional)
```
VITE_APP_NAME       # App name in UI
```

## 🧪 Testing

### Manual Testing
1. Login flow: Click button → Google screen → Approve → Redirected back
2. Ask question: Type → Select mode → Click ball → Answer appears
3. History: Click 📚 → See list → Filter by mode → Delete items
4. Logout: Click logout → Redirected to home → Can't access protected routes

### Verification Script
```bash
cd server
node verify.js
```

Checks:
- Environment variables configured
- Database tables created
- Schema correct

## 🐛 Common Issues

| Issue | Cause | Fix |
|-------|-------|-----|
| OAuth redirect loop | Wrong redirect URI | Update Google Cloud credentials |
| "Failed to generate decision" | Invalid Gemini API key | Verify key in .env |
| CORS error | CORS_ORIGIN mismatch | Update server .env |
| Can't connect to server | Port 3001 in use | Find & kill process or change PORT |
| Database error | data/ directory missing | `mkdir server/data` |

## 📚 File Sizes (Approx)

- Total JS/JSX: ~15KB
- Total CSS: ~8KB
- Node modules: ~250MB (after npm install)
- Database: <1MB (grows with entries)

---

**Last Updated:** 2026-02-11
**Version:** 1.0.0
**Status:** ✅ Complete and Ready to Deploy
