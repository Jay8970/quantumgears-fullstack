const express = require('express');
const User = require('../models/User');
const Order = require('../models/Order');
const { auth } = require('../utils/middleware');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const orders = await Order.find();

    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

    const ordersByStatus = orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {});

    res.json({
      totalUsers,
      totalOrders,
      totalRevenue,
      ordersByStatus,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch analytics' });
  }
});

module.exports = router;
