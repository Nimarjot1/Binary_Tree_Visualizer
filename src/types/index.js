// Type definitions for JavaScript (for documentation purposes)

// TreeNode interface
export const TreeNodeType = {
  value: 'number',
  left: 'TreeNode | null',
  right: 'TreeNode | null'
};

// SavedTree interface
export const SavedTreeType = {
  _id: 'string (optional)',
  name: 'string',
  treeData: 'TreeNode | null',
  algorithm: 'string',
  createdAt: 'Date (optional)',
  userId: 'string (optional)'
};

// TraversalStep interface
export const TraversalStepType = {
  node: 'number',
  path: 'number[]',
  action: "'visit' | 'process' | 'backtrack'"
};

// SearchResult interface
export const SearchResultType = {
  found: 'boolean',
  path: 'number[]',
  steps: 'TraversalStep[]'
};

// TraversalResult interface
export const TraversalResultType = {
  values: 'number[]',
  steps: 'TraversalStep[]'
};

// TreeStats interface
export const TreeStatsType = {
  height: 'number',
  nodeCount: 'number',
  leafCount: 'number',
  isBalanced: 'boolean',
  isValidBST: 'boolean'
};