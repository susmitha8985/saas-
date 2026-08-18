import mongoose from 'mongoose';
import User from '../models/User.js';
import Interaction from '../models/Interaction.js';
import Reel from '../models/Reel.js';
import Recommendation from '../models/Recommendation.js';

export const getDashboardData = async (req, res) => {
  try {
    const isDbConnected = mongoose.connection.readyState === 1;
    if (!isDbConnected) {
      console.warn("Database offline. Returning mock fallback dashboard data.");
      const mockUser = req.user ? {
        _id: req.user.id,
        name: req.user.name || "Demo Student",
        email: req.user.email || "student@scrollwise.ai",
        detectedInterests: ["Java", "System Design", "DSA"],
        profile: {
          avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${req.user.name || "Demo"}`,
          experienceLevel: "Beginner",
          bio: "Technical education telemetry tracker (Database-offline fallback)."
        }
      } : {
        _id: "mock_user_id",
        name: "Demo Student",
        email: "student@scrollwise.ai",
        detectedInterests: ["Java", "System Design", "DSA"],
        profile: {
          avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=Demo`,
          experienceLevel: "Beginner",
          bio: "Technical education telemetry tracker (Database-offline fallback)."
        }
      };

      return res.json({
        user: mockUser,
        stats: {
          totalInteractions: 8,
          likesCount: 3,
          savesCount: 2,
          skipsCount: 1,
          watchesCount: 2,
          educationalRatio: 65,
          totalRecommendations: 2
        },
        categoryDistribution: {
          "DSA": 1,
          "Java": 1
        },
        recentInteractions: [
          {
            _id: "mock_int_1",
            reelId: "60c72b2f9b1d8b2a1c8f4e06",
            title: "Why you should stop using nested loops",
            category: "coding",
            interactionType: "save",
            watchedPercent: 95,
            createdAt: new Date()
          },
          {
            _id: "mock_int_2",
            reelId: "60c72b2f9b1d8b2a1c8f4e01",
            title: "Java Developer vs Light Theme",
            category: "memes",
            interactionType: "like",
            watchedPercent: 100,
            createdAt: new Date()
          }
        ]
      });
    }

    const userId = req.user.id;

    // 1. Fetch User profile and detected interests
    const user = await User.findById(userId).select('-passwordHash');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2. Fetch all interactions to compute stats
    const interactions = await Interaction.find({ userId });
    
    // Total interactions
    const totalInteractions = interactions.length;
    
    // Watched, Liked, Saved, Skipped counts
    const likesCount = interactions.filter(i => i.interactionType === 'like').length;
    const savesCount = interactions.filter(i => i.interactionType === 'save').length;
    const skipsCount = interactions.filter(i => i.interactionType === 'skip').length;
    const watchesCount = interactions.filter(i => i.interactionType === 'watch').length;

    // Fetch the reels themselves to compute educational ratio
    const reelIds = interactions.map(i => i.reelId);
    const reels = await Reel.find({ _id: { $in: reelIds } });
    
    const educationalInteractionsCount = interactions.filter(i => {
      const reel = reels.find(r => r._id.toString() === i.reelId.toString());
      return reel && reel.isEducational;
    }).length;

    const educationalRatio = totalInteractions > 0 
      ? Math.round((educationalInteractionsCount / totalInteractions) * 100) 
      : 0;

    // 3. Fetch recommendation counts & category distribution
    const recommendations = await Recommendation.find({ userId });
    const totalRecommendations = recommendations.length;

    const categoryDistribution = {};
    recommendations.forEach(r => {
      categoryDistribution[r.category] = (categoryDistribution[r.category] || 0) + 1;
    });

    // 4. Fetch 5 most recent interactions with Reel details to display
    const recentInteractionsRaw = await Interaction.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('reelId');

    const recentInteractions = recentInteractionsRaw.map(i => {
      if (!i.reelId) return null;
      return {
        _id: i._id,
        reelId: i.reelId._id,
        title: i.reelId.title,
        category: i.reelId.category,
        interactionType: i.interactionType,
        watchedPercent: i.watchedPercent,
        createdAt: i.createdAt
      };
    }).filter(Boolean);

    res.json({
      user,
      stats: {
        totalInteractions,
        likesCount,
        savesCount,
        skipsCount,
        watchesCount,
        educationalRatio,
        totalRecommendations
      },
      categoryDistribution,
      recentInteractions
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: "Server error while fetching dashboard data" });
  }
};

