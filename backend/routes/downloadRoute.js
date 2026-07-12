const express = require('express');
const router = express.Router();
const https = require('https');
const http = require('http');
const Settings = require('../models/Settings');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Extract Cloudinary public_id from a raw upload URL
function extractPublicId(url) {
  // https://res.cloudinary.com/{cloud}/raw/upload/v{version}/{folder}/{file.ext}
  const match = url.match(/\/raw\/upload\/(?:v\d+\/)?(.+)$/);
  return match ? match[1] : null;
}

// Fetch URL and pipe to response, following redirects
function fetchAndPipe(url, res, redirectCount) {
  if (redirectCount > 10) {
    if (!res.headersSent) res.status(500).json({ message: 'Too many redirects' });
    return;
  }

  let urlObj;
  try { urlObj = new URL(url); } catch (e) {
    if (!res.headersSent) res.status(500).json({ message: 'Invalid URL: ' + url });
    return;
  }

  const protocol = url.startsWith('https') ? https : http;

  const reqOptions = {
    hostname: urlObj.hostname,
    path: urlObj.pathname + urlObj.search,
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; PortfolioServer/1.0)',
      'Accept': 'application/pdf,*/*'
    }
  };

  protocol.get(reqOptions, (fileRes) => {
    const { statusCode, headers } = fileRes;

    // Follow redirects
    if ([301, 302, 307, 308].includes(statusCode)) {
      fileRes.resume();
      const location = headers.location;
      if (!location) {
        if (!res.headersSent) res.status(500).json({ message: 'Redirect missing location' });
        return;
      }
      return fetchAndPipe(location, res, redirectCount + 1);
    }

    if (statusCode !== 200) {
      fileRes.resume();
      if (!res.headersSent) res.status(statusCode).json({ message: `Upstream returned ${statusCode}` });
      return;
    }

    // Stream the file to browser as a download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="Ritik_Varun_CV.pdf"');
    if (headers['content-length']) res.setHeader('Content-Length', headers['content-length']);
    fileRes.pipe(res);

  }).on('error', (err) => {
    console.error('Proxy fetch error:', err.message);
    if (!res.headersSent) res.status(500).json({ message: 'Fetch failed: ' + err.message });
  });
}

// @desc    Download CV/Resume PDF
// @route   GET /api/download-cv
// @access  Public
router.get('/', async (req, res) => {
  try {
    const settings = await Settings.findOne();
    if (!settings || !settings.resumeUrl) {
      return res.status(404).json({ message: 'No CV uploaded yet. Please upload from admin panel.' });
    }

    const fileUrl = settings.resumeUrl;

    // Local file — serve directly
    if (!fileUrl.startsWith('http')) {
      return res.download(fileUrl, 'Ritik_Varun_CV.pdf');
    }

    // Cloudinary raw URL — generate a signed URL so the backend can fetch it
    if (fileUrl.includes('res.cloudinary.com')) {
      const publicId = extractPublicId(fileUrl);
      if (publicId) {
        const signedUrl = cloudinary.url(publicId, {
          resource_type: 'raw',
          type: 'upload',
          sign_url: true,
          secure: true
        });
        console.log('Fetching signed Cloudinary URL for publicId:', publicId);
        return fetchAndPipe(signedUrl, res, 0);
      }
    }

    // Fallback for any other URL
    fetchAndPipe(fileUrl, res, 0);

  } catch (error) {
    console.error('Download CV error:', error.message);
    if (!res.headersSent) res.status(500).json({ message: error.message });
  }
});

module.exports = router;


