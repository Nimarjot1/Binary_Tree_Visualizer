const express = require('express');
const TreeModel = require('../models/Tree');
const router = express.Router();

// Get all trees
router.get('/', async (req, res) => {
  try {
    const userId = req.query.userId || 'anonymous';
    const trees = await TreeModel.findAll(userId);
    res.json(trees);
  } catch (error) {
    console.error('Error fetching trees:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get single tree
router.get('/:id', async (req, res) => {
  try {
    const tree = await TreeModel.findById(req.params.id);
    if (!tree) {
      return res.status(404).json({ error: 'Tree not found' });
    }
    res.json(tree);
  } catch (error) {
    console.error('Error fetching tree:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create new tree
router.post('/', async (req, res) => {
  try {
    const { name, treeData, algorithm, userId = 'anonymous' } = req.body;
    
    if (!name || !treeData || !algorithm) {
      return res.status(400).json({ 
        error: 'Missing required fields: name, treeData, algorithm' 
      });
    }
    
    const tree = await TreeModel.create({
      name,
      treeData,
      algorithm,
      userId
    });
    
    res.status(201).json(tree);
  } catch (error) {
    console.error('Error creating tree:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update tree
router.put('/:id', async (req, res) => {
  try {
    const { name, treeData, algorithm } = req.body;
    const updateData = {};
    
    if (name) updateData.name = name;
    if (treeData) updateData.treeData = treeData;
    if (algorithm) updateData.algorithm = algorithm;
    
    const tree = await TreeModel.update(req.params.id, updateData);
    res.json(tree);
  } catch (error) {
    console.error('Error updating tree:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete tree
router.delete('/:id', async (req, res) => {
  try {
    await TreeModel.delete(req.params.id);
    res.json({ message: 'Tree deleted successfully' });
  } catch (error) {
    console.error('Error deleting tree:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;