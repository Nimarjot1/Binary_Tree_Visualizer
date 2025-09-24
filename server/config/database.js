const { MongoClient } = require('mongodb');
require('dotenv').config();

class Database {
  constructor() {
    this.client = null;
    this.db = null;
  }

  async connect() {
    if (this.db) return this.db;

    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error('MONGODB_URI is not set in .env');

    this.client = new MongoClient(uri);
    await this.client.connect();
    this.db = this.client.db('binary-tree-visualizer');
    console.log('Connected to MongoDB');
    return this.db;
  }

  async disconnect() {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.db = null;
      console.log('Disconnected from MongoDB');
    }
  }

  getDb() {
    if (!this.db) throw new Error('Database not connected');
    return this.db;
  }

  getCollection(name) {
    return this.getDb().collection(name);
  }
}

module.exports = new Database();
