const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

exports.getCart = async (req, res) => {
  try {
    const userId = req.user?.id || 'guest'; // For demo, using guest user
    const cart = await Cart.getCart(userId);
    
    if (!cart) {
      return res.json({
        success: true,
        data: { items: [] }
      });
    }

    // Get product details for each item in cart
    const itemsWithDetails = await Promise.all(
      cart.items.map(async (item) => {
        const product = await Product.findById(item.productId);
        return {
          ...item,
          product: product
        };
      })
    );

    res.json({
      success: true,
      data: {
        items: itemsWithDetails
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching cart',
      error: error.message
    });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user?.id || 'guest';

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required'
      });
    }

    await Cart.addToCart(userId, productId, quantity);

    res.json({
      success: true,
      message: 'Product added to cart successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding to cart',
      error: error.message
    });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user?.id || 'guest';

    await Cart.removeFromCart(userId, productId);

    res.json({
      success: true,
      message: 'Product removed from cart successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error removing from cart',
      error: error.message
    });
  }
}; 