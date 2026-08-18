import mongoose from 'mongoose';

const reelSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },
  transcript: {
    type: String,
    default: '',
  },
  hashtags: {
    type: [String],
    default: [],
  },
  cloudinaryUrl: {
    type: String,
    required: true,
  },
  thumbnailUrl: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner',
  },
  sourceType: {
    type: String,
    default: 'Upload', // 'Upload' or 'Fictional' / 'Seed'
  },
  isEducational: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Reel = mongoose.model('Reel', reelSchema);
export default Reel;
