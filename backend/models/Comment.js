const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  slug: {
    type: String, // The blog post or page slug this comment belongs to
    required: true,
    index: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  authorName: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true,
    maxlength: 1000
  },
  likes: {
    type: Number,
    default: 0
  },
  isApproved: {
    type: Boolean,
    default: true // Set to false if you want manual moderation later
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Comment', CommentSchema);
