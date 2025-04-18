const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().min(0).required(),
  category: Joi.string().required(),
  image: Joi.string().uri().required()
});

const cartSchema = Joi.object({
  productId: Joi.string().required(),
  quantity: Joi.number().min(1).default(1)
});

const categorySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required()
});

exports.validateProduct = (req, res, next) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }
  next();
};

exports.validateCart = (req, res, next) => {
  const { error } = cartSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }
  next();
};

exports.validateCategory = (req, res, next) => {
  const { error } = categorySchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }
  next();
}; 