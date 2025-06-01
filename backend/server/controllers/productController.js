/* eslint-disable camelcase */
const Product = require('../models/Product')

// Create a new product
module.exports.addProduct_post = async (req, res) => {
  const { name, description, category, price, id } = req.body
  const picture = req.file ? 'http://localhost:5000/' + req.file.path : ''
  try {
    const user_id = id
    const product = await Product.create({ name, description, category, price, picture, user_id })
    res.status(201).json(product)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Get all products
module.exports.allProducts_get = async (req, res) => {
  try {
    const products = await Product.findAll({
      order: [['createdAt', 'DESC']]
    })
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Get products by category
module.exports.productsByCategory_get = async (req, res) => {
  const { category } = req.params
  try {
    const products = await Product.findAll({
      where: { category },
      order: [['createdAt', 'DESC']]
    })
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Get a specific product by ID
module.exports.product_get = async (req, res) => {
  const { id } = req.params
  try {
    const product = await Product.findByPk(id)
    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Update a specific product
module.exports.updateProduct_post = async (req, res) => {
  try {
    const productId = req.params.id;
    
    // Find the product first
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Update the picture if a file was uploaded
    if (req.file) {
      product.picture = 'http://localhost:5000/' + req.file.path;
    }
    
    // Handle form data fields
    if (req.body.name) product.name = req.body.name;
    if (req.body.description) product.description = req.body.description;
    if (req.body.category) product.category = req.body.category;
    if (req.body.price !== undefined) product.price = req.body.price;

    // Update timestamp and save
    product.updatedAt = new Date();
    await product.save();
    
    // Return the updated product
    res.status(200).json(product);
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ error: err.message });
  }
}

// Delete a specific product
module.exports.deleteProduct_post = async (req, res) => {
  try {
    const productId = req.params.id;
    
    // Find the product first
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Delete the product
    await product.destroy();
    
    // Return success message
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ error: err.message });
  }
}
