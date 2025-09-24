const express = require('express');
const TreeModel = require('../models/Tree');
const router = express.Router();

// Get all trees
router.get('/', async (req, res) => {
  try {
    const trees = await TreeModel.findAll();
    res.json(trees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single tree by ID
router.get('/:id', async (req, res) => {
  try {
    const tree = await TreeModel.findById(req.params.id);
    if (!tree) return res.status(404).json({ error: 'Tree not found' });
    res.json(tree);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new tree
router.post('/', async (req, res) => {
  try {
    const { name, treeData, algorithm } = req.body;
    if (!name || !treeData || !algorithm) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const tree = await TreeModel.create({ name, treeData, algorithm });
    res.status(201).json(tree);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a tree
router.put('/:id', async (req, res) => {
  try {
    const updateData = req.body;
    const tree = await TreeModel.update(req.params.id, updateData);
    res.json(tree);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a tree
router.delete('/:id', async (req, res) => {
  try {
    await TreeModel.delete(req.params.id);
    res.json({ message: 'Tree deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
