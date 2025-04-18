const Category = require('../models/categoryModel');

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message
    });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Category name is required'
      });
    }

    const categoryId = await Category.create({
      name,
      description
    });

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: { id: categoryId }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating category',
      error: error.message
    });
  }
}; 