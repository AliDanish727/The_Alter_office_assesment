const { getDB } = require('../utils/db');

class Category {
  static collection() {
    return getDB().collection('categories');
  }

  static async findAll() {
    return this.collection().find().toArray();
  }

  static async create(category) {
    const result = await this.collection().insertOne({
      ...category,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return result.insertedId;
  }
}

module.exports = Category; 