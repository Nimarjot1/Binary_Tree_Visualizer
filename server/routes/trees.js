const express = require('express');
const { ObjectId } = require('mongodb');
const db = require('../config/database');

const router = express.Router();

// 📌 Save a new tree
router.post('/', async (req, res) => {
  try {
    const { name, nodes } = req.body;

    if (!name || !nodes) {
      return res.status(400).json({ error: 'Tree name and nodes are required' });
    }

    const collection = db.getCollection('trees');
    const result = await collection.insertOne({
      name: String(name),   // ensure string
      nodes: nodes,         // store tree structure (array or object)
      createdAt: new Date()
    });

    res.status(201).json({ message: 'Tree saved successfully', id: result.insertedId });
  } catch (err) {
    console.error('❌ Error saving tree:', err);
    res.status(500).json({ error: 'Failed to save tree' });
  }
});

// 📌 Get all trees
router.get('/', async (req, res) => {
  try {
    const collection = db.getCollection('trees');
    const trees = await collection.find().toArray();
    res.json(trees);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch trees' });
  }
});

// 📌 Get a specific tree by ID
router.get('/:id', async (req, res) => {
  try {
    const collection = db.getCollection('trees');
    const tree = await collection.findOne({ _id: new ObjectId(req.params.id) });

    if (!tree) return res.status(404).json({ error: 'Tree not found' });

    res.json(tree);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tree' });
  }
});

// 📌 Update a tree
router.put('/:id', async (req, res) => {
  try {
    const { name, nodes } = req.body;
    const collection = db.getCollection('trees');

    const result = await collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { name: String(name), nodes, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Tree not found' });
    }

    res.json({ message: 'Tree updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update tree' });
  }
});

// 📌 Delete a tree
router.delete('/:id', async (req, res) => {
  try {
    const collection = db.getCollection('trees');
    const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Tree not found' });
    }

    res.json({ message: 'Tree deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete tree' });
  }
});

module.exports = router;
