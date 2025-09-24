const express = require('express');
const cors = require('cors');
const database = require('./config/database'); // ✅
const treeRoutes = require('./routes/trees');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));
app.use(express.json());

// Connect to MongoDB
database.connect().catch(console.error);

// Root info
app.get('/', (req, res) => {
  res.json({ 
    message: 'Binary Tree Visualizer API Server with MongoDB Atlas',
    version: '1.0.0',
    database: 'MongoDB Atlas',
    endpoints: {
      'GET /api/trees': 'Get all saved trees',
      'POST /api/trees': 'Save a new tree',
      'GET /api/trees/:id': 'Get a specific tree',
      'PUT /api/trees/:id': 'Update a specific tree',
      'DELETE /api/trees/:id': 'Delete a specific tree'
    }
  });
});

// API Routes
app.use('/api/trees', treeRoutes);

// Graceful shutdown
process.on('SIGINT', () => {
  database.disconnect().then(() => {
    process.exit(0);
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
});
