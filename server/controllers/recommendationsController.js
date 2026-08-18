import mongoose from 'mongoose';
import Recommendation from '../models/Recommendation.js';
import Interaction from '../models/Interaction.js';
import Reel from '../models/Reel.js';
import User from '../models/User.js';
import { generateAIRecommendations } from '../services/ai.js';

/**
 * Generate AI-based recommendations based on user's recent interactions
 */
export const generateRecommendations = async (req, res) => {
  try {
    const userId = req.user.id;
    const isDbConnected = mongoose.connection.readyState === 1;

    let interactions = [];
    let reels = [];
    let userObj = { _id: userId, name: req.user.name || "Guest Student" };

    if (isDbConnected) {
      try {
        // Fetch user's interactions (limit to top 15 recent actions to avoid overloading context window)
        interactions = await Interaction.find({ userId })
          .sort({ createdAt: -1 })
          .limit(15);

        if (interactions.length > 0) {
          const reelIds = interactions.map(i => i.reelId);
          reels = await Reel.find({ _id: { $in: reelIds } });
        }

        userObj = await User.findById(userId) || userObj;
      } catch (dbErr) {
        console.warn("DB query failed while generating recommendations, falling back to mock interactions:", dbErr.message);
      }
    }

    // Fallback mock history if DB is offline or user has no interactions yet
    if (interactions.length === 0) {
      console.log("No interaction history (or DB offline). Using mock telemetry for AI recommendations...");
      interactions = [
        {
          reelId: "60c72b2f9b1d8b2a1c8f4e01",
          interactionType: "like",
          watchedPercent: 100
        },
        {
          reelId: "60c72b2f9b1d8b2a1c8f4e06",
          interactionType: "save",
          watchedPercent: 95
        }
      ];

      reels = [
        {
          _id: "60c72b2f9b1d8b2a1c8f4e01",
          title: "Java Developer vs Light Theme",
          category: "memes",
          hashtags: ["programming", "javameme"],
          description: "When you open the IDE at 3 AM and forget you have default light theme on.",
          transcript: "Wait, why is my screen brighter than my future?",
          isEducational: false
        },
        {
          _id: "60c72b2f9b1d8b2a1c8f4e06",
          title: "Why you should stop using nested loops",
          category: "coding",
          hashtags: ["coding", "dsa", "algorithms"],
          description: "How nested loops cause O(N^2) complexity and how to optimize it using a HashMap.",
          transcript: "If you have a nested loop to find matching pairs in an array, it takes quadratic time. That's slow! Instead, load the elements into a HashMap.",
          isEducational: true
        }
      ];
    }

    // Call the AI generator (Grok or Fallback)
    const rawRecommendations = await generateAIRecommendations(userObj, interactions, reels);

    // Write recommendations to DB if connected
    const savedRecommendations = [];
    for (const rec of rawRecommendations) {
      if (isDbConnected) {
        try {
          const createdRec = await Recommendation.create({
            userId,
            currentReelId: rec.currentReelId,
            detectedInterest: rec.detectedInterest,
            evidence: rec.evidence,
            recommendedTopic: rec.recommendedTopic,
            category: rec.category,
            reason: rec.reason,
            difficulty: rec.difficulty,
            confidence: rec.confidence
          });
          
          const populated = await Recommendation.findById(createdRec._id).populate('currentReelId');
          savedRecommendations.push(populated);
          continue;
        } catch (dbSaveErr) {
          console.warn("DB save recommendation failed, using direct response:", dbSaveErr.message);
        }
      }
      
      // If DB is offline, construct output directly
      savedRecommendations.push({
        _id: `rec_${Math.random().toString(36).substring(2, 11)}`,
        userId,
        currentReelId: null,
        detectedInterest: rec.detectedInterest,
        evidence: rec.evidence,
        recommendedTopic: rec.recommendedTopic,
        category: rec.category,
        reason: rec.reason,
        difficulty: rec.difficulty,
        confidence: rec.confidence,
        createdAt: new Date()
      });
    }

    res.status(201).json({
      message: "Recommendations generated successfully",
      recommendations: savedRecommendations
    });
  } catch (error) {
    console.error("Error generating recommendations:", error);
    res.status(500).json({ message: "Server error while generating recommendations", details: error.message });
  }
};

/**
 * Get recommendation history for the user
 */
export const getRecommendations = async (req, res) => {
  try {
    const isDbConnected = mongoose.connection.readyState === 1;
    if (!isDbConnected) {
      console.warn("Database offline. Returning mock fallback recommendation list.");
      return res.json([
        {
          _id: "mock_rec_1",
          detectedInterest: "Algorithmic optimization in Java",
          evidence: "User saved an educational reel explaining why nested loops cause O(N^2) complexity.",
          recommendedTopic: "HashMap Mastery: Reducing Time Complexity from O(N^2) to O(N) in Java",
          category: "DSA",
          reason: "Builds directly on the saved reel by diving deeper into HashMap internals, collision handling, and performance considerations.",
          difficulty: "Intermediate",
          confidence: "High",
          createdAt: new Date()
        },
        {
          _id: "mock_rec_2",
          detectedInterest: "Java Language fundamentals and performance best practices",
          evidence: "User liked a Java-related meme.",
          recommendedTopic: "Effective Java Collections: Choosing the Right List, Set, and Map for Performance",
          category: "Java",
          reason: "Transitions from humor to a high-value tutorial that explains collection picking best practices.",
          difficulty: "Intermediate",
          confidence: "Medium",
          createdAt: new Date()
        }
      ]);
    }

    const userId = req.user.id;
    const recommendations = await Recommendation.find({ userId })
      .populate('currentReelId')
      .sort({ createdAt: -1 });

    res.json(recommendations);
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    res.status(500).json({ message: "Server error while fetching recommendations" });
  }
};
