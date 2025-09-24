const { MongoClient } = require('mongodb');
require('dotenv').config();

class Database {
  constructor() {
    this.client = null;
    this.db = null;
  }

  async connect() {
    try {
      const uri = process.env.MONGODB_URI;
      if (!uri) {
        throw new Error('❌ MONGODB_URI is not set in environment variables');
      }

      if (this.db) {
        console.log('⚡ Using existing MongoDB connection');
        return this.db;
      }

      this.client = new MongoClient(uri);
      await this.client.connect();
      this.db = this.client.db('binary-tree-visualizer');

      console.log('✅ Connected to MongoDB Atlas');
      return this.db;
    } catch (error) {
      console.error('❌ MongoDB connection error:', error);
      throw error;
    }
  }

  async disconnect() {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.db = null;
      console.log('📴 Disconnected from MongoDB');
    }
  }

  getDb() {
    if (!this.db) {
      throw new Error('Database not connected. Call connect() first.');
    }
    return this.db;
  }

  getCollection(name) {
    return this.getDb().collection(name);
  }
}

module.exports = new Database();
