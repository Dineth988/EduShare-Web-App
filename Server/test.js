require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5040;

// Middleware Setup
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing middleware - MUST come before routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const CONNECTION_STRING = process.env.MONGODB_URI || 'mongodb+srv://dilmindineth:AMQf5lmyk9cO46bH@clusterfinalproject.tdil7z2.mongodb.net/FinalPDB?retryWrites=true&w=majority';

mongoose.connect(CONNECTION_STRING)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// User Model
const UserSchema = new mongoose.Schema({
  user_id: { 
    type: String, 
    required: true, 
    unique: true,
    default: () => uuidv4() 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    match: /^\S+@\S+\.\S+$/ 
  },
  password_hash: { type: String, required: true },
  full_name: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['donor', 'admin', 'ngo', 'recipient'], 
    default: 'donor' 
  },
  organization_id: { type: String },
  created_at: { type: Date, default: Date.now }
}, { collection: 'users' });

const User = mongoose.model('User', UserSchema);

// Session Configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key-here',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: CONNECTION_STRING,
    ttl: 24 * 60 * 60 // 1 day
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Test Route to verify body parsing
app.post('/api/test-body', (req, res) => {
  console.log('Request body:', req.body);
  res.json({ 
    success: true,
    received: req.body,
    message: 'Body parsing is working correctly'
  });
});

// Auth Routes
app.post('/api/auth/login', async (req, res) => {
  try {
    console.log('Login request received:', req.body);
    
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      console.log('Missing email or password');
      return res.status(400).json({ 
        success: false,
        message: 'Email and password are required' 
      });
    }

    const user = await User.findOne({ email });
    
    if (!user) {
      console.log('User not found for email:', email);
      return res.status(401).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }

    console.log('Found user:', user.user_id);
    
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      console.log('Password mismatch for user:', user.user_id);
      return res.status(401).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }

    req.session.userId = user.user_id;
    req.session.role = user.role;
    req.session.email = user.email;

    req.session.save(err => {
      if (err) {
        console.error('Session save error:', err);
        return res.status(500).json({ 
          success: false,
          message: 'Login failed - session error',
          error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
      }

      res.json({
        success: true,
        user: {
          userId: user.user_id,
          email: user.email,
          fullName: user.full_name,
          role: user.role
        }
      });
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Login failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

app.get('/api/auth/current-user', async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ 
        success: false,
        message: 'Not authenticated' 
      });
    }

    const user = await User.findOne({ user_id: req.session.userId })
      .select('-password_hash -__v');

    if (!user) {
      req.session.destroy();
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    res.json({
      success: true,
      user: {
        userId: user.user_id,
        email: user.email,
        fullName: user.full_name,
        role: user.role,
        organizationId: user.organization_id,
        createdAt: user.created_at
      }
    });

  } catch (error) {
    console.error('Current user error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch current user',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Health Check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    dbState: mongoose.STATES[mongoose.connection.readyState],
    session: req.sessionID ? 'active' : 'none'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`CORS configured for: ${process.env.CORS_ORIGIN || 'http://localhost:5173'}`);
});