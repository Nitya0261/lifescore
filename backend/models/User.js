const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['standard', 'premium', 'admin'], default: 'standard' },
  xp: { type: Number, default: 0 },
  lifeScore: { type: Number, default: 0 },
  bookmarks: [{ type: String }],
  settings: {
    currency: { type: String, default: 'USD' },
    theme: { type: String, default: 'dark' },
    emailAlerts: { type: Boolean, default: true }
  },
  isSuspended: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
