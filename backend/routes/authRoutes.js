const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const { protect } = require('../middleware/auth');

// @desc    Auth admin & get token
// @route   POST /api/auth/adminlogin
// @access  Public
router.post('/auth/adminlogin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (admin && (await admin.matchPassword(password))) {
      const token = jwt.sign(
        { id: admin._id },
        process.env.JWT_SECRET || 'secret123',
        { expiresIn: '30d' }
      );

      res.json({
        success: true,
        token,
        email: admin.email
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get admin profile
// @route   GET /api/user/getadmin
// @access  Private
router.get('/user/getadmin', protect, async (req, res) => {
  try {
    res.json({
      _id: req.user._id,
      email: req.user.email
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
