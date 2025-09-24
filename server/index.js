// index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./config/database'); // your database config
const treeRoutes = require('./routes/trees');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));
app.use(express.json());

// Routes
app.use('/trees', treeRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('🌳 Tree API is running!');
});

// Connect to MongoDB and start server
db.connectToDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Failed to connect to DB:', err);
  });
