// config/database.js
const { MongoClient } = require('mongodb');
require('dotenv').config();

class Database {
  constructor() {
    this.client = null;
    this.db = null;
  }

  // Connect to MongoDB
  async connect() {
    if (this.db) return this.db; // already connected

    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error("❌ MONGODB_URI not found in .env");

    this.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await this.client.connect();

    this.db = this.client.db('binary-tree-visualizer');
    console.log('✅ Connected to MongoDB Atlas');
    return this.db;
  }

  // Get a collection
  getCollection(name) {
    if (!this.db) throw new Error("Database not connected. Call connect() first.");
    return this.db.collection(name);
  }

  // Disconnect from MongoDB
  async disconnect() {
    if (this.client) {
      await this.client.close();
      console.log('📴 Disconnected from MongoDB');
    }
  }
}

module.exports = new Database();
