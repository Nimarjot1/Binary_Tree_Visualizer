import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Target, X } from 'lucide-react';

const ManualInsertionPanel = ({
  isOpen,
  onClose,
  availableParents,
  onInsert,
  selectedParent,
  onParentSelect
}) => {
  const [newValue, setNewValue] = useState('');

  const handleInsert = (side) => {
    const value = parseInt(newValue);
    if (isNaN(value) || selectedParent === null) return;
    
    onInsert(value, selectedParent, side);
    setNewValue('');
    onClose();
  };

  const selectedParentData = availableParents.find(p => p.value === selectedParent);

  return (
    <AnimatePresence>
      {isOpen && (
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
            className="bg-slate-800 rounded-2xl p-6 max-w-md w-full border border-white/10"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white flex items-center">
                <Target className="w-6 h-6 mr-2 text-amber-400" />
                Manual Insertion
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  New Node Value
                </label>
                <input
                  type="number"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                  placeholder="Enter number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Select Parent Node
                </label>
                <div className="grid gap-2 max-h-32 overflow-y-auto">
                  {availableParents.map((parent) => (
                    <motion.button
                      key={parent.value}
                      onClick={() => onParentSelect(parent.value)}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        selectedParent === parent.value
                          ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                          : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Node {parent.value}</span>
                        <div className="flex space-x-1">
                          {parent.canInsertLeft && (
                            <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">
                              L
                            </span>
                          )}
                          {parent.canInsertRight && (
                            <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                              R
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {selectedParentData && (
                <div className="flex space-x-3">
                  <motion.button
                    onClick={() => handleInsert('left')}
                    disabled={!selectedParentData.canInsertLeft || !newValue}
                    className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 ${
                      selectedParentData.canInsertLeft && newValue
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                    whileHover={selectedParentData.canInsertLeft && newValue ? { scale: 1.05 } : {}}
                    whileTap={selectedParentData.canInsertLeft && newValue ? { scale: 0.95 } : {}}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Insert Left</span>
                  </motion.button>

                  <motion.button
                    onClick={() => handleInsert('right')}
                    disabled={!selectedParentData.canInsertRight || !newValue}
                    className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 ${
                      selectedParentData.canInsertRight && newValue
                        ? 'bg-blue-500 hover:bg-blue-600 text-white'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                    whileHover={selectedParentData.canInsertRight && newValue ? { scale: 1.05 } : {}}
                    whileTap={selectedParentData.canInsertRight && newValue ? { scale: 0.95 } : {}}
                  >
                    <ArrowRight className="w-4 h-4" />
                    <span>Insert Right</span>
                  </motion.button>
                </div>
              )}

              <div className="text-xs text-gray-400 bg-white/5 rounded-lg p-3">
                <p className="mb-1">💡 <strong>How it works:</strong></p>
                <p>• Select a parent node that has available left (L) or right (R) positions</p>
                <p>• Enter the value for your new node</p>
                <p>• Choose whether to insert on the left or right side</p>
                <p>• Orange nodes in the tree are selectable parents</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ManualInsertionPanel;