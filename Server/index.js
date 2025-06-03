const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const router = express.Router();
const app = express();

app.use(express.json());

// Update your CORS configuration
// Replace your current CORS setup with this:
const corsOptions = {
  origin: 'http://localhost:5173', // Your Vite frontend URL
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
// MongoDB Connection
const CONNECTION_STRING = process.env.MONGODB_URI || 'mongodb+srv://dilmindineth:AMQf5lmyk9cO46bH@clusterfinalproject.tdil7z2.mongodb.net/FinalPDB?retryWrites=true&w=majority';

// Mongoose connection
mongoose.connect(CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
})
.then(() => console.log('MongoDB Connection Successful'))
.catch(err => {
  console.error('MongoDB Connection Error:', err);
  process.exit(1);
});


app.set('trust proxy', 1); 

// Parse cookies
app.use(cookieParser());

const MongoStore = require('connect-mongo');

// Session configuration
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: CONNECTION_STRING,
    ttl: 24 * 60 * 60 // 1 day
  }),
  cookie: {
    secure: false, // Set to true in production with HTTPS
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Resource model
const Resource = mongoose.model('Resource', new mongoose.Schema({
  resource_id: String,
  type: String,
  title: String,
  condition: String,
  is_digital: Boolean,
  image_link: String
}), 'resources');

const Request = mongoose.model('Request', new mongoose.Schema({
  request_id: { type: String, required: true, unique: true },
  user_id: { type: String, required: true }, // Changed from recipient_id
  resource_type: { type: String, required: true },
  title: { type: String, required: true },
  condition_preference: { type: String, required: true },
  is_digital_acceptable: { type: Boolean, default: false },
  quantity_needed: { type: Number, required: true },
  urgency: { type: String, required: true },
  status: { type: String, required: true },
  date: { type: Date, default: Date.now }
}), 'requests');



const UserSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
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
});

const User = mongoose.model('User', UserSchema);

module.exports = mongoose.model('User', UserSchema);

// Donation Schema
const Donation = mongoose.model('Donation', new mongoose.Schema({
  donation_id: { type: String, unique: true, default: () => new mongoose.Types.ObjectId().toString() },
  donor_id: String,
  resource_type: String,
  title: String,
  condition: String,
  description: String, // Add this missing field
  is_digital: Boolean,
  image_link: String,
  quantity: Number,
  status: { type: String, default: 'pending' },
  created_at: { type: Date, default: Date.now },
  Admin_approved: { type: Boolean, default: false },
  Ngo_approved: { type: Boolean, default: false }
}));




const organizationSchema = new mongoose.Schema({
  organization_id: {
    type: String,
    default: uuidv4,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  type: {
    type: String,
    required: true,
    enum: [
      'Environmental NGO',
      'Educational NGO',
      'Healthcare NGO',
      'Child Welfare NGO',
      'Educational Institution',
      'Other'
    ],
    default: 'Other'
  },
  verification_status: {
    type: String,
    required: true,
    enum: ['pending', 'verified', 'rejected', 'suspended'],
    default: 'pending'
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  logo: {
    type: String,
    trim: true,
    default: 'https://example.com/default-org-logo.png',
    validate: {
      validator: function(v) {
        return /^(https?:\/\/).+\.(jpg|jpeg|png|gif|svg)$/.test(v);
      },
      message: props => `${props.value} is not a valid image URL!`
    }
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});
const Organization = mongoose.model('Organization', organizationSchema);

const donationDeliverySchema = new mongoose.Schema({
  requestId: { type: String, required: true },
  recipientId: { type: String, required: true },
  donorId: { type: String, required: true },
  organizationName: { type: String, required: true },
  requestedItems: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      condition: { type: String, required: true },
      notes: { type: String }
    }
  ],
  deliveryMethod: {
    type: String,
    enum: ['courier', 'self', 'recipient'],
    required: true
  },
  deliveryDetails: {
    pickupLocation: { type: String, required: function() { return this.deliveryMethod === 'courier'; } },
    contactName: { type: String, required: function() { return this.deliveryMethod === 'courier'; } },
    contactPhone: { type: String, required: function() { return this.deliveryMethod === 'courier'; } }
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update `updatedAt` on save
donationDeliverySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Indexes for faster queries
donationDeliverySchema.index({ requestId: 1 });
donationDeliverySchema.index({ recipientId: 1 });
donationDeliverySchema.index({ donorId: 1 });

// Update the updated_at field before saving
organizationSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

// Create text index for search functionality
organizationSchema.index({
  name: 'text',
  description: 'text',
  location: 'text'
});

// Static method for verification
organizationSchema.statics.verifyOrganization = function(orgId) {
  return this.findOneAndUpdate(
    { organization_id: orgId },
    { verification_status: 'verified' },
    { new: true }
  );
};

app.use((req, res, next) => {
  console.log('Session ID:', req.sessionID);
  console.log('Session data:', req.session);
  next();
});


const messageSchema = new mongoose.Schema({
  requestId: { type: String, required: true, index: true }, // Links to DonationDelivery
  senderId: { type: String, required: true }, // user_id of sender (donor or recipient)
  recipientId: { type: String, required: true }, // user_id of recipient
  content: { type: String, required: true, trim: true, maxlength: 1000 },
  createdAt: { type: Date, default: Date.now }
});

// Indexes for faster queries
messageSchema.index({ requestId: 1, createdAt: -1 });


// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    // 1. Validate credentials (pseudo-code)
    const user = await User.authenticate(username, password);
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // 2. Regenerate session to prevent fixation
    req.session.regenerate((err) => {
      if (err) throw err;
      
      // 3. Store user info in session
      req.session.userId = user.id;
      req.session.role = user.role;
      
      // 4. Set loggedIn flag
      req.session.loggedIn = true;
      
      res.json({ message: 'Login successful' });
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Protected route example
app.get('/profile', (req, res) => {
  if (!req.session.loggedIn) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  
  res.json({ userId: req.session.userId, role: req.session.role });
});

// Logout route
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    
    // Clear the session cookie
    res.clearCookie('connect.sid', {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true
    });
    
    res.json({ message: 'Logout successful' });
  });
});

app.get('/api/user/:id', async (req, res) => {
  try {
    const user = await User.findOne({ user_id: req.params.id });
    if (!user) return res.status(404).send('User not found');
    res.json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get('/api/users/donations/:donorId', async (req, res) => {
  try {
    const donations = await Donation.find({ donor_id: req.params.donorId })
      .sort({ created_at: -1 })
      .limit(5);
    res.json(donations);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// API endpoint to get featured donations
app.get('/api/featured-donations', async (req, res) => {
  try {
    const featuredDonations = await Resource.find().limit(3);
    res.json(featuredDonations);
  } catch (error) {
    console.error('Error fetching featured donations:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// New endpoint to get all requests
app.get('/api/requests', async (req, res) => {
  try {
    const requests = await Request.find();
    res.json(requests);
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// New endpoint to get urgent requests (high priority)
app.get('/api/requests/urgent', async (req, res) => {
  try {
    const urgentRequests = await Request.find({ urgency: 'high' });
    res.json(urgentRequests);
  } catch (error) {
    console.error('Error fetching urgent requests:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// New endpoint to get requests by type
app.get('/api/requests/type/:type', async (req, res) => {
  try {
    const requests = await Request.find({ resource_type: req.params.type });
    res.json(requests);
  } catch (error) {
    console.error('Error fetching requests by type:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all recipients (users with role 'recipient')
app.get('/api/recipients', async (req, res) => {
  try {
    const recipients = await User.find({ role: 'recipient' });
    res.json(recipients);
  } catch (error) {
    console.error('Error fetching recipients:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
app.get('/api/requests/:requestId', async (req, res) => {
  console.log(`Fetching request with ID: ${req.params.requestId}`);
  
  try {
    const request = await Request.findOne({ request_id: req.params.requestId }).lean();
    console.log('Query result:', request ? 'Found' : 'Not found');
    
    if (!request) {
      // Additional diagnostic information
      const collectionStats = await Request.db.collection('requests').stats();
      console.log('Collection stats:', collectionStats);
      
      return res.status(404).json({ 
        success: false,
        message: 'Request not found',
        diagnostic: {
          searchedId: req.params.requestId,
          collectionExists: true,
          documentCount: collectionStats.count,
          indexInfo: await Request.collection.indexInformation()
        }
      });
    }
    // Fetch recipient details
    const recipient = await User.findOne({ user_id: request.user_id }).lean();
    if (!recipient) {
      return res.status(404).json({
        success: false,
        message: 'Recipient not found for this request'
      });
    }

    res.json({
      success: true,
      data: {
        ...request,
        recipient: {
          user_id: recipient.user_id,
          full_name: recipient.full_name,
          email: recipient.email
        }
      }
    });
  } catch (error) {
    console.error('Error fetching request:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: error.message // Remove in production
    });
  }
});
// Improved version of your existing /api/requests/:requestId/recipient endpoint
app.get('/api/requests/:requestId/recipient', async (req, res) => {
  try {
    const request = await Request.findOne({ request_id: req.params.requestId });
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    const recipient = await User.findOne({ user_id: request.user_id });
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient not found' });
    }

    res.json({
      request_id: request.request_id,
      organization_name: recipient.full_name,
      address: 'Address not provided',
      distance: 'Unknown',
      description: request.title,
      image_url: '/default-org.jpg',
      requested_items: [],
      user_id: recipient.user_id,
      request_details: {
        title: request.title,
        resource_type: request.resource_type,
        quantity_needed: request.quantity_needed,
        urgency: request.urgency,
        condition_preference: request.condition_preference
      }
    });
  } catch (error) {
    console.error('Error fetching request recipient:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
// Get request and recipient details
app.get('/api/requests/:requestId/full-details', async (req, res) => {
  try {
    const request = await Request.findOne({ request_id: req.params.requestId }).lean();
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    const recipient = await User.findOne({ user_id: request.user_id }).lean();
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient user not found' });
    }

    const responseData = {
      request_details: {
        request_id: request.request_id,
        title: request.title,
        resource_type: request.resource_type,
        quantity_needed: request.quantity_needed,
        condition_preference: request.condition_preference,
        urgency: request.urgency,
        status: request.status,
        created_at: request.created_at
      },
      recipient_details: {
        user_id: recipient.user_id,
        full_name: recipient.full_name,
        email: recipient.email,
        organization_id: recipient.organization_id
      }
    };

    res.json(responseData);
  } catch (error) {
    console.error('Error fetching request details:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Auth check endpoint
app.get('/api/auth/check', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  res.json({ userId: req.session.userId });
});



app.get('/api/users/:userId', async (req, res) => {
  try {
    const user = await User.findOne({ user_id: req.params.userId })
      .select('-password_hash -__v');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

// Logout endpoint
app.post('/api/auth/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ error: 'Logout failed' });
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out' });
  });
});


// Login route
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Set session data directly (no need for regenerate)
    req.session.userId = user.user_id;
    req.session.role = user.role;
    req.session.loggedIn = true;

    // Save session explicitly
    req.session.save(err => {
      if (err) {
        console.error('Session save error:', err);
        return res.status(500).json({ error: 'Failed to save session' });
      }

      // Return success response with user data
      res.json({
        success: true,
        user: {
          user_id: user.user_id,
          email: user.email,
          full_name: user.full_name,
          role: user.role,
        },
      });
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({
      error: 'Login failed',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

app.get('/api/auth/current-user', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  
  res.json({ 
    userId: req.session.userId,
    role: req.session.role 
  });
});

app.post('/api/donations', express.json(), async (req, res) => {
  try {
    // TEMPORARY: Hardcode userId for testing
    const userId = 'b1ffc399-8d1c-5fga-cc7d-7cc8ce490b22';
    
    // Extract and validate required fields
    const { resource_type, title, quantity, condition, description, image_link } = req.body;
    
    if (!resource_type || !title || !quantity || !condition) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create new donation record
    const newDonation = {
      donation_id: new mongoose.Types.ObjectId().toString(),
      donor_id: userId, // Using hardcoded user ID
      resource_type,
      title,
      condition,
      is_digital: resource_type === 'Digital Media',
      image_link: image_link || '',
      quantity: parseInt(quantity),
      status: 'pending',
      created_at: new Date(),
      Admin_approved: false,
      Ngo_approved: false
    };

    // Save to database
    const savedDonation = await Donation.create(newDonation);

    res.status(201).json({
      success: true,
      donation: savedDonation
    });
  } catch (error) {
    console.error('Error creating donation:', error);
    res.status(500).json({ 
      error: 'Failed to create donation',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});
app.get('/api/donations/:donationId', async (req, res) => {
  console.log(`Fetching donation with ID: ${req.params.donationId}`);
  
  try {
    // Verify database connection first
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Database not connected');
    }

    // Check both _id and donation_id fields
    const query = {
      $or: [
        { donation_id: req.params.donationId },
        { _id: req.params.donationId }
      ]
    };

    console.log('Executing query:', JSON.stringify(query, null, 2));

    const donation = await Donation.findOne(query).lean();
    console.log('Query result:', donation ? 'Found' : 'Not found');

    if (!donation) {
      // Additional diagnostic information
      const collectionStats = await Donation.db.collection('donations').stats();
      console.log('Collection stats:', collectionStats);
      
      return res.status(404).json({ 
        success: false,
        message: 'Donation not found',
        diagnostic: {
          searchedId: req.params.donationId,
          collectionExists: true,
          documentCount: collectionStats.count,
          indexInfo: await Donation.collection.indexInformation()
        }
      });
    }

    res.json({
      success: true,
      donation
    });
  } catch (error) {
    console.error('Full error:', {
      message: error.message,
      stack: error.stack,
      mongooseState: mongoose.connection.readyState
    });
    
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});
// In your server.js temporarily add:
app.get('/debug/donations', async (req, res) => {
  const donations = await Donation.find().limit(10);
  res.json(donations);
});

app.get('/debug/session', (req, res) => {
  res.json({
    sessionId: req.sessionID,
    sessionData: req.session
  });
});

app.post('/api/auth/register', async (req, res) => {
  try {
    console.log('Registration attempt:', req.body);
    
    const { email, password, full_name, organization_id } = req.body;

    // Validation
    if (!email || !password || !full_name) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['email', 'password', 'full_name'],
        received: Object.keys(req.body)
      });
    }

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ 
        error: 'Email already exists',
        suggestion: 'Try logging in or use a different email'
      });
    }

    // Create new user
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      email,
      password_hash: await bcrypt.hash(password, 12),
      full_name,
      organization_id: organization_id || null
    });

    await user.save();

    // Successful response (excluding sensitive data)
    res.status(201).json({
      success: true,
      user: {
        user_id: user.user_id,
        email: user.email,
        full_name: user.full_name,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Registration Error:', {
      message: error.message,
      stack: error.stack,
      body: req.body
    });
    
    res.status(500).json({
      error: 'Registration failed',
      details: process.env.NODE_ENV === 'development' 
        ? error.message 
        : undefined
    });
  }
});


// Get current user's profile (using session)
app.get('/api/users/me', async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const user = await User.findOne({ user_id: req.session.userId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return safe user data (no password hash)
    res.json({
      user_id: user.user_id,
      email: user.email,
      full_name: user.full_name,
      role: user.role,
      organization_id: user.organization_id,
      profile_pic: user.profile_pic,
      bio: user.bio,
      created_at: user.created_at
    });

  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update user profile
app.put('/api/users/me', async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const { full_name, bio, profile_pic } = req.body;
    
    const updatedUser = await User.findOneAndUpdate(
      { user_id: req.session.userId },
      { $set: { full_name, bio, profile_pic } },
      { new: true }
    );

    res.json({
      success: true,
      user: {
        full_name: updatedUser.full_name,
        bio: updatedUser.bio,
        profile_pic: updatedUser.profile_pic
      }
    });

  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});


// Get user statistics
app.get('/api/users/me/stats', async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const stats = {
      total_donations: await Donation.countDocuments({ donor_id: req.session.userId }),
      pending_donations: await Donation.countDocuments({ 
        donor_id: req.session.userId,
        status: 'pending'
      }),
      completed_donations: await Donation.countDocuments({
        donor_id: req.session.userId,
        status: 'completed'
      })
    };

    res.json(stats);

  } catch (error) {
    res.status(500).json({ error: 'Failed to load stats' });
  }
});


app.get('/api/users/:userId/stats', async (req, res) => {
  try {
    const [totalDonations, completedDonations, pendingDonations] = await Promise.all([
      Donation.countDocuments({ donor_id: req.params.userId }),
      Donation.countDocuments({ donor_id: req.params.userId, status: 'completed' }),
      Donation.countDocuments({ donor_id: req.params.userId, status: 'pending' })
    ]);

    res.json({
      total_donations: totalDonations,
      completed_donations: completedDonations,
      pending_donations: pendingDonations,
      beneficiaries_reached: 0, // Implement your logic
      categories_covered: 0     // Implement your logic
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// 3. DONATIONS ENDPOINTS

// Get user donations
app.get('/api/users/:userId/donations', async (req, res) => {
  try {
    const donations = await Donation.find({ donor_id: req.params.userId })
      .sort({ created_at: -1 })
      .limit(5);
    
    res.json(donations);
  } catch (error) {
    console.error('Error fetching donations:', error);
    res.status(500).json({ error: 'Failed to fetch donations' });
  }
});
app.get('/api/users/:userId/organizations', async (req, res) => {
  try {
    // Check database connection
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Database not connected');
    }

    // Validate user ID
    if (!req.params.userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Find user and organizations
    const user = await User.findOne({ user_id: req.params.userId })
      .select('_id organization_id')
      .lean();

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    let organizations = [];
    
    // Only query if user has an organization_id
    if (user.organization_id) {
      organizations = await Organization.find({ 
        $or: [
          { members: user._id },
          { organization_id: user.organization_id }
        ]
      })
      .select('-members -__v')
      .lean();
    }

    res.json(organizations);

  } catch (error) {
    console.error('Error fetching organizations:', error);
    res.status(500).json({ 
      error: 'Failed to fetch organizations',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get user donations with pagination
app.get('/api/users/me/donations', async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const donations = await Donation.find({ donor_id: req.session.userId })
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Donation.countDocuments({ donor_id: req.session.userId });

    res.json({
      donations,
      total,
      page,
      pages: Math.ceil(total / limit)
    });

  } catch (error) {
    res.status(500).json({ error: 'Failed to load donations' });
  }
});

// Get user's connected organizations
app.get('/api/users/me/organizations', async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const user = await User.findOne({ user_id: req.session.userId });
    if (!user.organization_id) {
      return res.json([]);
    }

    // This assumes you have an Organization model
    const organizations = await Organization.find({ 
      _id: user.organization_id 
    });

    res.json(organizations);

  } catch (error) {
    res.status(500).json({ error: 'Failed to load organizations' });
  }
});

// Update password
app.put('/api/users/me/password', async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const { currentPassword, newPassword } = req.body;
    
    const user = await User.findOne({ user_id: req.session.userId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    // Update password
    user.password_hash = await bcrypt.hash(newPassword, 12);
    await user.save();

    res.json({ success: true });

  } catch (error) {
    res.status(500).json({ error: 'Failed to update password' });
  }
});

// Verify session (already exists but improved)
app.get('/api/auth/verify', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ 
      authenticated: false,
      error: 'Not authenticated' 
    });
  }
  
  res.json({ 
    authenticated: true,
    userId: req.session.userId,
    role: req.session.role
  });
});


// Create a new donation delivery
app.post('/api/donation-deliveries', async (req, res) => {
  try {
    const deliveryData = {
      delivery_id: uuidv4(),
      ...req.body,
      status: 'pending',
      created_at: new Date(),
      updated_at: new Date()
    };

    const newDelivery = new DonationDelivery(deliveryData);
    await newDelivery.save();

    // Update the request status to "in progress"
    await Request.findOneAndUpdate(
      { request_id: deliveryData.request_id },
      { status: 'in_progress', updated_at: new Date() }
    );

    res.status(201).json({ 
      success: true, 
      message: 'Delivery created successfully',
      data: newDelivery
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Get all donation deliveries for a donor
app.get('/api/donation-deliveries/donor/:donorId', async (req, res) => {
  try {
    const deliveries = await DonationDelivery.find({ donor_id: req.params.donorId })
      .sort({ created_at: -1 });
    res.json({ success: true, data: deliveries });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get all donation deliveries for a recipient
app.get('/api/donation-deliveries/recipient/:recipientId', async (req, res) => {
  try {
    const deliveries = await DonationDelivery.find({ recipient_id: req.params.recipientId })
      .sort({ created_at: -1 });
    res.json({ success: true, data: deliveries });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Update delivery status
app.put('/api/donation-deliveries/:deliveryId/status', async (req, res) => {
  try {
    const { status } = req.body;
    const updatedDelivery = await DonationDelivery.findOneAndUpdate(
      { delivery_id: req.params.deliveryId },
      { status, updated_at: new Date() },
      { new: true }
    );

    if (!updatedDelivery) {
      return res.status(404).json({ success: false, message: 'Delivery not found' });
    }

    // If status is completed, update the request status to "fulfilled"
    if (status === 'completed') {
      await Request.findOneAndUpdate(
        { request_id: updatedDelivery.request_id },
        { status: 'fulfilled', updated_at: new Date() }
      );
    }

    res.json({ 
      success: true, 
      message: 'Delivery status updated',
      data: updatedDelivery
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});





const PORT = process.env.PORT || 5038;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});