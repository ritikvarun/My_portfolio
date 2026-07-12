const express = require('express');
const router = express.Router();
const https = require('https');
const http = require('http');
const Settings = require('../models/Settings');

// @desc    Proxy download the CV/Resume PDF so browser downloads instead of navigating
// @route   GET /api/download-cv
// @access  Public
router.get('/', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings || !settings.resumeUrl) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    const fileUrl = settings.resumeUrl;

    // If it's a relative/local path, redirect directly
    if (!fileUrl.startsWith('http')) {
      return res.redirect(fileUrl);
    }

    // Fetch the file from Cloudinary and pipe it back with download headers
    const protocol = fileUrl.startsWith('https') ? https : http;

    protocol.get(fileUrl, (fileRes) => {
      const contentType = fileRes.headers['content-type'] || 'application/pdf';
      res.setHeader('Content-Type', contentType);
      res.setHeader('Content-Disposition', 'attachment; filename="Ritik_Varun_CV.pdf"');
      if (fileRes.headers['content-length']) {
        res.setHeader('Content-Length', fileRes.headers['content-length']);
      }
      fileRes.pipe(res);
    }).on('error', (err) => {
      console.error('Proxy download error:', err.message);
      res.status(500).json({ message: 'Failed to download file' });
    });

  } catch (error) {
    console.error('Download CV error:', error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
