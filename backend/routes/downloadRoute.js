const express = require('express');
const router = express.Router();
const https = require('https');
const http = require('http');
const Settings = require('../models/Settings');

// Helper that follows redirects before piping the PDF
function fetchAndPipe(url, res, redirectCount) {
  if (redirectCount > 10) {
    if (!res.headersSent) res.status(500).json({ message: 'Too many redirects' });
    return;
  }

  const protocol = url.startsWith('https') ? https : http;

  protocol.get(url, (fileRes) => {
    const { statusCode, headers } = fileRes;

    // Follow 301 / 302 / 307 / 308 redirects
    if ([301, 302, 307, 308].includes(statusCode)) {
      const location = headers.location;
      fileRes.resume(); // discard redirect body
      if (!location) {
        res.status(500).json({ message: 'Redirect with no location header' });
        return;
      }
      return fetchAndPipe(location, res, redirectCount + 1);
    }

    if (statusCode !== 200) {
      fileRes.resume();
      if (!res.headersSent) {
        res.status(statusCode).json({ message: `Upstream returned ${statusCode}` });
      }
      return;
    }

    // Success — stream the file to the browser as a download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="Ritik_Varun_CV.pdf"');
    if (headers['content-length']) {
      res.setHeader('Content-Length', headers['content-length']);
    }
    fileRes.pipe(res);

  }).on('error', (err) => {
    console.error('Proxy fetch error:', err.message);
    if (!res.headersSent) {
      res.status(500).json({ message: 'Failed to fetch file: ' + err.message });
    }
  });
}

// @desc    Proxy download the CV/Resume PDF
// @route   GET /api/download-cv
// @access  Public
router.get('/', async (req, res) => {
  try {
    const settings = await Settings.findOne();
    if (!settings || !settings.resumeUrl) {
      return res.status(404).json({ message: 'Resume not set. Please upload a CV from the admin panel.' });
    }

    const fileUrl = settings.resumeUrl;

    // Local/relative path — serve directly from static files
    if (!fileUrl.startsWith('http')) {
      return res.download(fileUrl, 'Ritik_Varun_CV.pdf');
    }

    fetchAndPipe(fileUrl, res, 0);

  } catch (error) {
    console.error('Download CV error:', error.message);
    if (!res.headersSent) res.status(500).json({ message: error.message });
  }
});

module.exports = router;

