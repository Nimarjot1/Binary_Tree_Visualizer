import { TreeAlgorithms } from './treeAlgorithms.js';

export class BinaryTreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  // BST Insert (maintains BST properties)
  insert(value) {
    if (this.root === null) {
      this.root = new BinaryTreeNode(value);
      return;
    }
    this.insertNode(this.root, value);
  }

  insertNode(node, value) {
    if (value < node.value) {
      if (node.left === null) {
        node.left = new BinaryTreeNode(value);
      } else {
        this.insertNode(node.left, value);
      }
    } else if (value > node.value) {
      if (node.right === null) {
        node.right = new BinaryTreeNode(value);
      } else {
        this.insertNode(node.right, value);
      }
    }
  }

  // Manual insert (allows any position)
  insertManual(value, parentValue, side) {
    if (this.root === null) {
      this.root = new BinaryTreeNode(value);
      return true;
    }

    const parentNode = this.findNode(this.root, parentValue);
    if (!parentNode) return false;

    if (side === 'left') {
      if (parentNode.left === null) {
        parentNode.left = new BinaryTreeNode(value);
        return true;
      }
      return false;
    } else {
      if (parentNode.right === null) {
        parentNode.right = new BinaryTreeNode(value);
        return true;
      }
      return false;
    }
  }

  findNode(node, value) {
    if (node === null) return null;
    if (node.value === value) return node;
    
    const leftResult = this.findNode(node.left, value);
    if (leftResult) return leftResult;
    
    return this.findNode(node.right, value);
  }

  // Delete node
  delete(value) {
    this.root = this.deleteNode(this.root, value);
    return this.root !== null;
  }

  deleteNode(node, value) {
    if (node === null) return null;

    if (value < node.value) {
      node.left = this.deleteNode(node.left, value);
    } else if (value > node.value) {
      node.right = this.deleteNode(node.right, value);
    } else {
      // Node to be deleted found
      if (node.left === null && node.right === null) {
        return null;
      }
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;

      // Node with two children: Get the inorder successor (smallest in the right subtree)
      const minNode = this.findMin(node.right);
      node.value = minNode.value;
      node.right = this.deleteNode(node.right, minNode.value);
    }
    return node;
  }

  findMin(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  // Get available parents for manual insertion
  getAvailableParents() {
    const parents = [];
    this.collectAvailableParents(this.root, parents);
    return parents;
  }

  collectAvailableParents(node, parents) {
    if (node === null) return;
    
    const canInsertLeft = node.left === null;
    const canInsertRight = node.right === null;
    
    if (canInsertLeft || canInsertRight) {
      parents.push({
        value: node.value,
        canInsertLeft,
        canInsertRight
      });
    }
    
    this.collectAvailableParents(node.left, parents);
    this.collectAvailableParents(node.right, parents);
  }

  // Use TreeAlgorithms for all traversal operations
  searchWithSteps(value, useBSTOptimization = false) {
    return useBSTOptimization 
      ? TreeAlgorithms.bstSearchWithSteps(this.root, value)
      : TreeAlgorithms.searchWithSteps(this.root, value);
  }

  inorderTraversalWithSteps() {
    return TreeAlgorithms.inorderTraversalWithSteps(this.root);
  }

  preorderTraversalWithSteps() {
    return TreeAlgorithms.preorderTraversalWithSteps(this.root);
  }

  postorderTraversalWithSteps() {
    return TreeAlgorithms.postorderTraversalWithSteps(this.root);
  }

  dfsTraversalWithSteps() {
    return TreeAlgorithms.dfsTraversalWithSteps(this.root);
  }

  bfsTraversalWithSteps() {
    return TreeAlgorithms.bfsTraversalWithSteps(this.root);
  }

  getTreeStats() {
    return TreeAlgorithms.getTreeStats(this.root);
  }
}