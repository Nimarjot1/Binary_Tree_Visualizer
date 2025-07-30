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

      {/* Professional Footer */}
      <footer className="bg-slate-950 bg-opacity-80 text-gray-300 py-6 mt-8">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
          
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-2">About</h3>
            <p className="text-sm">
              Binary Tree Visualizer is a tool to help understand tree traversal and structure with animations. Built by Nimarjot Kaur.
            </p>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Contact</h3>
            <p className="text-sm">
              Email: <a href="mailto=nimarjot@example.com" className="text-purple-400 hover:underline">nimarjot@example.com</a>
            </p>
            <p className="text-sm">Location: India</p>
          </div>

          {/* Connect Section */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Connect</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center justify-center sm:justify-start gap-2">
                <i className="fab fa-linkedin text-blue-400"></i>
                <a href="https://www.linkedin.com/in/nimarjot-kaur-03039b273/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400">
                  LinkedIn
                </a>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-2">
                <i className="fab fa-github text-gray-400"></i>
                <a href="https://github.com/Nimarjot1" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400">
                  GitHub
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom credit */}
        <div className="text-center text-xs text-gray-500 mt-6">
          Made with <span className="text-red-400">❤️</span> by Nimarjot Kaur
        </div>
      </footer>
    </div>
  );
}

export default App;
