import mongoose from 'mongoose';
import User from '../models/User.js';

// Predefined high-quality fallback recommendations mapped by category
const FALLBACK_RECOMMENDATIONS = {
  coding: {
    detectedInterest: "Software Engineering & Coding Best Practices",
    evidence: "User showed interest in coding and programming clips",
    recommendedTopic: "How a backend API request flows from browser to database",
    category: "HLD",
    reason: "Practical explanation of network and server architecture, transitioning from basic programming into multi-tier systems.",
    difficulty: "Intermediate",
    confidence: "Medium"
  },
  ai: {
    detectedInterest: "Artificial Intelligence & Neural Networks",
    evidence: "User showed interest in AI trends and gadgets",
    recommendedTopic: "Understanding Transformer Networks and self-attention mechanism",
    category: "AI",
    reason: "Deep dive into the neural network architecture powering modern generative AI, focusing on educational credibility.",
    difficulty: "Advanced",
    confidence: "Medium"
  },
  career: {
    detectedInterest: "Developer Careers & Interview Preparation",
    evidence: "User viewed software engineer lifestyle and career tips",
    recommendedTopic: "What to learn for entry-level software engineering interviews",
    category: "Career",
    reason: "Practical syllabus checklist and step-by-step prep strategy for data structures and system design interviews.",
    difficulty: "Beginner",
    confidence: "Medium"
  },
  gadgets: {
    detectedInterest: "Computer Hardware & Systems Engineering",
    evidence: "User interacted with gadget reviews and hardware comparisons",
    recommendedTopic: "How CPUs execute instructions: ALU, Registers, and cache levels",
    category: "Hardware",
    reason: "Under the hood inspection of computer architecture, turning retail interest into computer engineering concepts.",
    difficulty: "Intermediate",
    confidence: "Medium"
  },
  memes: {
    detectedInterest: "Software Engineering Career Foundations",
    evidence: "User watched programmer memes and coding jokes",
    recommendedTopic: "Understanding Data Structures: Trees and Hash Maps under the hood",
    category: "DSA",
    reason: "Moving from surface-level programming jokes to mastering the foundational data structures essential for coding rounds.",
    difficulty: "Beginner",
    confidence: "Medium"
  },
  default: {
    detectedInterest: "Full-Stack Web Development Foundations",
    evidence: "General technical interaction history",
    recommendedTopic: "How the DOM renders and optimizes layout paint in browser engines",
    category: "Other",
    reason: "Deep dive explanation of browser engine behavior to help elevate frontend engineering skills.",
    difficulty: "Intermediate",
    confidence: "Low"
  }
};

/**
 * AI Service to analyze user interactions using Grok or Fallback engine
 */
export const generateAIRecommendations = async (user, interactions, recentReels) => {
  // If we don't have enough interactions, we use a friendly default
  if (!interactions || interactions.length === 0) {
    return [
      {
        detectedInterest: "Software Engineering & Computer Science Foundations",
        evidence: "Welcome to ScrollWise! Start interacting with the reels feed to unlock personalized recommendation streams.",
        recommendedTopic: "Introduction to Big O Notation and Algorithm Analysis",
        category: "DSA",
        reason: "Every engineer needs a solid grasp of space and time complexity to build scalable software.",
        difficulty: "Beginner",
        confidence: "High",
        currentReelId: null
      }
    ];
  }

  // Create a structured summary of what the user did
  const userHistorySummary = interactions.map(item => {
    const reel = recentReels.find(r => r._id.toString() === item.reelId.toString());
    if (!reel) return null;
    return {
      title: reel.title,
      category: reel.category,
      hashtags: reel.hashtags,
      description: reel.description,
      transcript: reel.transcript,
      isEducational: reel.isEducational,
      action: item.interactionType, // 'watch', 'like', 'save', 'skip'
      watchedPercent: item.watchedPercent
    };
  }).filter(Boolean);

  const grokApiKey = process.env.GROK_API_KEY;
  let grokBaseUrl = process.env.GROK_BASE_URL || 'https://api.x.ai/v1';
  let modelName = 'grok-2-1212';

  if (!grokApiKey) {
    console.warn("GROK_API_KEY is not defined. Using the fallback recommendation engine.");
    return runFallbackEngine(userHistorySummary, interactions, recentReels);
  }

  // Auto-detect Groq API keys (prefix gsk_) and route to Groq endpoints dynamically
  if (grokApiKey.startsWith('gsk_')) {
    console.log("Groq API key detected. Customizing endpoint and model configuration for Groq...");
    grokBaseUrl = 'https://api.groq.com/openai/v1';
    modelName = 'groq/compound-mini'; // Use groq/compound-mini model
  }

  try {
    const prompt = `You are ScrollWise, an expert AI tutor and Reels recommendation agent. 
Analyze the student's recent interaction history with Reels and suggest 1-2 practical, high-value, educational tech Reels that align with their broader learning path.

### Built-in Trap Rule:
If the user interacts mostly with coding jokes, programming memes, tech news hype, or software developer lifestyle vlogs (e.g. Java memes, daily tech vlogs, coding jokes, retail hardware reviews):
- Do NOT recommend more jokes, vlogs, memes, or superficial videos.
- INFER the broader technical career/learning path (e.g. Developer Career, System Design, Data Structures, Web Performance).
- RECOMMENDED high-value, credible educational reels that teach actionable coding, system flow, or interview skills.
- Avoid low-value hype content (e.g. "10 AI tools that will make you rich", "earn $100k in 1 week"). Recommend practical, credible lessons.

### Student Interaction History:
${JSON.stringify(userHistorySummary, null, 2)}

### Output Format:
Return a JSON object containing:
1. "detectedInterests": A string list of inferred tech topics/interests.
2. "experienceLevel": "Beginner", "Intermediate", or "Advanced".
3. "recommendations": An array of recommendation objects. Each object MUST have this structure:
{
  "currentReelTitle": "title of the reel from the history that triggered this",
  "detectedInterest": "broader tech topic / interest inferred",
  "evidence": "brief justification from the interaction history (e.g., user watched programming memes 100% and liked coding interviews)",
  "recommendedTopic": "exact title of the high-value technical topic/reel to recommend",
  "category": "One of: AI / DSA / Java / HLD / Cybersecurity / Cloud / Hardware / Career / Other",
  "reason": "connection showing how this recommendation addresses their deeper interest",
  "difficulty": "Beginner / Intermediate / Advanced",
  "confidence": "High / Medium / Low"
}

Respond ONLY with valid JSON. Do not include markdown code block syntax (like \`\`\`json) or extra text.`;

    const requestPayload = {
      model: modelName,
      messages: [
        { role: 'system', content: 'You are a technical education recommender. You respond strictly in valid JSON.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.2
    };

    // Enable structured JSON mode for Groq to guarantee clean parsing
    if (grokApiKey.startsWith('gsk_')) {
      requestPayload.response_format = { type: 'json_object' };
    }

    const response = await fetch(`${grokBaseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${grokApiKey}`
      },
      body: JSON.stringify(requestPayload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Grok API returned status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    let contentText = data.choices[0].message.content.trim();

    // Clean markdown code blocks if the LLM ignored instructions
    if (contentText.startsWith('```')) {
      contentText = contentText.replace(/^```json\s*/, '').replace(/```$/, '').trim();
    }

    const parsed = JSON.parse(contentText);

    // Save detected interests and level back to user profile as a side effect
    if (parsed.detectedInterests && user && mongoose.connection.readyState === 1) {
      try {
        await User.findByIdAndUpdate(user._id, {
          $addToSet: { detectedInterests: { $each: parsed.detectedInterests } },
          'profile.experienceLevel': parsed.experienceLevel || 'Unspecified'
        });
      } catch (dbErr) {
        console.warn("Could not save detected interests to database:", dbErr.message);
      }
    }

    // Map the string titles to active reels if possible, otherwise attach currentReelId as the latest matched id
    const recommendations = parsed.recommendations.map(rec => {
      // Try to find the matching Reel ID from recentReels for currentReelId
      const matchingReel = recentReels.find(r => r.title.toLowerCase().includes(rec.currentReelTitle?.toLowerCase()));
      
      return {
        detectedInterest: rec.detectedInterest,
        evidence: rec.evidence,
        recommendedTopic: rec.recommendedTopic,
        category: rec.category,
        reason: rec.reason,
        difficulty: rec.difficulty,
        confidence: rec.confidence,
        currentReelId: matchingReel ? matchingReel._id : (recentReels[0]?._id || null),
        recommendedReelId: null // Typically a new topic they haven't seen yet
      };
    });

    return recommendations;
  } catch (error) {
    console.error("Failed to generate recommendations using Grok AI API:", error);
    return runFallbackEngine(userHistorySummary, interactions, recentReels);
  }
};

/**
 * Fallback Engine that groups interactions by category and returns high-quality curated suggestions
 */
function runFallbackEngine(userHistorySummary, interactions, recentReels) {
  console.log("Running fallback recommendation engine...");

  // Count interaction frequency by category
  const categoryCounts = {};
  interactions.forEach(item => {
    const reel = recentReels.find(r => r._id.toString() === item.reelId.toString());
    if (reel) {
      const cat = reel.category?.toLowerCase() || 'default';
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    }
  });

  // Find the top category
  let topCategory = 'default';
  let maxCount = 0;
  Object.keys(categoryCounts).forEach(cat => {
    if (categoryCounts[cat] > maxCount) {
      maxCount = categoryCounts[cat];
      topCategory = cat;
    }
  });

  // Resolve matching fallback template
  const fallback = FALLBACK_RECOMMENDATIONS[topCategory] || FALLBACK_RECOMMENDATIONS.default;

  // Let's reference the last interacted reel as currentReelId
  const lastInteraction = interactions[interactions.length - 1];
  const currentReelId = lastInteraction ? lastInteraction.reelId : null;

  return [
    {
      detectedInterest: fallback.detectedInterest,
      evidence: `${fallback.evidence} (Analyzed via fallback rules due to offline API status)`,
      recommendedTopic: fallback.recommendedTopic,
      category: fallback.category,
      reason: fallback.reason,
      difficulty: fallback.difficulty,
      confidence: "Medium", // Clearly labeled as Medium/Low per user request
      currentReelId: currentReelId,
      recommendedReelId: null
    }
  ];
}
