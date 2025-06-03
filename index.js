// server/index.js
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// MongoDB Connection
const CONNECTION_STRING = process.env.MONGODB_URI || 'mongodb+srv://dilmindineth:AMQf5lmyk9cO46bH@clusterfinalproject.tdil7z2.mongodb.net/FinalPDB?retryWrites=true&w=majority';
const DATABASE_NAME = 'FinalPDB';
let database;

// Routes
app.get('/api/users', async (req, res) => {
  try {
    const collection = database.collection('Users');
    const users = await collection.find({}).toArray();
    res.send(users);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

app.post('/api/messages', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }
    const collection = database.collection('messages');
    const result = await collection.insertOne({ text, createdAt: new Date() });
    res.status(201).json({ _id: result.insertedId, text, createdAt: new Date() });
  } catch (error) {
    console.error('Error adding message:', error);
    res.status(500).json({ error: 'Failed to add message' });
  }
});

// Multer setup (for file uploads, if needed)
const upload = multer({ dest: 'uploads/' });
app.post('/api/upload', upload.single('file'), (req, res) => {
  res.json({ message: 'File uploaded', file: req.file });
});

// Start Server
const PORT = process.env.PORT || 5038;
app.listen(PORT, async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    const client = new MongoClient(CONNECTION_STRING, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s
    });
    await client.connect();
    database = client.db(DATABASE_NAME);
    console.log('MongoDB Connection Successful');
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    process.exit(1); // Exit on failure
  }
});