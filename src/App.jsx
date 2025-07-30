import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar.jsx';
import LandingPage from './components/LandingPage.jsx';
import BinaryTreeVisualizer from './components/BinaryTreeVisualizer.jsx';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <motion.div
        key={currentPage}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="flex-grow"
      >
        {currentPage === 'landing' ? (
          <LandingPage onGetStarted={() => setCurrentPage('visualizer')} />
        ) : (
          <BinaryTreeVisualizer />
        )}
      </motion.div>

      {/* Footer */}
      <footer className="text-center py-4 text-sm text-gray-300">
        Made with <span className="text-red-400">❤️</span> by Nimarjot Kaur
      </footer>
    </div>
  );
}

export default App;
