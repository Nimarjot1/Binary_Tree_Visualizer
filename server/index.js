const express = require('express');
const cors = require('cors');
const database = require('./config/database');
const treeRoutes = require('./routes/trees');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*', // Allow all origins for now
  credentials: true
}));
app.use(express.json());

// Connect to MongoDB
(async () => {
  try {
    await database.connect();
  } catch (err) {
    console.error('Failed to connect to MongoDB. Exiting...');
    process.exit(1);
  }
})();

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Binary Tree Visualizer API Server with MongoDB Atlas',
    version: '1.0.0',
  });
});

// API Routes
app.use('/api/trees', treeRoutes);

// Graceful shutdown
process.on('SIGINT', async () => {
  await database.disconnect();
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
