# Credentials Checklist ✅

Complete this checklist before running the app. All three credentials are required.

## 1️⃣ Google OAuth Credentials

### How to Get
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create project → Enable Google People API
3. Create OAuth Consent Screen → Add yourself as test user
4. Create OAuth Client ID (Web) → Add redirect URI: `http://localhost:3001/api/auth/google/callback`

### What You'll Get
```
Client ID:     123456789-abc1def2ghi3jkl4mno5pqr6stu7.apps.googleusercontent.com
Client Secret: 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o5p6q
```

### Add to server/.env
```
GOOGLE_CLIENT_ID=<paste_client_id>
GOOGLE_CLIENT_SECRET=<paste_client_secret>
GOOGLE_CALLBACK_URL=http://localhost:3001/api/auth/google/callback
```

### Checklist
- [ ] Google Cloud project created
- [ ] Google People API enabled
- [ ] OAuth Consent Screen configured
- [ ] OAuth Client ID created (Web)
- [ ] Redirect URI added: `http://localhost:3001/api/auth/google/callback`
- [ ] Client ID copied to server/.env
- [ ] Client Secret copied to server/.env

---

## 2️⃣ Gemini API Key

### How to Get
1. Go to [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
2. Click "Create API Key"
3. Copy the key

### What You'll Get
```
AIzaSyD1-a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7
```

### Add to server/.env
```
GEMINI_API_KEY=<paste_api_key>
```

### Checklist
- [ ] Visited aistudio.google.com/apikey
- [ ] Created API Key
- [ ] API Key copied to server/.env
- [ ] (Optional) Set usage limits in Google Cloud Console

---

## 3️⃣ JWT Secret

### How to Generate
Open terminal and run:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### What You'll Get
```
a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o
```

(A 128-character hex string)

### Add to server/.env
```
JWT_SECRET=<paste_jwt_secret>
```

### Checklist
- [ ] Ran crypto command
- [ ] Copied 128-char hex string
- [ ] Pasted to server/.env as JWT_SECRET
- [ ] Saved file

---

## 4️⃣ Environment Files

### Create server/.env

**Location:** `server/.env`

**Full Template:**
```
PORT=3001
JWT_SECRET=<your_jwt_secret_from_step_3>
GOOGLE_CLIENT_ID=<your_client_id_from_step_1>
GOOGLE_CLIENT_SECRET=<your_client_secret_from_step_1>
GOOGLE_CALLBACK_URL=http://localhost:3001/api/auth/google/callback
GEMINI_API_KEY=<your_gemini_key_from_step_2>
CLIENT_URL=http://localhost:5173
CORS_ORIGIN=http://localhost:5173
```

**Example (with real values):**
```
PORT=3001
JWT_SECRET=abc123def456ghi789...
GOOGLE_CLIENT_ID=123456789-abc1def2ghi3jkl4mno5pqr6stu7vwx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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o5
GOOGLE_CALLBACK_URL=http://localhost:3001/api/auth/google/callback
GEMINI_API_KEY=AIzaSyD1-a2b3c4d5e6f7g8h9i0j1k2l3m4n5
CLIENT_URL=http://localhost:5173
CORS_ORIGIN=http://localhost:5173
```

**Checklist:**
- [ ] Created file: `server/.env`
- [ ] Filled in JWT_SECRET
- [ ] Filled in GOOGLE_CLIENT_ID
- [ ] Filled in GOOGLE_CLIENT_SECRET
- [ ] Filled in GEMINI_API_KEY
- [ ] Other values are defaults (keep as-is)
- [ ] Saved file

### Create client/.env (Optional)

**Location:** `client/.env`

**Template:**
```
VITE_APP_NAME=Gemini Decision Ball
```

**Checklist:**
- [ ] (Optional) Created file: `client/.env`
- [ ] (Optional) Added VITE_APP_NAME
- [ ] (Optional) Saved file

---

## ✅ Final Verification

Run this before starting servers:

```bash
cd server
node verify.js
```

### You should see:
```
✅ Environment variables configured
✅ Database initialized with tables:
   - decisions
   - users
✅ Server setup verification complete!
```

### If you see warnings:
```
⚠️  Missing or placeholder environment variables:
   - GEMINI_API_KEY
   - GOOGLE_CLIENT_ID
   - ...
```

→ Go back and fill in those values in `server/.env`

---

## 🚀 Ready to Go!

Once all checks are complete:

### Terminal 1: Start Backend
```bash
cd server
npm run dev
```

### Terminal 2: Start Frontend
```bash
cd client
npm run dev
```

### Open Browser
Visit `http://localhost:5173`

---

## 🔒 Security Notes

- **Never commit `.env` file** to git (use `.gitignore`)
- **Keep secrets private** - don't share credentials
- **Rotate JWT_SECRET** in production periodically
- **Use HTTPS** in production (not `http://`)
- **Set Google API quotas** to prevent abuse

---

## 📞 If Something Goes Wrong

### OAuth not working?
1. Check redirect URI in Google Cloud Console: `http://localhost:3001/api/auth/google/callback`
2. Verify Client ID and Secret are correct
3. Clear browser cookies and try again

### Gemini API not working?
1. Verify API Key is correct
2. Check Google Cloud Console for quota limits
3. Ensure Gemini API is enabled

### Server not starting?
1. Check PORT 3001 is available: `netstat -ano | findstr :3001`
2. Check `server/.env` exists and is filled
3. Run `node verify.js` for diagnostics

---

**Congratulations! You're all set to use Gemini Decision Ball! 🎉**
