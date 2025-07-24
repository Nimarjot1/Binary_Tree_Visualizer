export class TreeAlgorithms {
  // Complete tree search that looks at entire tree
  static searchWithSteps(root, target) {
    const steps = [];
    const path = [];
    
    const search = (node, currentPath) => {
      if (!node) return false;
      
      const newPath = [...currentPath, node.value];
      steps.push({
        node: node.value,
        path: [...newPath],
        action: 'visit'
      });
      
      if (node.value === target) {
        path.push(...newPath);
        return true;
      }
      
      // Search both left and right subtrees for complete tree search
      const foundInLeft = search(node.left, newPath);
      if (foundInLeft) {
        path.push(...newPath);
        return true;
      }
      
      const foundInRight = search(node.right, newPath);
      if (foundInRight) {
        path.push(...newPath);
        return true;
      }
      
      steps.push({
        node: node.value,
        path: [...newPath],
        action: 'backtrack'
      });
      
      return false;
    };
    
    const found = search(root, []);
    return { found, path, steps };
  }

  // BST search (optimized for BST properties)
  static bstSearchWithSteps(root, target) {
    const steps = [];
    const path = [];
    
    const search = (node, currentPath) => {
      if (!node) return false;
      
      const newPath = [...currentPath, node.value];
      steps.push({
        node: node.value,
        path: [...newPath],
        action: 'visit'
      });
      
      if (node.value === target) {
        path.push(...newPath);
        return true;
      }
      
      // BST optimization: only search relevant subtree
      if (target < node.value) {
        const found = search(node.left, newPath);
        if (found) {
          path.push(...newPath);
          return true;
        }
      } else {
        const found = search(node.right, newPath);
        if (found) {
          path.push(...newPath);
          return true;
        }
      }
      
      return false;
    };
    
    const found = search(root, []);
    return { found, path, steps };
  }

  // In-order traversal: Left -> Root -> Right
  static inorderTraversalWithSteps(root) {
    const values = [];
    const steps = [];
    
    const traverse = (node, path = []) => {
      if (!node) return;
      
      const currentPath = [...path, node.value];
      
      // Visit node
      steps.push({
        node: node.value,
        path: [...currentPath],
        action: 'visit'
      });
      
      // Traverse left subtree
      traverse(node.left, currentPath);
      
      // Process current node (in-order position)
      values.push(node.value);
      steps.push({
        node: node.value,
        path: [...currentPath],
        action: 'process'
      });
      
      // Traverse right subtree
      traverse(node.right, currentPath);
    };
    
    traverse(root);
    return { values, steps };
  }

  // Pre-order traversal: Root -> Left -> Right
  static preorderTraversalWithSteps(root) {
    const values = [];
    const steps = [];
    
    const traverse = (node, path = []) => {
      if (!node) return;
      
      const currentPath = [...path, node.value];
      
      // Process current node first (pre-order)
      values.push(node.value);
      steps.push({
        node: node.value,
        path: [...currentPath],
        action: 'process'
      });
      
      // Traverse left subtree
      traverse(node.left, currentPath);
      
      // Traverse right subtree
      traverse(node.right, currentPath);
    };
    
    traverse(root);
    return { values, steps };
  }

  // Post-order traversal: Left -> Right -> Root
  static postorderTraversalWithSteps(root) {
    const values = [];
    const steps = [];
    
    const traverse = (node, path = []) => {
      if (!node) return;
      
      const currentPath = [...path, node.value];
      
      // Visit node
      steps.push({
        node: node.value,
        path: [...currentPath],
        action: 'visit'
      });
      
      // Traverse left subtree
      traverse(node.left, currentPath);
      
      // Traverse right subtree
      traverse(node.right, currentPath);
      
      // Process current node last (post-order)
      values.push(node.value);
      steps.push({
        node: node.value,
        path: [...currentPath],
        action: 'process'
      });
    };
    
    traverse(root);
    return { values, steps };
  }

  // DFS traversal with path highlighting
  static dfsTraversalWithSteps(root) {
    const values = [];
    const steps = [];
    
    const dfs = (node, path = []) => {
      if (!node) return;
      
      const currentPath = [...path, node.value];
      
      // Visit and process node
      values.push(node.value);
      steps.push({
        node: node.value,
        path: [...currentPath],
        action: 'process'
      });
      
      // DFS left subtree
      dfs(node.left, currentPath);
      
      // DFS right subtree
      dfs(node.right, currentPath);
      
      // Backtrack
      steps.push({
        node: node.value,
        path: [...currentPath],
        action: 'backtrack'
      });
    };
    
    dfs(root);
    return { values, steps };
  }

  // BFS traversal with path highlighting
  static bfsTraversalWithSteps(root) {
    if (!root) return { values: [], steps: [] };
    
    const values = [];
    const steps = [];
    const queue = [{ node: root, path: [root.value] }];
    
    while (queue.length > 0) {
      const { node, path } = queue.shift();
      
      // Process current node
      values.push(node.value);
      steps.push({
        node: node.value,
        path: [...path],
        action: 'process'
      });
      
      // Add children to queue
      if (node.left) {
        const leftPath = [...path, node.left.value];
        queue.push({ node: node.left, path: leftPath });
        steps.push({
          node: node.left.value,
          path: leftPath,
          action: 'visit'
        });
      }
      
      if (node.right) {
        const rightPath = [...path, node.right.value];
        queue.push({ node: node.right, path: rightPath });
        steps.push({
          node: node.right.value,
          path: rightPath,
          action: 'visit'
        });
      }
    }
    
    return { values, steps };
  }

  // Calculate tree statistics
  static getTreeStats(root) {
    if (!root) {
      return {
        height: 0,
        nodeCount: 0,
        leafCount: 0,
        isBalanced: true,
        isValidBST: true
      };
    }

    const getHeight = (node) => {
      if (!node) return 0;
      return 1 + Math.max(getHeight(node.left), getHeight(node.right));
    };

    const countNodes = (node) => {
      if (!node) return 0;
      return 1 + countNodes(node.left) + countNodes(node.right);
    };

    const countLeaves = (node) => {
      if (!node) return 0;
      if (!node.left && !node.right) return 1;
      return countLeaves(node.left) + countLeaves(node.right);
    };

    const isBalanced = (node) => {
      if (!node) return true;
      
      const leftHeight = getHeight(node.left);
      const rightHeight = getHeight(node.right);
      
      return Math.abs(leftHeight - rightHeight) <= 1 && 
             isBalanced(node.left) && 
             isBalanced(node.right);
    };

    const isValidBST = (node, min = null, max = null) => {
      if (!node) return true;
      
      if ((min !== null && node.value <= min) || (max !== null && node.value >= max)) {
        return false;
      }
      
      return isValidBST(node.left, min, node.value) && 
             isValidBST(node.right, node.value, max);
    };

    return {
      height: getHeight(root),
      nodeCount: countNodes(root),
      leafCount: countLeaves(root),
      isBalanced: isBalanced(root),
      isValidBST: isValidBST(root)
    };
  }
}