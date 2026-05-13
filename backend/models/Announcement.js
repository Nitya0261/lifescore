const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({
  message: { type: String, required: true },
  type: { type: String, default: 'info' }, // info, warning, success, premium
  link: { type: String },
  linkText: { type: String },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Announcement', AnnouncementSchema);
