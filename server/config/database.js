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
      if (!uri) throw new Error('MONGODB_URI is not defined in .env');

      this.client = new MongoClient(uri); // Modern usage
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
