const express = require('express');
const Order = require('../models/Order');
const { auth } = require('../utils/middleware');

const router = express.Router();

// Create order
router.post('/', auth, async (req, res) => {
  const order = new Order({ ...req.body, user: req.user.id });
  await order.save();
  res.json(order);
});

// Get all orders (for admin or authenticated users)
router.get('/', auth, async (req, res) => {
  const orders = await Order.find().populate('user', 'name email');
  res.json(orders);
});

// **Add this PUT route for updating order status**
router.put('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = status;
    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update order status' });
  }
});

module.exports = router;
