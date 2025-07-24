const API_BASE_URL = 'http://localhost:5001/api';

export class ApiService {
  static async saveTree(name, treeData, algorithm) {
    try {
      const response = await fetch(`${API_BASE_URL}/trees`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, treeData, algorithm }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Save tree error:', error);
      throw new Error(`Failed to save tree: ${error.message}`);
    }
  }

  static async loadTrees() {
    try {
      const response = await fetch(`${API_BASE_URL}/trees`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Load trees error:', error);
      throw new Error(`Failed to load trees: ${error.message}`);
    }
  }

  static async loadTree(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/trees/${id}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Load tree error:', error);
      throw new Error(`Failed to load tree: ${error.message}`);
    }
  }

  static async deleteTree(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/trees/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Delete tree error:', error);
      throw new Error(`Failed to delete tree: ${error.message}`);
    }
  }
}