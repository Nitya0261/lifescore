const mongoose = require('mongoose');

const BookmarkSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  itemType: {
    type: String,
    enum: ['article', 'tool'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String, // route to the article or tool
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Prevent duplicate bookmarks for the same user and slug
BookmarkSchema.index({ userId: 1, slug: 1 }, { unique: true });

module.exports = mongoose.model('Bookmark', BookmarkSchema);
