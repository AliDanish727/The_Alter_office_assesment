const { getDB } = require('../utils/db');

class Cart {
  static collection() {
    return getDB().collection('carts');
  }

  static async getCart(userId) {
    return this.collection().findOne({ userId });
  }

  static async addToCart(userId, productId, quantity = 1) {
    const cart = await this.getCart(userId);
    
    if (!cart) {
      return this.collection().insertOne({
        userId,
        items: [{ productId, quantity }],
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    const existingItem = cart.items.find(item => item.productId === productId);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    return this.collection().updateOne(
      { userId },
      { 
        $set: { 
          items: cart.items,
          updatedAt: new Date()
        }
      }
    );
  }

  static async removeFromCart(userId, productId) {
    const cart = await this.getCart(userId);
    
    if (!cart) {
      return null;
    }

    cart.items = cart.items.filter(item => item.productId !== productId);

    return this.collection().updateOne(
      { userId },
      { 
        $set: { 
          items: cart.items,
          updatedAt: new Date()
        }
      }
    );
  }
}

module.exports = Cart; 