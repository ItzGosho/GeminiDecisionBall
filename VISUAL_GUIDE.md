# Gemini Decision Ball - Visual Guide

## 🎨 UI Components Overview

### Header Section
```
┌─────────────────────────────────────────────────────┐
│  Top Right: [🔓 Login with Google]  or  [👤 User]  │
│             [📚 History] [Logout]                   │
└─────────────────────────────────────────────────────┘
```

### Home Page Layout
```
┌──────────────────────────────────────────────────────┐
│                                                      │
│         🔮 GEMINI DECISION BALL                      │
│    Seek cosmic wisdom, absurd chaos, or drama        │
│                                                      │
│  ┌─────────────────────────────────────────────┐   │
│  │  [Normal]  [Crazy]  [Bombastic]  Mode Tabs │   │
│  └─────────────────────────────────────────────┘   │
│                                                      │
│  ┌──────────────────────────────────────────┐      │
│  │  Ask the Gemini Decision Ball anything... │      │
│  │  _________________________________        │      │
│  │  _________________________________        │      │
│  │  _________________________________        │      │
│  │                    [Shake the Ball]       │      │
│  └──────────────────────────────────────────┘      │
│                                                      │
│            ╔═══════╗                                │
│            ║       ║                                │
│            ║   8   ║  (Glowing black sphere)       │
│            ║       ║  - Shine overlay              │
│            ╚═══════╝  - Rotates on hover          │
│                       - Shakes on submit           │
│                                                      │
│  (After answer received:)                           │
│            ╔═══════╗                                │
│            ║  ▼    ║  (Triangle appears)           │
│            ║ "Your ║  (Text fades in)              │
│            ║answer ║                                │
│            ║  ..." ║                                │
│            ╚═══════╝  (Click to flip)              │
│                                                      │
│  [Click the ball to flip]                          │
│                                                      │
└──────────────────────────────────────────────────────┘
```

### History Drawer
```
Right Slide-In Drawer (400px width)
┌────────────────────────────┐
│ Decision History        [✕] │
├────────────────────────────┤
│ [All] [Normal] [Crazy] [B] │  Filter tabs
├────────────────────────────┤
│ ┌──────────────────────┐   │
│ │ normal               │ 🗑 │
│ │ Q: Should I...       │   │
│ │ A: The stars say...  │   │
│ │ Jan 15, 2026         │   │
│ └──────────────────────┘   │
│                            │
│ ┌──────────────────────┐   │
│ │ crazy                │ 🗑 │
│ │ Q: Can pigeons fly?  │   │
│ │ A: YES AND ALSO      │   │
│ │ Jan 15, 2026         │   │
│ └──────────────────────┘   │
│                            │
│ (Scrollable list)          │
├────────────────────────────┤
│     [Clear All History]    │
└────────────────────────────┘
```

---

## 🎭 Personality Modes

### Normal Mode
```
Mystical & Cosmic Wisdom

Input: "Should I start my own business?"

Output: "The cosmos whispers that new ventures
        require both courage and preparation.
        Trust your instincts, for the stars
        align when your heart is true."

Style: 1-3 sentences, thoughtful, mysterious
Colors: White text, cosmic vibes
```

### Crazy Mode
```
Absurdist & Hilarious Chaos

Input: "Should I start my own business?"

Output: "BUSINESS IS JUST A FANCY WORD FOR CHAOS
        AND CHAOS IS JUST PIGEONS WITH ATTITUDE.
        DO IT. DO IT NOW. TOMORROW: REGRET."

Style: Wild, ALL CAPS moments, funny, unpredictable
Colors: Bright accents, chaotic energy
```

### Bombastic Mode
```
Shakespearean Apocalyptic Drama

Input: "Should I start my own business?"

Output: "TO BUSINESS OR NOT TO BUSINESS?
        THAT IS NOT THE QUESTION!
        THE QUESTION IS WHY DOST THOU TEMPT
        THE VERY FABRIC OF EXISTENCE WITH
        THY PETTY ENTREPRENEURIAL DREAMS?!"

Style: SHAKESPEAREAN LANGUAGE, EXTREME CAPS,
       Theatrical despair, existential dread
Colors: Dark purples, dramatic shadows
```

---

## 🎬 Animation Sequences

### Sequence 1: User Submits Question
```
Timeline (ms):
0ms:     [User clicks ball or presses submit]

100ms:   [Loading spinner appears]
         (Question textarea disabled)
         (Mode selector disabled)
         (Submit button shows "Seeking wisdom...")

800ms:   [Ball shake animation completes]
         ↻ ↻ ↻ (rotation, 10°-10°-10° pattern)

2000ms:  [Gemini API responds with answer]
         (Loading spinner removed)

2500ms:  [Triangle appears, centered in ball]
         (Fade in animation, 500ms)

3000ms:  [Answer text fades in]
         (Fade in animation, 400ms)
         (Component re-enabled)
```

### Sequence 2: User Clicks Ball
```
0ms:     [User clicks on answer triangle]

300ms:   [Triangle & text fade out]
         (Answer stored in currentDecision)

800ms:   [Ball shows "8" again]
         (Ready for new question)
```

### Sequence 3: Open History Drawer
```
0ms:     [User clicks 📚 button]

300ms:   [Overlay appears (opacity 0→0.6)]

350ms:   [Drawer slides in from right]
         (x: 400→0, spring animation)

400ms:   [History items animate in]
         (Staggered, each +50ms delay)
```

---

## 🎨 Color Palette

### Primary Colors
```
Background:     #0f0f1e (Deep navy)
Secondary:      #1a1a2e (Dark blue)
Tertiary:       #16213e (Blue-gray)

Accent:         #4f46e5 (Indigo purple)
Glow:           #7c3aed (Bright purple)
Cyan Bright:    #a5f3fc (Cyan)
Error:          #ff6b6b (Red)
```

### Gradients
```
Main Background:
linear-gradient(135deg, #0f0f1e, #1a1a2e, #16213e)

Ball:
radial-gradient(circle at 35% 35%, #333, #000)

Button:
linear-gradient(135deg, #4f46e5, #7c3aed)

Hover:
linear-gradient(135deg, #5d55f2, #8b47ff)
```

### Transparency Levels
```
Semi-visible:   rgba(255, 255, 255, 0.3)
Visible:        rgba(255, 255, 255, 0.6)
Very visible:   rgba(255, 255, 255, 0.9)

Dark overlay:   rgba(0, 0, 0, 0.6)
Light overlay:  rgba(255, 255, 255, 0.05)
```

---

## 📐 Responsive Breakpoints

### Desktop (>768px)
```
┌─────────────────────────────────────────┐
│ [Login / User Profile]  [📚 History] [↓]│
│                                         │
│         🔮 GEMINI DECISION BALL         │
│                                         │
│  [ Normal ] [ Crazy ] [ Bombastic ]    │
│                                         │
│  [Question textarea............]       │
│  [Question textarea............]       │
│  [Question textarea............]       │
│                  [Shake the Ball]      │
│                                         │
│          ╔═══════════╗                  │
│          ║     8     ║                  │
│          ║           ║                  │
│          ╚═══════════╝                  │
│                                         │
│      [Click the ball to flip]           │
│                                         │
└─────────────────────────────────────────┘
```

### Tablet (768px - 1024px)
```
[Login / User]        [📚] [↓]

    🔮 GEMINI DECISION BALL

[Normal][Crazy][Bombastic]

[Textarea........]
[Shake the Ball]

   ╔═════════╗
   ║    8    ║
   ║         ║
   ╚═════════╝
```

### Mobile (<768px)
```
[Login/User][📚][↓]

  🔮 Gemini Ball

[Normal]
[Crazy]
[Bombastic]

[Textarea...]
[Shake]

  ╔═════╗
  ║  8  ║
  ║     ║
  ╚═════╝

History drawer:
Full width overlay
```

---

## 🔌 State Flow Diagram

```
┌──────────────────────────────────────────────────┐
│              AUTHENTICATION STATE                 │
│                                                  │
│  AuthContext                                     │
│  ├── user (name, email, avatar)                 │
│  ├── isAuthenticated (boolean)                  │
│  ├── loading (boolean)                          │
│  └── login/logout functions                     │
│                                                  │
│  Persisted in: localStorage['authToken']        │
└──────────────────────────────────────────────────┘
                        │
                        │ useAuth()
                        ↓
┌──────────────────────────────────────────────────┐
│               DECISION STATE                      │
│                                                  │
│  DecisionContext                                 │
│  ├── currentDecision                            │
│  │   ├── id                                      │
│  │   ├── question                                │
│  │   ├── answer                                  │
│  │   ├── mode                                    │
│  │   └── created_at                              │
│  ├── history (array of past decisions)          │
│  ├── loading (boolean)                          │
│  ├── error (string)                             │
│  ├── askQuestion()                              │
│  ├── fetchHistory()                             │
│  ├── deleteDecision()                           │
│  └── clearHistory()                             │
│                                                  │
│  Persisted in: SQLite decisions table           │
└──────────────────────────────────────────────────┘
                        │
                        │ useDecisions()
                        ↓
┌──────────────────────────────────────────────────┐
│           COMPONENT STATE                        │
│                                                  │
│  HomePage                                        │
│  ├── selectedMode ('normal'|'crazy'|...)       │
│  ├── isShaking (boolean)                        │
│  ├── isHistoryOpen (boolean)                    │
│  └── Local handlers                             │
└──────────────────────────────────────────────────┘
```

---

## 📱 Mobile User Experience

### Login Flow
```
1. Open app
   ↓
2. See "Login with Google" button
   ↓
3. Click → Opens Google OAuth
   ↓
4. Approve permissions
   ↓
5. Redirected back (full screen)
   ↓
6. See user profile in top corner
   ↓
7. Ready to ask questions
```

### Decision Flow (Mobile)
```
1. See mode selector as full-width tabs
   ↓
2. Tap desired mode
   ↓
3. Type question in large textarea
   ↓
4. Tap "Shake the Ball"
   ↓
5. Screen shakes (haptic feedback if device supports)
   ↓
6. Ball shows answer with large text
   ↓
7. Tap ball to flip back
   ↓
8. Tap [📚] to see history drawer
```

---

## 🎯 Key Interaction Points

### Click/Tap Targets
```
Size Recommendations:
- Buttons: 44px × 44px minimum
- Input fields: 48px minimum height
- Interactive elements: 44px touch target

Actual Implementation:
- Mode buttons: 140px × 50px (generous)
- Submit button: 100% width × 44px
- Ball: 200px × 200px (huge tap target)
- History items: Full width + delete button
```

### Hover States
```
Desktop:
- Buttons: Highlight + translate(-2px) + shadow
- Input: Border highlight + glow
- Delete button: Scale(1.2)

Mobile:
- No hover (uses active state instead)
- Highlight on touch
- Tap feedback immediate
```

---

## 🔄 API Request/Response Examples

### Create Decision
```
REQUEST:
POST /api/decisions
Authorization: Bearer <JWT>
Content-Type: application/json

{
  "question": "Will I find true love?",
  "mode": "normal"
}

RESPONSE (200):
{
  "id": "a1b2c3d4e5f6...",
  "question": "Will I find true love?",
  "answer": "The universe has infinite pathways...",
  "mode": "normal",
  "created_at": "2026-02-11T14:30:00Z"
}

RESPONSE (401):
{ "error": "Invalid or expired token" }

RESPONSE (500):
{ "error": "Failed to generate decision" }
```

### Fetch History
```
REQUEST:
GET /api/history?page=1&limit=20&mode=normal
Authorization: Bearer <JWT>

RESPONSE (200):
{
  "decisions": [
    {
      "id": "a1b2c3d4e5f6...",
      "question": "Will I find true love?",
      "answer": "The universe has infinite pathways...",
      "mode": "normal",
      "created_at": "2026-02-11T14:30:00Z"
    },
    ...
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 47,
    "pages": 3
  }
}
```

---

## ✨ Polish Details

### Micro-interactions
```
1. Button hover: Subtle translate + shadow
2. Input focus: Glow effect, border color change
3. Loading state: Spinner + disabled state
4. Success: Answer appears with staggered animation
5. Error: Red highlight, error message
6. History open: Overlay + drawer slide
7. Item delete: Instant removal + list reflow
```

### Accessibility
```
- Semantic HTML (button, form elements)
- ARIA labels on icon buttons
- Color contrast ratios > 4.5:1
- Keyboard navigation supported
- Focus indicators visible
- Error messages associated with inputs
- Loading states announced
```

### Performance Indicators
```
- Fast initial load (<2s)
- API call: 2-3s (due to Gemini generation)
- Smooth 60 FPS animations
- Instant history loading
- Responsive interaction feedback
```

---

## 🎊 Summary

The Gemini Decision Ball is a beautifully crafted, animated web experience that combines:
- **Modern UI Design** (gradients, shadows, animations)
- **Smooth Interactions** (transitions, delays, feedback)
- **Responsive Layout** (desktop to mobile)
- **Accessible Components** (keyboard nav, labels)
- **Performance** (optimized rendering, indexed DB)

**Every pixel, animation, and interaction has been thoughtfully designed.**

---

**Built with Gemini AI & React**
**Version: 1.0.0 | February 2026**
