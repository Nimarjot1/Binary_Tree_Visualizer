import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TreePine, Target, CheckCircle, XCircle, Info } from 'lucide-react';

const TreeStats = ({ stats }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
    >
      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
        <BarChart3 className="w-6 h-6 mr-2 text-blue-400" />
        Tree Statistics
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-300 text-sm">Height</span>
            <TreePine className="w-4 h-4 text-green-400" />
          </div>
          <p className="text-2xl font-bold text-white mt-1">{stats.height}</p>
        </div>
        
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-300 text-sm">Nodes</span>
            <Target className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-2xl font-bold text-white mt-1">{stats.nodeCount}</p>
        </div>
        
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-300 text-sm">Leaves</span>
            <TreePine className="w-4 h-4 text-yellow-400" />
          </div>
          <p className="text-2xl font-bold text-white mt-1">{stats.leafCount}</p>
        </div>
        
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-300 text-sm">Balanced</span>
            {stats.isBalanced ? (
              <CheckCircle className="w-4 h-4 text-green-400" />
            ) : (
              <XCircle className="w-4 h-4 text-red-400" />
            )}
          </div>
          <p className={`text-sm font-semibold mt-1 ${stats.isBalanced ? 'text-green-400' : 'text-red-400'}`}>
            {stats.isBalanced ? 'Yes' : 'No'}
          </p>
        </div>
        
        <div className="bg-white/5 rounded-lg p-4 col-span-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-300 text-sm">Valid BST</span>
            {stats.isValidBST ? (
              <CheckCircle className="w-4 h-4 text-green-400" />
            ) : (
              <XCircle className="w-4 h-4 text-red-400" />
            )}
          </div>
          <p className={`text-sm font-semibold mb-3 ${stats.isValidBST ? 'text-green-400' : 'text-red-400'}`}>
            {stats.isValidBST ? 'Valid Binary Search Tree' : 'Not a valid BST'}
          </p>
          
          {!stats.isValidBST && (
            <div className="bg-white/5 rounded-lg p-3 border border-white/10">
              <div className="flex items-center mb-2">
                <Info className="w-4 h-4 text-blue-400 mr-2" />
                <span className="text-xs font-semibold text-blue-400">How to make it a valid BST:</span>
              </div>
              <div className="text-xs text-gray-300 space-y-1">
                <p>• All left subtree values must be less than parent</p>
                <p>• All right subtree values must be greater than parent</p>
                <p>• Use "Auto BST" insertion mode for automatic BST creation</p>
                <p>• Or manually arrange nodes following BST rules</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TreeStats;