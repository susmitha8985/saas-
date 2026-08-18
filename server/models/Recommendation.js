import mongoose from 'mongoose';

const recommendationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  currentReelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reel',
    required: false, // Optional: might be based on general history rather than a single reel
  },
  detectedInterest: {
    type: String,
    required: true,
  },
  evidence: {
    type: String,
    required: true, // Details on what interactions led to this inference
  },
  recommendedReelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reel',
    required: false, // Optional: if we map to an existing reel in our library
  },
  recommendedTopic: {
    type: String,
    required: true, // Title of the recommended tech topic
  },
  category: {
    type: String,
    required: true,
    enum: ['AI', 'DSA', 'Java', 'HLD', 'Cybersecurity', 'Cloud', 'Hardware', 'Career', 'Other'],
  },
  reason: {
    type: String,
    required: true, // Explanation/why this recommendation connects to interest
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true,
  },
  confidence: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Recommendation = mongoose.model('Recommendation', recommendationSchema);
export default Recommendation;
