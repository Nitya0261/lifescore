const mongoose = require('mongoose');

const NewsItemSchema = new mongoose.Schema({
  icon: { type: String, default: '📰' },
  title: { type: String, required: true },
  summary: { type: String },
  category: { type: String, default: 'Markets' },
  status: { type: String, default: 'Published' },
  source: { type: String, default: 'Admin' },
  link: { type: String, default: '#' },
  pubDate: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('NewsItem', NewsItemSchema);
