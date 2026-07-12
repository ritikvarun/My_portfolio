const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');

// @desc    Redirect to the CV/Resume URL (simple fallback)
// @route   GET /api/download-cv
// @access  Public
router.get('/', async (req, res) => {
  try {
    const settings = await Settings.findOne();
    if (!settings || !settings.resumeUrl) {
      return res.status(404).json({ message: 'No CV uploaded yet.' });
    }
    // Simply redirect to the stored URL
    res.redirect(settings.resumeUrl);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
