// routes/trees.js
const express = require('express');
const { ObjectId } = require('mongodb');
const db = require('../config/database');

const router = express.Router();

// 📌 CREATE: Save a new tree (only name allowed from client)
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;

    // Validate tree name
    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ error: 'Tree name must be a non-empty string' });
    }

    const collection = db.getCollection('trees');

    // Server will add empty nodes by default
    const result = await collection.insertOne({
      name: name.trim(),
      nodes: [],           // ✅ initialize empty array
      createdAt: new Date()
    });

    res.status(201).json({ message: 'Tree saved successfully', id: result.insertedId });
  } catch (err) {
    console.error('❌ Error saving tree:', err);
    res.status(500).json({ error: 'Failed to save tree' });
  }
});

module.exports = router;
