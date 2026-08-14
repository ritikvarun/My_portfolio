const express = require('express');
const router = express.Router();

// @desc    Redirect to the CV/Resume static file
// @route   GET /api/download-cv
// @access  Public
router.get('/', (req, res) => {
  res.redirect('/RItik.pdf');
});

module.exports = router;
