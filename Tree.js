const { ObjectId } = require('mongodb');
const database = require('../config/database');

class TreeModel {
  constructor() {
    this.collectionName = 'trees';
  }

  getCollection() {
    return database.getCollection(this.collectionName);
  }

  async create(treeData) {
    const collection = this.getCollection();
    const tree = {
      ...treeData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await collection.insertOne(tree);
    return { ...tree, _id: result.insertedId };
  }

  async findAll(userId = 'anonymous') {
    const collection = this.getCollection();
    return await collection
      .find({ userId })
      .sort({ createdAt: -1 })
      .toArray();
  }

  async findById(id) {
    const collection = this.getCollection();
    return await collection.findOne({ _id: new ObjectId(id) });
  }

  async update(id, updateData) {
    const collection = this.getCollection();
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: { 
          ...updateData, 
          updatedAt: new Date() 
        } 
      }
    );
    
    if (result.matchedCount === 0) {
      throw new Error('Tree not found');
    }
    
    return await this.findById(id);
  }

  async delete(id) {
    const collection = this.getCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      throw new Error('Tree not found');
    }
    
    return { success: true };
  }

  async deleteAll(userId = 'anonymous') {
    const collection = this.getCollection();
    return await collection.deleteMany({ userId });
  }
}

module.exports = new TreeModel();