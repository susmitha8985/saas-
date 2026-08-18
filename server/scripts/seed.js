import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import Reel from '../models/Reel.js';

dotenv.config();

// Configure Cloudinary if keys exist
const isCloudinaryConfigured = process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET;

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
}

const sampleReels = [
  {
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

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/scrollwise';
    console.log(`Connecting to MongoDB for seeding at: ${mongoUri}`);
    
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB database.");

    // Delete existing reels to clean up
    await Reel.deleteMany({ sourceType: 'Seed' });
    console.log("Deleted old seed reels.");

    // Prepare reels to insert
    let reelsToInsert = [...sampleReels];

    if (isCloudinaryConfigured) {
      console.log("Cloudinary keys detected! Uploading seed reels directly to your Cloudinary space...");
      reelsToInsert = [];
      for (const reel of sampleReels) {
        try {
          console.log(`Uploading video "${reel.title}" to Cloudinary account...`);
          const result = await cloudinary.uploader.upload(reel.cloudinaryUrl, {
            resource_type: "video",
            folder: "scrollwise_seed"
          });
          console.log(`Uploaded successfully! Cloudinary URL: ${result.secure_url}`);
          reelsToInsert.push({
            ...reel,
            cloudinaryUrl: result.secure_url,
            thumbnailUrl: result.secure_url.replace(/\.[^/.]+$/, ".jpg")
          });
        } catch (uploadError) {
          console.warn(`⚠️ Cloudinary upload failed for "${reel.title}". Falling back to stock URL. Error:`, uploadError.message);
          reelsToInsert.push(reel);
        }
      }
    } else {
      console.log("Cloudinary is not configured. Seeding reels using local stock video URLs.");
    }

    // Insert new seed reels
    const inserted = await Reel.insertMany(reelsToInsert);
    console.log(`Successfully seeded ${inserted.length} sample reels!`);

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
    process.exit(0);
  } catch (error) {
    console.error("Error during seeding process:", error);
    process.exit(1);
  }
};

seedDB();
