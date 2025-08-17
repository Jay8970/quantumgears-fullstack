// routes/dashboard.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Order = require('../models/Order');
const { auth } = require('../utils/middleware'); // JWT middleware

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 }).limit(5);

    res.json({
      user: {
        name: user.name,
        email: user.email,
        memberSince: user.createdAt,
      },
      orders,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
