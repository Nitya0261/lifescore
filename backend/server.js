require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const Anthropic = require('@anthropic-ai/sdk');
const webpush = require('web-push');
const cron = require('node-cron');
const User = require('./models/User');

const app = express();

// Trust proxy if you are behind a reverse proxy (like Vercel/Render) to get accurate IPs
app.set('trust proxy', 1);

app.use(express.json());
app.use(cors());

// --- RATE LIMITERS ---
const chatLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 10, // Limit each IP to 10 requests per `window` (here, per day)
  message: { msg: 'Daily chat limit reached. Please try again tomorrow!' },
  standardHeaders: true,
  legacyHeaders: false,
});

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || 'dummy_key', // defaults to process.env.ANTHROPIC_API_KEY
});

// Configure Web Push (Keys loaded from .env)
const publicVapidKey = process.env.VAPID_PUBLIC_KEY;
const privateVapidKey = process.env.VAPID_PRIVATE_KEY;

if (publicVapidKey && privateVapidKey) {
  webpush.setVapidDetails('mailto:test@lifescore.app', publicVapidKey, privateVapidKey);
}

// Basic Route
app.get('/', (req, res) => res.send('LifeScore API is running...'));

// Auth: Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    await user.save();

    // Generate Token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, user: { id: user._id, firstName, lastName, email, role: user.role, xp: user.xp, lifeScore: user.lifeScore } });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Auth: Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    // Match password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    // Generate Token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, user: { id: user._id, firstName: user.firstName, lastName: user.lastName, email, role: user.role, xp: user.xp, lifeScore: user.lifeScore } });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update XP
app.post('/api/user/xp', async (req, res) => {
  try {
    const { userId, amount } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    user.xp += amount;
    await user.save();
    
    res.json({ xp: user.xp });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// --- NOTIFICATIONS API ---

const Notification = require('./models/Notification');

// --- PUSH NOTIFICATIONS API ---

const PushSubscription = require('./models/PushSubscription');

app.post('/api/push/subscribe', async (req, res) => {
  try {
    const subscription = req.body;

    // Save to DB
    const sub = await PushSubscription.findOneAndUpdate(
      { endpoint: subscription.endpoint },
      { ...subscription },
      { upsert: true, new: true }
    );

    res.status(201).json({});

    // Send welcome push
    const payload = JSON.stringify({ 
      title: 'Welcome to LifeScore!', 
      body: 'You will now receive daily micro-actions and XP reminders to build your wealth.',
      icon: '/vite.svg'
    });

    webpush.sendNotification(subscription, payload).catch(err => console.error(err));
  } catch (err) {
    console.error('Push Subscribe Error:', err.message);
    res.status(500).send('Server error');
  }
});

// CRON JOB: Send daily micro-actions at 9 AM
cron.schedule('0 9 * * *', async () => {
  console.log('Running daily 9 AM push notification job...');
  try {
    const subs = await PushSubscription.find();
    if (subs.length === 0) return;

    const payload = JSON.stringify({
      title: 'Daily LifeScore Micro-Action',
      body: 'Did you review your spending yesterday? Open the app to log your daily XP and check your progress!',
      url: '/',
      icon: '/vite.svg'
    });

    subs.forEach(sub => {
      webpush.sendNotification(
        { endpoint: sub.endpoint, keys: sub.keys },
        payload
      ).catch(err => {
        if (err.statusCode === 410 || err.statusCode === 404) {
          console.log('Subscription has expired or is no longer valid: ', err.endpoint);
          PushSubscription.deleteOne({ endpoint: err.endpoint }).exec();
        }
      });
    });
  } catch (err) {
    console.error('Cron Job Error:', err);
  }
}, {
  scheduled: true,
  timezone: "America/New_York" // Or any default timezone
});

// --- BUDGET TRACKER API ---

const BudgetEntry = require('./models/BudgetEntry');

// Get all entries for a user
app.get('/api/budget/:userId', async (req, res) => {
  try {
    const entries = await BudgetEntry.find({ userId: req.params.userId }).sort({ month: -1, createdAt: -1 });
    res.json(entries);
  } catch (err) {
    console.error('Budget Fetch Error:', err.message);
    res.status(500).send('Server error');
  }
});

// Add a new entry
app.post('/api/budget', async (req, res) => {
  try {
    const { userId, month, type, category, amount } = req.body;
    const entry = new BudgetEntry({ userId, month, type, category, amount });
    await entry.save();
    
    // Give XP for logging budget
    const user = await User.findById(userId);
    if (user) {
      user.xp += 15;
      await user.save();
    }

    res.json(entry);
  } catch (err) {
    console.error('Budget Add Error:', err.message);
    res.status(500).send('Server error');
  }
});

// Delete an entry
app.delete('/api/budget/:id', async (req, res) => {
  try {
    await BudgetEntry.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error('Budget Delete Error:', err.message);
    res.status(500).send('Server error');
  }
});

// --- COMMENT ENGINE API ---
const Comment = require('./models/Comment');

// Get comments for a specific post
app.get('/api/comments/:slug', async (req, res) => {
  try {
    const comments = await Comment.find({ slug: req.params.slug, isApproved: true })
      .sort({ createdAt: -1 }) // Newest first
      .limit(50);
    res.json(comments);
  } catch (err) {
    console.error('Fetch Comments Error:', err.message);
    res.status(500).send('Server error');
  }
});

// Post a new comment
app.post('/api/comments', async (req, res) => {
  try {
    const { slug, userId, authorName, content } = req.body;
    const comment = new Comment({ slug, userId, authorName, content });
    await comment.save();

    // Reward XP for generating content!
    const user = await User.findById(userId);
    if (user) {
      user.xp += 20;
      await user.save();
    }

    res.json(comment);
  } catch (err) {
    console.error('Post Comment Error:', err.message);
    res.status(500).send('Server error');
  }
});

// --- BOOKMARK / SAVE API ---
const Bookmark = require('./models/Bookmark');

// Get all bookmarks for a user
app.get('/api/bookmarks/:userId', async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(bookmarks);
  } catch (err) {
    console.error('Fetch Bookmarks Error:', err.message);
    res.status(500).send('Server error');
  }
});

// Toggle bookmark (add if missing, remove if exists)
app.post('/api/bookmarks/toggle', async (req, res) => {
  try {
    const { userId, itemType, title, slug } = req.body;
    
    // Check if it already exists
    const existing = await Bookmark.findOne({ userId, slug });
    
    if (existing) {
      // Un-bookmark
      await Bookmark.findByIdAndDelete(existing._id);
      return res.json({ status: 'removed', slug });
    } else {
      // Bookmark
      const bookmark = new Bookmark({ userId, itemType, title, slug });
      await bookmark.save();
      
      // Reward XP for engaging with the app
      const user = await User.findById(userId);
      if (user) {
        user.xp += 5;
        await user.save();
      }
      
      return res.json({ status: 'added', bookmark });
    }
  } catch (err) {
    console.error('Toggle Bookmark Error:', err.message);
    res.status(500).send('Server error');
  }
});

// --- FINANCE NEWS RSS ENGINE ---
const Parser = require('rss-parser');
const parser = new Parser();

// Global cache for news so we don't spam the RSS endpoints
let cachedNews = [];

const fetchNews = async () => {
  try {
    // Top Finance RSS Feeds
    const feeds = [
      'https://feeds.a.dj.com/rss/RSSMarketsMain.xml', // Wall Street Journal Markets
      'https://search.cnbc.com/rs/search/combinedcms/view.xml?profile=12000000&id=10000664', // CNBC Finance
      'https://feeds.content.dowjones.io/public/rss/mw_topstories' // MarketWatch
    ];

    let allArticles = [];
    for (const feed of feeds) {
      const parsed = await parser.parseURL(feed);
      allArticles.push(...parsed.items.slice(0, 5).map(item => ({
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        source: parsed.title || 'Finance News'
      })));
    }

    // Sort by newest first
    allArticles.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
    cachedNews = allArticles.slice(0, 15); // Keep top 15 fresh headlines
    console.log(`[RSS] Fetched ${cachedNews.length} fresh news articles.`);
  } catch (err) {
    console.error('RSS Fetch Error:', err.message);
  }
};

// Initial fetch
fetchNews();

// Refresh news every 30 minutes
cron.schedule('*/30 * * * *', fetchNews);

const NewsItem = require('./models/NewsItem');
const Announcement = require('./models/Announcement');

// Public/Client: Get combined DB + RSS news
app.get('/api/news', async (req, res) => {
  try {
    const dbNews = await NewsItem.find({ status: 'Published' }).sort({ pubDate: -1 });
    // Format DB news to match RSS interface
    const formattedDbNews = dbNews.map(item => ({
      _id: item._id,
      icon: item.icon,
      title: item.title,
      summary: item.summary,
      category: item.category,
      link: item.link,
      pubDate: item.pubDate,
      source: item.source || 'LifeScore Official'
    }));
    
    // Combine and sort newest first
    const combined = [...formattedDbNews, ...cachedNews].sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
    res.json(combined.slice(0, 30));
  } catch (err) {
    console.error('Fetch News Error:', err.message);
    res.json(cachedNews); // fallback to just RSS
  }
});

// Admin: Get all DB news items (including Drafts)
app.get('/api/news/admin', async (req, res) => {
  try {
    const items = await NewsItem.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error('Admin News Fetch Error:', err.message);
    res.status(500).send('Server error');
  }
});

// Admin: Create new news item
app.post('/api/news/admin', async (req, res) => {
  try {
    const { icon, title, summary, category, status, link } = req.body;
    const newItem = new NewsItem({ icon, title, summary, category, status, link, pubDate: new Date() });
    await newItem.save();
    res.json(newItem);
  } catch (err) {
    console.error('Create News Error:', err.message);
    res.status(500).send('Server error');
  }
});

// Admin: Update news item
app.put('/api/news/:id', async (req, res) => {
  try {
    const updated = await NewsItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    console.error('Update News Error:', err.message);
    res.status(500).send('Server error');
  }
});

// Admin: Delete news item
app.delete('/api/news/:id', async (req, res) => {
  try {
    await NewsItem.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error('Delete News Error:', err.message);
    res.status(500).send('Server error');
  }
});

// --- USER MANAGEMENT API (Admin & Profile) ---

// Get current user by header token
app.get('/api/user/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ msg: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found' });
    
    res.json({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      xp: user.xp,
      lifeScore: user.lifeScore,
      isSuspended: user.isSuspended
    });
  } catch (err) {
    console.error('User Me Error:', err.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
});

// Admin: Get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.error('Fetch Users Error:', err.message);
    res.status(500).send('Server error');
  }
});

// Admin: Update user role/xp/suspension
app.put('/api/users/:id', async (req, res) => {
  try {
    const { role, xp, isSuspended } = req.body;
    const updateFields = {};
    if (role !== undefined) updateFields.role = role;
    if (xp !== undefined) updateFields.xp = xp;
    if (isSuspended !== undefined) updateFields.isSuspended = isSuspended;

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updateFields, { new: true }).select('-password');
    res.json(updatedUser);
  } catch (err) {
    console.error('Update User Error:', err.message);
    res.status(500).send('Server error');
  }
});

// --- ANNOUNCEMENTS API ---

// Public: Get active announcements
app.get('/api/announcements', async (req, res) => {
  try {
    const active = await Announcement.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(active);
  } catch (err) {
    console.error('Fetch Announcements Error:', err.message);
    res.status(500).send('Server error');
  }
});

// Admin: Create announcement
app.post('/api/announcements', async (req, res) => {
  try {
    const { message, type, link, linkText } = req.body;
    const item = new Announcement({ message, type, link, linkText });
    await item.save();
    res.json(item);
  } catch (err) {
    console.error('Create Announcement Error:', err.message);
    res.status(500).send('Server error');
  }
});

// Admin: Delete/disable announcement
app.delete('/api/announcements/:id', async (req, res) => {
  try {
    await Announcement.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ success: true });
  } catch (err) {
    console.error('Delete Announcement Error:', err.message);
    res.status(500).send('Server error');
  }
});

// --- MARKET DATA TICKER ---
const YahooFinance = require('yahoo-finance2').default;
const yf = new YahooFinance();

let cachedMarketData = [];

const fetchMarketData = async () => {
  try {
    const symbols = ['^GSPC', '^IXIC', 'BTC-USD', 'ETH-USD', 'GC=F'];
    const nameMap = {
      '^GSPC': 'S&P 500',
      '^IXIC': 'NASDAQ',
      'BTC-USD': 'Bitcoin',
      'ETH-USD': 'Ethereum',
      'GC=F': 'Gold'
    };

    const results = await Promise.allSettled(
      symbols.map(sym => yf.quote(sym))
    );

    cachedMarketData = results
      .filter(r => r.status === 'fulfilled' && r.value)
      .map(r => {
        const q = r.value;
        return {
          symbol: q.symbol,
          name: nameMap[q.symbol] || q.shortName || q.symbol,
          price: q.regularMarketPrice,
          change: q.regularMarketChange,
          changePercent: q.regularMarketChangePercent
        };
      });

    console.log(`[MarketData] Fetched ${cachedMarketData.length} live prices.`);
  } catch (err) {
    console.error('Market Data Fetch Error:', err.message);
  }
};

// Initial fetch
fetchMarketData();

// Refresh every 5 minutes
cron.schedule('*/5 * * * *', fetchMarketData);

app.get('/api/market-data', (req, res) => {
  res.json(cachedMarketData);
});

// Admin: Create new push notification with active web-push broadcast loop
app.post('/api/notifications', async (req, res) => {
  try {
    const { title, message, audience } = req.body;
    const newNotif = new Notification({ title, message, audience });
    await newNotif.save();

    // Broadcast loop to Web-Push subscribers
    const subs = await PushSubscription.find();
    if (subs.length > 0) {
      const payload = JSON.stringify({
        title: title || 'LifeScore Alert',
        body: message,
        icon: '/vite.svg',
        url: '/'
      });

      subs.forEach(sub => {
        webpush.sendNotification(
          { endpoint: sub.endpoint, keys: sub.keys },
          payload
        ).catch(err => {
          if (err.statusCode === 410 || err.statusCode === 404) {
            PushSubscription.deleteOne({ endpoint: sub.endpoint }).exec();
          }
        });
      });
      console.log(`[Push] Broadcasted alert to ${subs.length} subscribers.`);
    }

    res.json({ success: true, notification: newNotif, subscribersReached: subs.length });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Client: Get latest notifications
app.get('/api/notifications', async (req, res) => {
  try {
    // Return the 5 most recent notifications
    const notifications = await Notification.find().sort({ createdAt: -1 }).limit(5);
    res.json(notifications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// --- ANALYTICS API ---

app.get('/api/analytics', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    
    // Aggregate total XP across all users
    const xpAggregation = await User.aggregate([
      { $group: { _id: null, totalXp: { $sum: "$xp" } } }
    ]);
    const totalPlatformXp = xpAggregation.length > 0 ? xpAggregation[0].totalXp : 0;

    // Users by role
    const roleStats = await User.aggregate([
      { $group: { _id: "$role", count: { $sum: 1 } } }
    ]);

    res.json({
      totalUsers,
      totalPlatformXp,
      roleStats: roleStats.reduce((acc, curr) => ({ ...acc, [curr._id]: curr.count }), {})
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// --- NEWSLETTER API ---

const Subscriber = require('./models/Subscriber');

app.post('/api/subscribe', async (req, res) => {
  try {
    const { email, source } = req.body;
    
    // Check if already subscribed in DB
    let subscriber = await Subscriber.findOne({ email });
    if (subscriber) {
      return res.status(400).json({ msg: 'Email is already subscribed' });
    }

    // Save to local MongoDB as backup
    subscriber = new Subscriber({ email, source: source || 'website' });
    await subscriber.save();

    // Sync with Brevo (Sendinblue) API if API key exists
    if (process.env.BREVO_API_KEY) {
      try {
        await fetch('https://api.brevo.com/v3/contacts', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'api-key': process.env.BREVO_API_KEY,
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            listIds: [2], // Default list ID (adjust based on Brevo setup)
            updateEnabled: true
          })
        });
      } catch (brevoErr) {
        console.error('Brevo Sync Error:', brevoErr);
        // We don't fail the request if Brevo fails, as long as it's in our DB
      }
    }

    res.json({ success: true, msg: 'Successfully subscribed to the newsletter!' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// --- AI CHATBOT API ---

app.post('/api/chat', chatLimiter, async (req, res) => {
  try {
    const { messages } = req.body;
    
    if (!process.env.ANTHROPIC_API_KEY) {
      // Fallback if no API key is set yet
      return res.json({ 
        reply: "I am currently running in offline mode. Please add your Anthropic API Key to the backend .env file to enable my AI capabilities!" 
      });
    }

    // Format messages for Claude
    // Claude expects an array of {role: 'user'|'assistant', content: string}
    const formattedMessages = messages.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text
    }));

    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307", // Fast and cheap model
      max_tokens: 300,
      system: "You are a personal finance advisor. Give concise, actionable advice. Always recommend consulting a professional for major decisions.",
      messages: formattedMessages,
    });

    res.json({ reply: response.content[0].text });
  } catch (err) {
    console.error('Claude API Error:', err);
    res.status(500).json({ msg: 'Failed to generate AI response.' });
  }
});

// Connect to MongoDB & Start Server
const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/lifescore';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
