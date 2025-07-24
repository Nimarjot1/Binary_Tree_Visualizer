import React from 'react';
import { motion } from 'framer-motion';
import { Code, BookOpen, Zap } from 'lucide-react';

const AlgorithmPanel = ({ algorithm, onAlgorithmChange }) => {
  const algorithms = [
    {
      name: 'insert',
      title: 'Insert',
      description: 'Add a new node to the binary search tree',
      complexity: 'O(log n)',
      icon: <Code className="w-5 h-5" />
    },
    {
      name: 'delete',
      title: 'Delete',
      description: 'Remove a node from the binary search tree',
      complexity: 'O(log n)',
      icon: <Code className="w-5 h-5" />
    },
    {
      name: 'search',
      title: 'Search',
      description: 'Find a specific value in the tree',
      complexity: 'O(log n)',
      icon: <Code className="w-5 h-5" />
    },
    {
      name: 'inorder',
      title: 'In-order Traversal',
      description: 'Visit nodes in left-root-right order',
      complexity: 'O(n)',
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      name: 'preorder',
      title: 'Pre-order Traversal',
      description: 'Visit nodes in root-left-right order',
      complexity: 'O(n)',
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      name: 'postorder',
      title: 'Post-order Traversal',
      description: 'Visit nodes in left-right-root order',
      complexity: 'O(n)',
      icon: <BookOpen className="w-5 h-5" />
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
    >
      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
        <Zap className="w-6 h-6 mr-2 text-yellow-400" />
        Algorithms
      </h3>
      
      <div className="grid gap-3">
        {algorithms.map((algo) => (
          <motion.button
            key={algo.name}
            onClick={() => onAlgorithmChange(algo.name)}
            className={`p-4 rounded-xl border transition-all text-left ${
              algorithm === algo.name
                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                {algo.icon}
                <span className="font-semibold">{algo.title}</span>
              </div>
              <span className="text-xs bg-white/10 px-2 py-1 rounded">
                {algo.complexity}
              </span>
            </div>
            <p className="text-sm opacity-80">{algo.description}</p>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default AlgorithmPanel;