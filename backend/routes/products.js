const express = require('express');
const Product = require('../models/Product');
const { auth, isAdmin } = require('../utils/middleware');

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new product
router.post('/', auth, isAdmin, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: 'Error saving product' });
  }
});

// **Add this PUT route to update existing product**
router.put('/:id', auth,  async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Update product fields from req.body
    Object.assign(product, req.body);

    await product.save();
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update product' });
  }
});

module.exports = router;
