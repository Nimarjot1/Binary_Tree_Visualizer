import React from 'react';
import { motion } from 'framer-motion';
import { TreePine, Play, Zap, Database, Brain, GitBranch } from 'lucide-react';

const LandingPage = ({ onGetStarted }) => {
  const features = [
    {
      icon: <TreePine className="w-8 h-8 text-emerald-400" />,
      title: "Interactive Visualization",
      description: "Watch binary trees come to life with smooth animations and real-time updates"
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-400" />,
      title: "Lightning Fast",
      description: "Optimized algorithms with O(log n) complexity for blazing fast performance"
    },
    {
      icon: <Database className="w-8 h-8 text-blue-400" />,
      title: "MongoDB Integration",
      description: "Save and load your binary trees with our robust MongoDB backend"
    },
    {
      icon: <Brain className="w-8 h-8 text-purple-400" />,
      title: "Smart Algorithms",
      description: "Comprehensive suite of BST operations: insert, delete, search, and traverse"
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            className="flex justify-center mb-8"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <TreePine className="w-24 h-24 text-emerald-400" />
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
              TreeViz
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            The ultimate binary tree visualization platform. Build, analyze, and understand 
            data structures with stunning interactive animations.
          </p>
          
          <motion.button
            onClick={onGetStarted}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white transition-all duration-200 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full hover:from-emerald-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play className="w-6 h-6 mr-2" />
            Let's Go!
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-1000"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </motion.button>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Everything you need to master binary trees and data structures
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-300">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Algorithm Preview */}
      <div className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white/5 backdrop-blur-sm rounded-3xl p-12 border border-white/10"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Supported Algorithms
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Comprehensive binary tree operations with visual step-by-step execution
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Insert", desc: "Add nodes dynamically", icon: <GitBranch className="w-6 h-6" /> },
              { name: "Delete", desc: "Remove nodes safely", icon: <GitBranch className="w-6 h-6" /> },
              { name: "Search", desc: "Find nodes efficiently", icon: <GitBranch className="w-6 h-6" /> },
              { name: "Traverse", desc: "In-order, Pre-order, Post-order", icon: <GitBranch className="w-6 h-6" /> },
              { name: "Balance", desc: "AVL tree rotations", icon: <GitBranch className="w-6 h-6" /> },
              { name: "Validate", desc: "Check BST properties", icon: <GitBranch className="w-6 h-6" /> }
            ].map((algo, index) => (
              <motion.div
                key={index}
                className="bg-white/5 rounded-xl p-6 border border-white/10"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center mb-3">
                  <div className="text-emerald-400 mr-3">
                    {algo.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {algo.name}
                  </h3>
                </div>
                <p className="text-gray-300 text-sm">
                  {algo.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;