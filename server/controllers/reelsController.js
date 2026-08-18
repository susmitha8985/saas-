import dotenv from 'dotenv';
dotenv.config();
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import Reel from '../models/Reel.js';
import mongoose from 'mongoose';

// In-memory cache for synced Cloudinary reels when MongoDB database is offline
let inMemorySyncedReels = [];


// Multer configuration: store uploaded file in memory
const storage = multer.memoryStorage();
export const uploadMiddleware = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 } // Limit: 50MB for video uploads
}).single('video');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || ''
});

/**
 * Get all Reels
 */
export const getReels = async (req, res) => {
  try {
    const reels = await Reel.find().sort({ createdAt: -1 });
    if (reels.length === 0) {
      return res.json([...inMemorySyncedReels, ...sampleReels]);
    }
    res.json(reels);
  } catch (error) {
    console.warn("Database offline. Falling back to in-memory seed reels. Details:", error.message);
    res.json([...inMemorySyncedReels, ...sampleReels]);
  }
};

export const getReelById = async (req, res) => {
  try {
    const reel = await Reel.findById(req.params.id);
    if (!reel) {
      const mockReel = sampleReels.find(r => r._id === req.params.id);
      if (mockReel) return res.json(mockReel);
      return res.status(404).json({ message: "Reel not found" });
    }
    res.json(reel);
  } catch (error) {
    const mockReel = sampleReels.find(r => r._id === req.params.id);
    if (mockReel) return res.json(mockReel);
    console.warn("Error fetching reel by ID, database offline:", error.message);
    res.status(500).json({ message: "Server error while fetching reel" });
  }
};

/**
 * Upload Reel (Cloudinary Integration)
 */
export const createReel = async (req, res) => {
  try {
    const { title, description, transcript, hashtags, category, difficulty, isEducational } = req.body;

    if (!title || !category) {
      return res.status(400).json({ message: "Title and category are required" });
    }

    let cloudinaryUrl = '';
    let thumbnailUrl = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&auto=format&fit=crop'; // fallback thumbnail

    // Check if Cloudinary is configured
    const isCloudinaryConfigured = process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET;

    if (req.file) {
      if (isCloudinaryConfigured) {
        // Upload to Cloudinary using file buffer
        try {
          const uploadPromise = new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              {
                resource_type: 'video',
                folder: 'scrollwise_reels',
                eager: [{ width: 300, height: 500, crop: 'pad', audio_codec: 'none' }] // Generate a preview thumbnail as well
              },
              (error, result) => {
                if (error) return reject(error);
                resolve(result);
              }
            );
            stream.end(req.file.buffer);
          });

          const result = await uploadPromise;
          cloudinaryUrl = result.secure_url;
          if (result.eager && result.eager[0]) {
            // Use Cloudinary generated video-thumbnail
            thumbnailUrl = result.eager[0].secure_url.replace(/\.[^/.]+$/, ".jpg");
          } else {
            thumbnailUrl = result.secure_url.replace(/\.[^/.]+$/, ".jpg");
          }
        } catch (cloudinaryError) {
          console.error("Cloudinary upload failed, falling back to mock video url:", cloudinaryError);
          // If cloudinary fails, we fallback to a placeholder
          cloudinaryUrl = 'https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-his-computer-34287-large.mp4';
        }
      } else {
        console.warn("Cloudinary not configured. Using fallback demo video URL.");
        cloudinaryUrl = 'https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-his-computer-34287-large.mp4';
      }
    } else {
      return res.status(400).json({ message: "Video file is required" });
    }

    // Process hashtags array
    let tagsArray = [];
    if (hashtags) {
      tagsArray = typeof hashtags === 'string' 
        ? hashtags.split(',').map(tag => tag.trim().replace(/^#/, ''))
        : hashtags;
    }

    const newReel = await Reel.create({
      title,
      description: description || '',
      transcript: transcript || '',
      hashtags: tagsArray,
      cloudinaryUrl,
      thumbnailUrl,
      category,
      difficulty: difficulty || 'Beginner',
      sourceType: 'Upload',
      isEducational: isEducational === 'true' || isEducational === true
    });

    res.status(201).json(newReel);
  } catch (error) {
    console.error("Error creating reel:", error);
    res.status(500).json({ message: "Server error while creating reel" });
  }
};

const sampleReels = [
  {
    _id: "60c72b2f9b1d8b2a1c8f4e01",
    title: "Java Developer vs Light Theme",
    description: "When you open the IDE at 3 AM and forget you have default light theme on.",
    transcript: "Wait, why is my screen brighter than my future? Let me switch this to dark mode. Ah, much better, now I can write bugs in the dark in peace.",
    hashtags: ["programming", "javameme", "developer", "darkmode", "webdev"],
    cloudinaryUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-developer-typing-on-a-keyboard-40620-large.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=500&auto=format&fit=crop",
    category: "memes",
    difficulty: "Beginner",
    sourceType: "Seed",
    isEducational: false
  },
  {
    _id: "60c72b2f9b1d8b2a1c8f4e02",
    title: "The Technical Interview Loop",
    description: "When the interviewer asks for a O(1) space solution but you only know how to write nested double-loops.",
    transcript: "Interviewer: Can you optimize this algorithm to O(1) space complexity? Me: Yes, absolutely. I will just allocate variables in memory and pray the garbage collector runs immediately.",
    hashtags: ["interviewprep", "codingjokes", "swe", "dsa"],
    cloudinaryUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-typing-on-computer-keyboard-40544-large.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&auto=format&fit=crop",
    category: "memes",
    difficulty: "Beginner",
    sourceType: "Seed",
    isEducational: false
  },
  {
    _id: "60c72b2f9b1d8b2a1c8f4e03",
    title: "A Day in the Life of a Remote Dev",
    description: "Waking up at 8:59 AM for a 9:00 AM standup and saying 'still working on that ticket.'",
    transcript: "Good morning! Woke up, drank some espresso, joined my standup call, said 'yesterday I worked on the login page and today I will continue working on the login page', and now I am going to watch YouTube videos on system design.",
    hashtags: ["remotework", "dayinthelife", "softwareengineer", "careervlog"],
    cloudinaryUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-working-on-his-laptop-in-a-coffee-shop-42686-large.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&auto=format&fit=crop",
    category: "career",
    difficulty: "Beginner",
    sourceType: "Seed",
    isEducational: false
  },
  {
    _id: "60c72b2f9b1d8b2a1c8f4e04",
    title: "The Ultimate Developer Setup 2026",
    description: "Checking out this crazy mechanical keyboard and ultrawide monitor setup.",
    transcript: "This keyboard has blue mechanical switches that will wake up your entire neighborhood, and this screen is so wide you need a neck brace to see the terminal. But hey, it looks great on Instagram reels.",
    hashtags: ["setup", "desksetup", "mechanicalkeyboard", "gadgets", "developer"],
    cloudinaryUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-typing-on-a-keyboard-under-colored-lights-40222-large.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop",
    category: "gadgets",
    difficulty: "Beginner",
    sourceType: "Seed",
    isEducational: false
  },
  {
    _id: "60c72b2f9b1d8b2a1c8f4e05",
    title: "AI Agent Outperforms Engineers?",
    description: "New AI agent claims to build full SaaS products from a single text prompt.",
    transcript: "A brand new AI coding agent has just dropped, claiming it can build entire SaaS applications in minutes from plain English. Is software engineering dead? Or is it just another fancy wrapper script? Let's analyze what it actually outputs.",
    hashtags: ["ai", "codingagent", "technews", "chatgpt", "futureofwork"],
    cloudinaryUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-working-on-her-laptop-in-the-office-42702-large.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=500&auto=format&fit=crop",
    category: "ai",
    difficulty: "Intermediate",
    sourceType: "Seed",
    isEducational: true
  },
  {
    _id: "60c72b2f9b1d8b2a1c8f4e06",
    title: "Why you should stop using nested loops",
    description: "How nested loops cause O(N^2) complexity and how to optimize it using a HashMap.",
    transcript: "If you have a nested loop to find matching pairs in an array, it takes quadratic time. That's slow! Instead, load the elements into a HashMap. Now it takes linear O(N) time and runs 100x faster for large datasets. This is the difference between passing and failing a coding round.",
    hashtags: ["coding", "dsa", "algorithms", "performance", "computerscience"],
    cloudinaryUrl: "https://assets.mixkit.co/videos/preview/mixkit-programmer-working-on-his-laptop-in-the-office-42706-large.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=500&auto=format&fit=crop",
    category: "coding",
    difficulty: "Intermediate",
    sourceType: "Seed",
    isEducational: true
  },
  {
    _id: "60c72b2f9b1d8b2a1c8f4e07",
    title: "System Design for Beginners: Web APIs",
    description: "What actually happens under the hood when a browser requests an API URL?",
    transcript: "First, your computer checks its cache and sends a DNS query to find the server's IP address. Then it initiates a TCP handshake, sends an HTTP request, and the API gateway forwards it to a microservice. Finally, the service queries the database and returns a JSON payload.",
    hashtags: ["systemdesign", "backend", "webdevelopment", "careerdevelopment"],
    cloudinaryUrl: "https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-his-computer-34287-large.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop",
    category: "career",
    difficulty: "Intermediate",
    sourceType: "Seed",
    isEducational: true
  },
  {
    _id: "60c72b2f9b1d8b2a1c8f4e08",
    title: "The Physics Engine Glitch",
    description: "When your game graphics engine fails and physics objects float away.",
    transcript: "Look at this crate in the new update. It is supposed to drop down when shot, but instead, it is defying gravity and flying straight into orbit. Peak game physics engines in 2026. Still got a high review score though!",
    hashtags: ["gaming", "gamedev", "glitch", "fun", "indiedev"],
    cloudinaryUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-controller-playing-a-game-41804-large.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=500&auto=format&fit=crop",
    category: "gaming",
    difficulty: "Beginner",
    sourceType: "Seed",
    isEducational: false
  }
];

export const seedReels = async (req, res) => {
  try {
    await Reel.deleteMany({ sourceType: 'Seed' });
    const inserted = await Reel.insertMany(sampleReels);
    res.json({ message: `Successfully seeded ${inserted.length} sample reels!`, reels: inserted });
  } catch (error) {
    console.error("Error during web seeding:", error);
    res.status(500).json({ message: "Seeding failed", error: error.message });
  }
};

/**
 * Sync reels from Cloudinary
 */
export const syncCloudinaryReels = async (req, res) => {
  try {
    // Configure Cloudinary dynamically on call to ensure env is ready
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
      api_key: process.env.CLOUDINARY_API_KEY || '',
      api_secret: process.env.CLOUDINARY_API_SECRET || ''
    });

    const isCloudinaryConfigured = process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET;
    if (!isCloudinaryConfigured) {
      return res.status(400).json({ message: "Cloudinary is not configured on the server." });
    }

    // Call Cloudinary Admin API to list video uploads
    const result = await cloudinary.api.resources({
      resource_type: 'video',
      type: 'upload',
      max_results: 100
    });

    const resources = result.resources || [];
    let syncedCount = 0;
    const syncedReels = [];

    // Check if database is online
    const isDbConnected = mongoose.connection.readyState === 1;
    if (!isDbConnected) {
      inMemorySyncedReels = []; // Reset in-memory cache to regenerate metadata cleanly
    }

    for (const resource of resources) {
      const url = resource.secure_url || resource.url;
      if (!url) continue;

      // Check if it already exists (in db or in-memory)
      let alreadyExists = false;
      if (isDbConnected) {
        try {
          const existingReel = await Reel.findOne({ cloudinaryUrl: url });
          if (existingReel) alreadyExists = true;
        } catch (dbErr) {
          console.warn("Db check failed, checking in-memory:", dbErr.message);
          alreadyExists = inMemorySyncedReels.some(r => r.cloudinaryUrl === url);
        }
      } else {
        alreadyExists = inMemorySyncedReels.some(r => r.cloudinaryUrl === url);
      }

      if (!alreadyExists) {
        // Parse a readable title from public_id
        const parts = resource.public_id.split('/');
        const fileName = parts[parts.length - 1];
        const readableTitle = fileName
          .replace(/[-_]+/g, ' ')
          .replace(/\b\w/g, c => c.toUpperCase());

        // Generate thumbnail by replacing extension with .jpg
        const thumbnailUrl = url.replace(/\.[^/.]+$/, ".jpg");

        // Determine category (use first folder name or default to 'coding')
        let category = 'coding';
        if (parts.length > 1) {
          category = parts[0].replace(/[-_]+/g, ' ').toLowerCase();
        }

        const reelData = {
          _id: `cloudinary_${resource.asset_id || Math.random().toString(36).substring(2, 11)}`,
          title: readableTitle || 'Untitled Cloudinary Video',
          description: `Learn foundational engineering concepts, design patterns, and programming architecture.`,
          transcript: 'Foundational programming learning session.',
          hashtags: ['engineering', 'learn', category.replace(/\s+/g, '')],
          cloudinaryUrl: url,
          thumbnailUrl,
          category: category || 'coding',
          difficulty: 'Beginner',
          sourceType: 'CloudinarySync',
          isEducational: true,
          createdAt: new Date()
        };

        if (isDbConnected) {
          try {
            const newReel = await Reel.create(reelData);
            syncedReels.push(newReel);
          } catch (dbCreateErr) {
            console.warn("DB save failed, saving in-memory:", dbCreateErr.message);
            inMemorySyncedReels.unshift(reelData);
            syncedReels.push(reelData);
          }
        } else {
          inMemorySyncedReels.unshift(reelData);
          syncedReels.push(reelData);
        }
        syncedCount++;
      }
    }

    res.json({
      message: `Successfully synced ${syncedCount} new videos from Cloudinary!`,
      syncedCount,
      reels: syncedReels
    });
  } catch (error) {
    console.error("Error syncing Cloudinary reels:", error);
    res.status(500).json({ message: "Error syncing from Cloudinary", error: error.message });
  }
};


