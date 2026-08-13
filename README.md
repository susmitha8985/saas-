# codeForEverybody — AI-Powered Course Platform

An intelligent, modern learning platform built with **React 19**, **Vite**, and **FastAPI**. Features a full course video player with an integrated **AI Python Tutor** powered by Groq (Llama 3).

---

## 🚀 Technology Stack

| Layer | Tech |
|-------|------|
| **Frontend** | React 19, JavaScript (ES6+), React Router DOM v7 |
| **Styling** | Vanilla CSS, CSS Variables |
| **Icons** | Lucide React |
| **Animations** | Framer Motion |
| **Code Editor** | Monaco Editor (`@monaco-editor/react`) |
| **Python Runner** | Pyodide (in-browser, no server needed) |
| **AI Backend** | FastAPI + Groq API (Llama 3.3-70b) |
| **Build Tool** | Vite |

---

## 📁 Project Structure

```text
saas-/
├── src/
│   ├── components/
│   │   ├── AuthPage/          → Login / Signup page
│   │   ├── CoursePlayer/      → Video player + AI Tutor panel
│   │   ├── OverviewPage/      → Student dashboard (Issue #4)
│   │   ├── ProfilePage/       → User profile page (Issue #5)
│   │   ├── TestHeroCards/     → Landing page + Explore Courses
│   │   ├── LandingHero/       → Hero section
│   │   ├── CookieBanner/      → GDPR cookie banner
│   │   ├── StickyMobileCTA/   → Mobile sticky CTA
│   │   ├── ThankYouPage/      → Enrollment confirmation
│   │   ├── NotFoundPage/      → 404 page
│   │   └── LegalPages/        → Privacy Policy + Terms
│   ├── utils/
│   │   ├── aiService.js       → Calls AI backend (Issue #6)
│   │   ├── pyodideService.js  → In-browser Python runner (Issue #6)
│   │   ├── seo.js             → SEO helpers
│   │   └── analytics.js       → Page tracking
│   ├── App.jsx                → Routes
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

---

## 🛠️ Getting Started — Frontend

### Prerequisites
- Node.js v18+
- npm

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/susmitha8985/saas-.git
cd saas-

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
```

Frontend runs at: **http://localhost:5173**

---

## 🤖 AI Tutor Backend Setup — REQUIRED for AI Chat

> ⚠️ **Action needed by backend team (Issue #8)**
>
> The AI chat feature inside the Course Player needs the `code_assistant` backend running.
> Python code execution (Pyodide) works without this, but AI chat answers need it.

### Step 1 — Clone the backend repo

```bash
git clone https://github.com/shaik-zabi-321/code_assistant.git
cd code_assistant/backend
```

### Step 2 — Get a FREE Groq API Key

1. Go to 👉 **https://console.groq.com**
2. Sign up (free)
3. Click **"Create API Key"**
4. Copy the key (starts with `gsk_...`)

### Step 3 — Create the `.env` file

Inside `code_assistant/backend/`, create a file called `.env`:

```env
GROQ_API_KEY=gsk_your_api_key_here
```

> ⚠️ Never commit this file to GitHub. It is already in `.gitignore`.

### Step 4 — Run the backend

```bash
# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the server
uvicorn main:app --reload
```

Backend runs at: **http://localhost:8000**

### Step 5 — Connect to the frontend

Once the backend is running, open `src/utils/aiService.js` and make sure the URL matches:

```js
const API_URL = 'http://localhost:8000'; // local dev
// For production, replace with your deployed backend URL:
// const API_URL = 'https://your-app.onrender.com';
```

### ✅ That's it — the AI chat will work automatically!

---

## 🌐 Pages & Routes

| Route | Page | Issue |
|-------|------|-------|
| `/` | Landing Page | — |
| `/auth` | Login / Signup | — |
| `/player` | Course Video Player + AI Tutor | #6 |
| `/overview` | Student Dashboard | #4 |
| `/profile` | User Profile | #5 |
| `/privacy` | Privacy Policy | — |
| `/terms` | Terms of Service | — |
| `/thank-you` | Enrollment Confirmation | — |

---

## 🚢 Deploying the Backend (Production)

To make the AI chat work in production (not just localhost), deploy the FastAPI backend to a free hosting service:

| Platform | Steps |
|----------|-------|
| **Render.com** | Connect GitHub repo → set `GROQ_API_KEY` in Environment Variables → Deploy |
| **Railway.app** | Connect GitHub repo → set `GROQ_API_KEY` in Variables → Deploy |

After deploying, update `src/utils/aiService.js`:
```js
const API_URL = 'https://your-deployed-backend.onrender.com';
```

---

## 📜 Available Scripts

```bash
npm run dev      # Start local development server (http://localhost:5173)
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Lint with Oxlint
```

---

## 👥 Team Issues Status

| Issue | Title | Assigned To | Status |
|-------|-------|-------------|--------|
| #4 | Create overview page | shaik-zabi-321 | ✅ Done |
| #5 | Create profile page | shaik-zabi-321 | ✅ Done |
| #6 | Fix the video player with AI tutor | shaik-zabi-321 | ✅ Done |
| #7 | Create the courses page | sa6743035-ux | 🔄 In Progress |
| #8 | Connect API endpoints to backend | shaikafridd | 🔄 In Progress |
