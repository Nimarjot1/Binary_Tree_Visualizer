import React from 'react';
import { motion } from 'framer-motion';

const BinaryTreeNode = ({ 
  value, 
  x, 
  y, 
  isHighlighted = false, 
  isVisited = false,
  isSelectable = false,
  onNodeClick
}) => {
  return (
    <motion.g
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
      whileHover={{ scale: 1.1 }}
      style={{ cursor: isSelectable ? 'pointer' : 'default' }}
      onClick={() => isSelectable && onNodeClick && onNodeClick(value)}
    >
      <motion.circle
        cx={x}
        cy={y}
        r="25"
        fill={
          isHighlighted ? "#10b981" : 
          isVisited ? "#3b82f6" : 
          isSelectable ? "#f59e0b" : 
          "#6366f1"
        }
        stroke={
          isHighlighted ? "#059669" : 
          isVisited ? "#1d4ed8" :
          isSelectable ? "#d97706" : 
          "#4338ca"
        }
        strokeWidth="2"
        className="drop-shadow-lg"
        animate={{
          fill: isHighlighted ? "#10b981" : isVisited ? "#3b82f6" : isSelectable ? "#f59e0b" : "#6366f1",
          scale: isHighlighted ? 1.2 : isVisited ? 1.1 : 1,
          stroke: isHighlighted ? "#059669" : isVisited ? "#1d4ed8" : isSelectable ? "#d97706" : "#4338ca"
        }}
        transition={{ duration: 0.3 }}
      />
      {isVisited && !isHighlighted && (
        <motion.circle
          cx={x}
          cy={y}
          r="30"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="1"
          strokeDasharray="3,3"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 0.5 }}
        />
      )}
      {isSelectable && (
        <motion.circle
          cx={x}
          cy={y}
          r="30"
          fill="none"
          stroke="#f59e0b"
          strokeWidth="2"
          strokeDasharray="5,5"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      )}
      <motion.text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-sm font-bold fill-white select-none"
        animate={{
          scale: isHighlighted ? 1.2 : 1
        }}
        transition={{ duration: 0.3 }}
      >
        {value}
      </motion.text>
    </motion.g>
  );
};

export default BinaryTreeNode;