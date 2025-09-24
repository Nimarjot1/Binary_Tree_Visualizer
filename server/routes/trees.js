// routes/trees.js
const express = require('express');
const { ObjectId } = require('mongodb');
const db = require('../config/database');

const router = express.Router();

// 📌 CREATE: Save a new tree (only name from client)
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ error: 'Tree name must be a non-empty string' });
    }

    const collection = db.getCollection('trees');
    const result = await collection.insertOne({
      name: name.trim(),    // ✅ only name from client
      nodes: [],            // ✅ initialize empty nodes
      createdAt: new Date()
    });

    res.status(201).json({ 
      message: 'Tree saved successfully', 
      id: result.insertedId 
    });
  } catch (err) {
    console.error('❌ Error saving tree:', err);
    res.status(500).json({ error: 'Failed to save tree' });
  }
});

// 📌 READ: Get all trees
router.get('/', async (req, res) => {
  try {
    const collection = db.getCollection('trees');
    const trees = await collection.find().toArray();
    res.json(trees);
  } catch (err) {
    console.error('❌ Error fetching trees:', err);
    res.status(500).json({ error: 'Failed to fetch trees' });
  }
});

// 📌 READ: Get one tree by ID
router.get('/:id', async (req, res) => {
  try {
    const collection = db.getCollection('trees');
    const tree = await collection.findOne({ _id: new ObjectId(req.params.id) });

    if (!tree) {
      return res.status(404).json({ error: 'Tree not found' });
    }

    res.json(tree);
  } catch (err) {
    console.error('❌ Error fetching tree:', err);
    res.status(500).json({ error: 'Failed to fetch tree' });
  }
});

// 📌 UPDATE: Update a tree (e.g., add nodes later)
router.put('/:id', async (req, res) => {
  try {
    const { name, nodes } = req.body;

    if (!name && !nodes) {
      return res.status(400).json({ error: 'At least one field (name or nodes) is required' });
    }

    const collection = db.getCollection('trees');
    const result = await collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { ...(name && { name: String(name).trim() }), ...(nodes && { nodes }), updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Tree not found' });
    }

    res.json({ message: 'Tree updated successfully' });
  } catch (err) {
    console.error('❌ Error updating tree:', err);
    res.status(500).json({ error: 'Failed to update tree' });
  }
});

// 📌 DELETE: Delete a tree by ID
router.delete('/:id', async (req, res) => {
  try {
    const collection = db.getCollection('trees');
    const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Tree not found' });
    }

    res.json({ message: 'Tree deleted successfully' });
  } catch (err) {
    console.error('❌ Error deleting tree:', err);
    res.status(500).json({ error: 'Failed to delete tree' });
  }
});

module.exports = router;
