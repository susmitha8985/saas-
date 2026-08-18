import mongoose from 'mongoose';

const interactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  reelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reel',
    required: true,
  },
  interactionType: {
    type: String,
    enum: ['watch', 'like', 'save', 'skip'],
    required: true,
  },
  watchedPercent: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Avoid duplicate interaction logs if we just want to update them, or keep them all to track time-based progression.
// It is better to compound them or update watch percentage if we re-watch. Let's make it support multiple logs or updates.
const Interaction = mongoose.model('Interaction', interactionSchema);
export default Interaction;
