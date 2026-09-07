const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// @desc    Download or redirect to the latest Resume static file
// @route   GET /api/download-cv
// @access  Public
router.get('/', (req, res) => {
  const possiblePaths = [
    path.join(__dirname, '../../frontend/public/Ritik.pdf'),
    path.join(__dirname, '../../frontend/public/RItik.pdf'),
    path.join(__dirname, '../uploads/Ritik.pdf'),
    path.join(__dirname, '../uploads/resume.pdf')
  ];

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      return res.download(p, 'Ritik_Varun_Resume.pdf');
    }
  }

  return res.redirect('https://www.ritikvarun.me/Ritik.pdf');
});

module.exports = router;

