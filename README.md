# ScrollWise — AI-Powered Reels Recommendation Agent for Students

ScrollWise is a MERN application designed to redirect students from doomscrolling distraction to productive learning. Instead of fighting short-form content scrolling habits, ScrollWise intercepts it. It tracks what fictional/anonymized reels students interact with, analyzes interest signals using Grok AI, and serves high-value technical study recommendations (e.g. System Design, DSA, AI, Hardware, Careers) instead of superficial memes or hype loops.

---

## 🚀 Tech Stack

- **Frontend**: React + Vite, Tailwind CSS v3, React Router DOM, Lucide Icons
- **Backend**: Node.js, Express.js, Mongoose, Multer
- **Database**: MongoDB (Local or Atlas)
- **AI Engine**: Grok API (using environment variables)
- **Video Storage**: Cloudinary (secure backend upload stream)
- **Language**: JavaScript (ES6+ Modules)

---

## 📂 Project Structure

```text
scrollwise/
├── public/                  # Static assets
├── src/                     # React client codebase
│   ├── components/          # Reusable UI components (Navbar, etc.)
│   ├── context/             # AuthContext (state, JWT, api fetch wrapper)
│   ├── pages/               # Page routers (Landing, Auth, Feed, Upload, Recommendations, Dashboard)
│   ├── App.jsx              # Client router mapping
│   ├── index.css            # Tailwind directive injection & theme variables
│   └── main.jsx             # Frontend mounting root
├── server/                  # Node/Express backend codebase
│   ├── controllers/         # Endpoint business logic controllers
│   ├── middleware/          # JWT protection auth middleware
│   ├── models/              # Mongoose database models (User, Reel, Interaction, Recommendation)
│   ├── scripts/             # DB seeding scripts (seeding fictional Reels)
│   ├── services/            # AI services (Grok API + Fallback Recommendation engine)
│   ├── server.js            # Express app entry point
│   ├── package.json         # Server dependency manifest
│   └── .env.example         # Server environment variables template
├── tailwind.config.js       # Tailwind CSS configurations
├── postcss.config.js        # PostCSS configurations
├── package.json             # Client dependency manifest
└── README.md                # Documentation (this file)
```

---

## ⚙️ Environment Configuration

### 1. Frontend Environment (`.env`)
Create a `.env` file in the root folder:
```env
VITE_API_URL=http://localhost:5000/api
```

### 2. Backend Environment (`server/.env`)
Create a `.env` file in the `server` folder:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/scrollwise
JWT_SECRET=your_jwt_secret_key_here
GROK_API_KEY=your_grok_api_key_here
GROK_BASE_URL=https://api.x.ai/v1
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name_here
CLOUDINARY_API_KEY=your_cloudinary_api_key_here
CLOUDINARY_API_SECRET=your_cloudinary_api_secret_here
```
> **Note**: If `GROK_API_KEY` is not provided, the application will automatically activate its internal **Fallback Recommendation Engine** and label confidence as "Medium/Low" to ensure it works offline. If Cloudinary keys are missing, uploads fall back to mock video placeholders, preventing crashes.

---

## 🛠️ Installation & Running Locally

Ensure you have **Node.js (v18+)** and a local **MongoDB** instance running.

### Step 1: Install and Run Backend
1. Navigate to the `server` folder:
   ```bash
   cd server
   ```
2. Install server dependencies:
   ```bash
   npm install
   ```
3. Seed the database with 8 fictional sample Reels (Coding, Career, Memes, AI, Gaming, etc.):
   ```bash
   npm run seed
   ```
   *Alternatively, you can click the "Seed Sample Reels" button on the web app feed if the DB is empty.*
4. Start the Express development server:
   ```bash
   npm run dev
   ```
   *The server runs at `http://localhost:5000`.*

### Step 2: Install and Run Frontend
1. Return to the root folder:
   ```bash
   cd ..
   ```
2. Install client dependencies:
   ```bash
   npm install
   ```
3. Start the Vite React client:
   ```bash
   npm run dev
   ```
   *The client runs at `http://localhost:5173`.*

---

## 🧠 The ScrollWise Recommendation Logic & Built-in Trap

### The Problem with standard feeds
Traditional recommendation algorithms look at your click-rates. If you watch a "Java Developer Light Theme" joke, they serve you ten more Java jokes. You learn nothing and remain trapped in the loop.

### The ScrollWise Solution
ScrollWise utilizes Grok's semantic intelligence to understand the **core context and tone** behind interactions. If a user:
1. Likes a coding meme,
2. Watches a vlogger daily dev routine,
3. Saves a tech news clip,
Grok bypasses the vlogs/memes, infers **Software Engineering Career Intent** at a **Beginner/Intermediate Level**, and recommends:
- Topic: *"What to learn for entry-level software engineering interviews"* or *"How a backend API request flows from browser to database"*.
- Category: **Career** or **HLD**.
- Why: Connected directly to their interest in developer culture, but shifted to actual educational topics.
- Expandable: Expanded explanation detailing the AI reasoning path.
- Fallback: Clearly falls back to predefined templates with medium confidence if the API is offline.
