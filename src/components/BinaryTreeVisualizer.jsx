import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Save, TreePine, Target } from 'lucide-react';
import BinaryTreeNode from './BinaryTreeNode.jsx';
import ManualInsertionPanel from './ManualInsertionPanel.jsx';
import { BinaryTree } from '../utils/binaryTreeClass';
import { ApiService } from '../services/api';
import TreeStats from './TreeStats.jsx';

const BinaryTreeVisualizer = () => {
  const [tree, setTree] = useState(new BinaryTree());
  const [inputValue, setInputValue] = useState('');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('insert');

  const [savedTrees, setSavedTrees] = useState([]);
  const [treeName, setTreeName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [message, setMessage] = useState('');

  const [insertionMode, setInsertionMode] = useState('auto');
  const [showManualInsertPanel, setShowManualInsertPanel] = useState(false);
  const [selectedParent, setSelectedParent] = useState(null);

  const [highlightedNodes, setHighlightedNodes] = useState(new Set());
  const [visitedNodes, setVisitedNodes] = useState(new Set());
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentTraversalSteps, setCurrentTraversalSteps] = useState([]);
  const [searchMode, setSearchMode] = useState('complete');

  // -------- helpers --------
  const rebuildFromRoot = (rootObj) => {
    // Make a fresh BinaryTree instance so React sees a new reference
    const fresh = new BinaryTree();
    // Our nodes are plain objects (value/left/right), so JSON clone is fine
    fresh.root = rootObj ? JSON.parse(JSON.stringify(rootObj)) : null;
    setTree(fresh);
  };

  const refreshFromCurrentTree = () => rebuildFromRoot(tree.root);

  // -------- API --------
  useEffect(() => {
    (async () => {
      try {
        const trees = await ApiService.loadTrees();
        setSavedTrees(Array.isArray(trees) ? trees : []);
      } catch (error) {
        console.error('Failed to load trees:', error);
        setMessage('Failed to connect to server. Save/Load features unavailable.');
      }
    })();
  }, []);

  const handleSaveTree = async () => {
    if (!treeName.trim()) {
      setMessage('Please enter a tree name');
      return;
    }
    if (!tree.root) {
      setMessage('Cannot save an empty tree');
      return;
    }

    try {
      await ApiService.saveTree({
        name: treeName.trim(),
        treeData: JSON.parse(JSON.stringify(tree.root)),
        algorithm: selectedAlgorithm,
        userId: 'anonymous',
      });

      setMessage('✅ Tree saved successfully!');
      setShowSaveDialog(false);
      setTreeName('');
      loadTrees();
    } catch (error) {
      console.error('Save error:', error);
      setMessage(`❌ Failed to save tree: ${error?.message || 'Unknown error'}`);
    }
  };


  const handleLoadTree = (treeData) => {
    rebuildFromRoot(treeData?.treeData ?? null);
    setMessage(`Loaded tree: ${treeData?.name ?? 'Unnamed'}`);
  };

  const handleDeleteTree = async (treeId) => {
    try {
      await ApiService.deleteTree(treeId);
      setMessage('Tree deleted successfully!');
      const trees = await ApiService.loadTrees();
      setSavedTrees(Array.isArray(trees) ? trees : []);
    } catch (error) {
      console.error(error);
      setMessage('Failed to delete tree');
    }
  };

  // -------- manual insert --------
  const handleManualInsert = (value, parentValue, side) => {
    const success = tree.insertManual(value, parentValue, side);
    if (success) {
      setMessage(`Inserted ${value} to the ${side} of node ${parentValue}`);
      refreshFromCurrentTree(); // force re-render
    } else {
      setMessage(`Failed to insert ${value}. Position may be occupied.`);
    }
    setSelectedParent(null);
  };

  const handleNodeClick = (nodeValue) => {
    if (insertionMode === 'manual' && showManualInsertPanel) {
      setSelectedParent(nodeValue);
    }
  };

  // -------- animations --------
  const animateAlgorithm = async (steps, algorithmName) => {
    setIsAnimating(true);
    setCurrentStep(0);
    setCurrentTraversalSteps(steps);
    setHighlightedNodes(new Set());
    setVisitedNodes(new Set());

    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      const s = steps[i];
      setHighlightedNodes(new Set([s.node]));

      const allVisited = new Set();
      for (let j = 0; j <= i; j++) {
        if (steps[j].action === 'process' || steps[j].action === 'visit') {
          allVisited.add(steps[j].node);
        }
      }
      setVisitedNodes(allVisited);
      // 1s between steps
      // eslint-disable-next-line no-await-in-loop
      await new Promise((r) => setTimeout(r, 1000));
    }

    const processedNodes = steps
      .filter((step) => step.action === 'process')
      .map((step) => step.node);

    setMessage(`${algorithmName} completed: ${processedNodes.join(' → ')}`);
    setIsAnimating(false);

    setTimeout(() => {
      setHighlightedNodes(new Set());
      setVisitedNodes(new Set());
    }, 2000);
  };

  const animateSearch = async (steps, found, searchValue) => {
    setIsAnimating(true);
    setHighlightedNodes(new Set());
    setVisitedNodes(new Set());

    for (let i = 0; i < steps.length; i++) {
      const s = steps[i];
      setHighlightedNodes(new Set([s.node]));

      const visitedSoFar = new Set();
      for (let j = 0; j <= i; j++) visitedSoFar.add(steps[j].node);
      setVisitedNodes(visitedSoFar);

      // eslint-disable-next-line no-await-in-loop
      await new Promise((r) => setTimeout(r, 1000));
    }

    setMessage(found ? `Found ${searchValue} at node ${searchValue}` : `${searchValue} not found in tree`);
    setIsAnimating(false);

    setTimeout(() => {
      setHighlightedNodes(new Set());
      setVisitedNodes(new Set());
    }, 2000);
  };

  // -------- execute --------
  const executeAlgorithm = useCallback(() => {
    if (isAnimating) {
      setMessage('Animation in progress. Please wait...');
      return;
    }

    const value = Number(inputValue);
    const algorithmsWithoutInput = ['clear', 'inorder', 'preorder', 'postorder', 'dfs', 'bfs'];

    if (!algorithmsWithoutInput.includes(selectedAlgorithm) && !Number.isFinite(value)) {
      setMessage('Please enter a valid number');
      return;
    }

    let result = '';

    switch (selectedAlgorithm) {
      case 'insert': {
        if (insertionMode === 'auto') {
          tree.insert(value);
          result = `Inserted ${value}`;
          refreshFromCurrentTree();
        } else {
          setShowManualInsertPanel(true);
          return;
        }
        break;
      }

      case 'delete': {
        const nodeExists = tree.findNode(tree.root, value);
        if (nodeExists) {
          tree.delete(value);
          result = `Deleted ${value}`;
          refreshFromCurrentTree();
        } else {
          setMessage(`Node ${value} not found in tree`);
          setInputValue('');
          return;
        }
        break;
      }

      case 'search': {
        if (!tree.root) {
          setMessage('Tree is empty. Add some nodes first.');
          return;
        }
        const searchResult = tree.searchWithSteps(value, searchMode === 'bst');
        animateSearch(searchResult.steps, searchResult.found, value);
        setInputValue('');
        return;
      }

      case 'inorder': {
        if (!tree.root) {
          setMessage('Tree is empty. Add some nodes first.');
          return;
        }
        const inorderResult = tree.inorderTraversalWithSteps();
        animateAlgorithm(inorderResult.steps, 'In-order traversal');
        setInputValue('');
        return;
      }

      case 'preorder': {
        if (!tree.root) {
          setMessage('Tree is empty. Add some nodes first.');
          return;
        }
        const preorderResult = tree.preorderTraversalWithSteps();
        animateAlgorithm(preorderResult.steps, 'Pre-order traversal');
        setInputValue('');
        return;
      }

      case 'postorder': {
        if (!tree.root) {
          setMessage('Tree is empty. Add some nodes first.');
          return;
        }
        const postorderResult = tree.postorderTraversalWithSteps();
        animateAlgorithm(postorderResult.steps, 'Post-order traversal');
        setInputValue('');
        return;
      }

      case 'dfs': {
        if (!tree.root) {
          setMessage('Tree is empty. Add some nodes first.');
          return;
        }
        const dfsResult = tree.dfsTraversalWithSteps();
        animateAlgorithm(dfsResult.steps, 'DFS traversal');
        setInputValue('');
        return;
      }

      case 'bfs': {
        if (!tree.root) {
          setMessage('Tree is empty. Add some nodes first.');
          return;
        }
        const bfsResult = tree.bfsTraversalWithSteps();
        animateAlgorithm(bfsResult.steps, 'BFS traversal');
        setInputValue('');
        return;
      }

      case 'clear': {
        setTree(new BinaryTree());
        result = 'Tree cleared';
        break;
      }

      default:
        break;
    }

    setMessage(result);
    setInputValue('');
  }, [isAnimating, inputValue, insertionMode, searchMode, selectedAlgorithm, tree]);

  // -------- stats --------
  const treeStats = tree.getTreeStats();

  // -------- render tree --------
  const renderTree = (node, x, y, level) => {
    if (!node) return null;

    const baseSpacing = Math.max(80, 300 / Math.pow(2, level));
    const spacing = baseSpacing;
    const leftX = x - spacing;
    const rightX = x + spacing;
    const childY = y + 100;

    const minX = 60;
    const maxX = 940; // widen since viewBox width is 1000
    const adjustedLeftX = Math.max(minX, leftX);
    const adjustedRightX = Math.min(maxX, rightX);

    return (
      <g key={`${node.value}-${x}-${y}`}>
        {node.left && (
          <line
            x1={x}
            y1={y}
            x2={adjustedLeftX}
            y2={childY}
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="2"
          />
        )}
        {node.right && (
          <line
            x1={x}
            y1={y}
            x2={adjustedRightX}
            y2={childY}
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="2"
          />
        )}

        <BinaryTreeNode
          value={node.value}
          x={x}
          y={y}
          isHighlighted={highlightedNodes.has(node.value)}
          isVisited={visitedNodes.has(node.value)}
          isSelectable={insertionMode === 'manual' && showManualInsertPanel}
          onNodeClick={handleNodeClick}
        />

        {node.left && renderTree(node.left, adjustedLeftX, childY, level + 1)}
        {node.right && renderTree(node.right, adjustedRightX, childY, level + 1)}
      </g>
    );
  };

  // -------- component --------
  return (
    <div className="pt-20 min-h-screen">
      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Control Panel */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-28 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
              >
                <h2 className="text-xl font-bold text-white mb-6">Controls</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Insertion Mode
                    </label>
                    <div className="flex space-x-2">
                      <motion.button
                        onClick={() => setInsertionMode('auto')}
                        className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                          insertionMode === 'auto'
                            ? 'bg-emerald-500 text-white'
                            : 'bg-white/10 text-gray-300 hover:bg-white/20'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Auto BST
                      </motion.button>
                      <motion.button
                        onClick={() => setInsertionMode('manual')}
                        className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                          insertionMode === 'manual'
                            ? 'bg-amber-500 text-white'
                            : 'bg-white/10 text-gray-300 hover:bg-white/20'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Target className="w-4 h-4 mr-1" />
                        Manual
                      </motion.button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Algorithm
                    </label>
                    <select
                      value={selectedAlgorithm}
                      onChange={(e) => setSelectedAlgorithm(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                    >
                      <option value="insert">Insert</option>
                      <option value="delete">Delete</option>
                      <option value="search">Search</option>
                      <option value="inorder">In-order Traversal</option>
                      <option value="preorder">Pre-order Traversal</option>
                      <option value="postorder">Post-order Traversal</option>
                      <option value="dfs">DFS Traversal</option>
                      <option value="bfs">BFS Traversal</option>
                      <option value="clear">Clear Tree</option>
                    </select>
                  </div>

                  {selectedAlgorithm === 'search' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Search Mode
                      </label>
                      <div className="flex space-x-2">
                        <motion.button
                          onClick={() => setSearchMode('complete')}
                          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                            searchMode === 'complete'
                              ? 'bg-blue-500 text-white'
                              : 'bg-white/10 text-gray-300 hover:bg-white/20'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Complete Tree
                        </motion.button>
                        <motion.button
                          onClick={() => setSearchMode('bst')}
                          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                            searchMode === 'bst'
                              ? 'bg-purple-500 text-white'
                              : 'bg-white/10 text-gray-300 hover:bg-white/20'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          BST Optimized
                        </motion.button>
                      </div>
                    </div>
                  )}

                  {selectedAlgorithm !== 'clear' &&
                    selectedAlgorithm !== 'inorder' &&
                    selectedAlgorithm !== 'preorder' &&
                    selectedAlgorithm !== 'postorder' &&
                    selectedAlgorithm !== 'dfs' &&
                    selectedAlgorithm !== 'bfs' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Value
                        </label>
                        <input
                          type="number"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                          placeholder="Enter number"
                        />
                      </div>
                    )}

                  <motion.button
                    onClick={executeAlgorithm}
                    disabled={isAnimating}
                    className={`w-full font-semibold py-3 px-4 rounded-lg transition-all flex items-center justify-center space-x-2 ${
                      isAnimating
                        ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                        : selectedAlgorithm === 'insert' && insertionMode === 'manual'
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white'
                        : 'bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white'
                    }`}
                    whileHover={!isAnimating ? { scale: 1.05 } : {}}
                    whileTap={!isAnimating ? { scale: 0.95 } : {}}
                  >
                    {isAnimating ? (
                      <>
                        <motion.div
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        />
                        <span>Animating...</span>
                      </>
                    ) : selectedAlgorithm === 'insert' && insertionMode === 'manual' ? (
                      <>
                        <Target className="w-4 h-4" />
                        <span>Manual Insert</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        <span>Execute</span>
                      </>
                    )}
                  </motion.button>

                  {isAnimating && currentTraversalSteps.length > 0 && (
                    <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-300">Animation Progress</span>
                        <span className="text-xs text-gray-400">
                          Step {currentStep + 1} of {currentTraversalSteps.length}
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                          className="h-2 rounded-full bg-emerald-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${((currentStep + 1) / currentTraversalSteps.length) * 100}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      {currentTraversalSteps[currentStep] && (
                        <p className="text-xs text-gray-300 mt-2">
                          Current: Node {currentTraversalSteps[currentStep].node} (
                          {currentTraversalSteps[currentStep].action})
                        </p>
                      )}
                    </div>
                  )}

                  <div className="flex space-x-2">
                    <motion.button
                      onClick={() => setShowSaveDialog(true)}
                      className="flex-1 bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-3 rounded-lg transition-all flex items-center justify-center space-x-1"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </motion.button>

                    <motion.button
                      onClick={() => setTree(new BinaryTree())}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-3 rounded-lg transition-all flex items-center justify-center space-x-1"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Reset</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Tree Statistics */}
              <TreeStats stats={treeStats} />

              {/* Saved Trees */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
              >
                <h3 className="text-lg font-semibold text-white mb-3">Saved Trees</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {savedTrees.length === 0 ? (
                    <p className="text-gray-400 text-sm">No saved trees yet</p>
                  ) : (
                    savedTrees.map((savedTree) => (
                      <div
                        key={savedTree._id}
                        className="bg-white/5 rounded-lg p-3 border border-white/10"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-white truncate">{savedTree.name}</span>
                          <div className="flex space-x-1">
                            <button
                              onClick={() => handleLoadTree(savedTree)}
                              className="text-blue-400 hover:text-blue-300 text-xs"
                            >
                              Load
                            </button>
                            <button
                              onClick={() => handleDeleteTree(savedTree._id)}
                              className="text-red-400 hover:text-red-300 text-xs"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Visualization Area */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Binary Tree Visualization</h2>
                {message && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-emerald-500/20 text-emerald-300 px-4 py-2 rounded-lg border border-emerald-500/30"
                  >
                    {message}
                  </motion.div>
                )}
              </div>

              <div className="bg-slate-900/50 rounded-xl p-4 min-h-96">
                {tree.root ? (
                  <svg width="100%" height="800" viewBox="0 0 1000 800" className="overflow-visible">
                    {renderTree(tree.root, 500, 60, 0)}
                  </svg>
                ) : (
                  <div className="flex items-center justify-center h-96 text-gray-400">
                    <div className="text-center">
                      <TreePine className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Tree is empty. Add some nodes to get started!</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Save Dialog */}
      <AnimatePresence>
        {showSaveDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-slate-800 rounded-2xl p-6 max-w-md w-full"
            >
              <h3 className="text-xl font-bold text-white mb-4">Save Tree</h3>
              <input
                type="text"
                value={treeName}
                onChange={(e) => setTreeName(e.target.value)}
                placeholder="Enter tree name"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white mb-4"
              />
              <div className="flex space-x-3">
                <motion.button
                  onClick={handleSaveTree}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded-lg transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Save
                </motion.button>
                <motion.button
                  onClick={() => setShowSaveDialog(false)}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Manual Insertion Panel */}
      <ManualInsertionPanel
        isOpen={showManualInsertPanel}
        onClose={() => {
          setShowManualInsertPanel(false);
          setSelectedParent(null);
        }}
        availableParents={tree.getAvailableParents()}
        onInsert={handleManualInsert}
        selectedParent={selectedParent}
        onParentSelect={setSelectedParent}
      />
    </div>
  );
};

export default BinaryTreeVisualizer;
