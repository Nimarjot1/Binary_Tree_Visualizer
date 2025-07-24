import React from 'react';
import { motion } from 'framer-motion';
import { TreePine, Home, Code } from 'lucide-react';

const Navbar = ({ currentPage, setCurrentPage }) => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <TreePine className="w-8 h-8 text-emerald-400" />
            <span className="text-xl font-bold text-white">TreeViz</span>
          </motion.div>
          
          <div className="flex items-center space-x-6">
            <motion.button
              onClick={() => setCurrentPage('landing')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                currentPage === 'landing'
                  ? 'bg-emerald-500 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </motion.button>
            
            <motion.button
              onClick={() => setCurrentPage('visualizer')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                currentPage === 'visualizer'
                  ? 'bg-emerald-500 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Code className="w-4 h-4" />
              <span>Visualizer</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;