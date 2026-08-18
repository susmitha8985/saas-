import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Import controllers and middlewares
import { registerUser, loginUser } from './controllers/authController.js';
import { getReels, getReelById, createReel, seedReels, syncCloudinaryReels, uploadMiddleware } from './controllers/reelsController.js';
import { logInteraction } from './controllers/interactionsController.js';
import { generateRecommendations, getRecommendations } from './controllers/recommendationsController.js';
import { getDashboardData } from './controllers/dashboardController.js';
import { protect } from './middleware/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Disable mongoose operation buffering so queries fail fast if database is offline
mongoose.set('bufferCommands', false);

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.post('/api/auth/register', registerUser);
app.post('/api/auth/login', loginUser);

app.get('/api/reels', getReels);
app.post('/api/reels', uploadMiddleware, createReel);
app.get('/api/reels/seed', seedReels);
app.post('/api/reels/seed', seedReels);
app.post('/api/reels/sync', syncCloudinaryReels);
app.get('/api/reels/:id', getReelById);

app.post('/api/interactions', protect, logInteraction);

app.post('/api/recommendations/generate', protect, generateRecommendations);
app.get('/api/recommendations', protect, getRecommendations);

app.get('/api/dashboard', protect, getDashboardData);

app.get('/', (req, res) => {
  res.json({ message: "Welcome to the ScrollWise API!" });
});

// Database connection
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/scrollwise';
console.log("Connecting to MongoDB asynchronously at:", mongoUri);

// Start the Express server immediately so that it is online
app.listen(PORT, () => {
  console.log(`ScrollWise server running on port ${PORT}`);
});

// Connect to MongoDB in the background
mongoose.connect(mongoUri)
  .then(() => {
    console.log("MongoDB connection established successfully.");
  })
  .catch((err) => {
    console.warn("⚠️ MongoDB offline. Running in database-fallback mode. Telemetries will compile locally. Error:", err.message);
  });
