const { getDB } = require('../utils/db');

class Product {
  static collection() {
    return getDB().collection('products');
  }

  static async findAll(filters = {}, page = 1, limit = 10, sort = { createdAt: -1 }) {
    const skip = (page - 1) * limit;
    
    const query = {};
    
    if (filters.category) {
      query.category = { $in: filters.category };
    }
    
    if (filters.minPrice || filters.maxPrice) {
      query.price = {};
      if (filters.minPrice) query.price.$gte = Number(filters.minPrice);
      if (filters.maxPrice) query.price.$lte = Number(filters.maxPrice);
    }

    const [products, total] = await Promise.all([
      this.collection()
        .find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .toArray(),
      this.collection().countDocuments(query)
    ]);

    return {
      products,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  }

  static async findById(id) {
    return this.collection().findOne({ _id: id });
  }

  static async create(product) {
    const result = await this.collection().insertOne({
      ...product,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return result.insertedId;
  }
}

module.exports = Product; 