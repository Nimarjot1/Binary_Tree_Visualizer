import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar.jsx';
import LandingPage from './components/LandingPage.jsx';
import BinaryTreeVisualizer from './components/BinaryTreeVisualizer.jsx';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <motion.div
        key={currentPage}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen"
      >
        {currentPage === 'landing' ? (
          <LandingPage onGetStarted={() => setCurrentPage('visualizer')} />
        ) : (
          <BinaryTreeVisualizer />
        )}
      </motion.div>
    </div>
  );
}

export default App;