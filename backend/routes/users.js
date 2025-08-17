// routes/users.js
const express = require('express');
const User = require('../models/User');
const { auth } = require('../utils/middleware');

const router = express.Router();

// GET all users
router.get('/', auth, async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});


router.put('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    const updatedUser = await user.save();
    res.json({ message: 'User updated', user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: 'Error updating user' });
  }
});

module.exports = router;
