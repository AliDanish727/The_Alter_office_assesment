const Product = require('../models/productModel');

exports.getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, minPrice, maxPrice, sort } = req.query;
    
    const filters = {};
    if (category) filters.category = Array.isArray(category) ? category : [category];
    if (minPrice) filters.minPrice = minPrice;
    if (maxPrice) filters.maxPrice = maxPrice;

    let sortOption = { createdAt: -1 };
    if (sort === 'price_asc') sortOption = { price: 1 };
    if (sort === 'price_desc') sortOption = { price: -1 };

    const result = await Product.findAll(filters, parseInt(page), parseInt(limit), sortOption);
    
    res.json({
      success: true,
      data: result.products,
      pagination: {
        total: result.total,
        page: result.page,
        totalPages: result.totalPages
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching product',
      error: error.message
    });
  }
}; 