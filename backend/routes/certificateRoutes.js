const express = require('express');
const router = express.Router();
const Certificate = require('../models/Certificate');
const { protect } = require('../middleware/auth');

// @desc    Get all certificates
// @route   GET /api/certificates
// @access  Public
router.get('/', async (req, res) => {
  try {
    const certificates = await Certificate.find({});
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create a certificate
// @route   POST /api/certificates
// @access  Private/Admin
router.post('/', protect, async (req, res) => {
  const { title, issuer, image, link } = req.body;

  try {
    if (!title || !issuer || !image) {
      return res.status(400).json({ message: 'Title, issuer and image are required' });
    }

    const certificate = new Certificate({
      title,
      issuer,
      image,
      link: link || ''
    });

    const createdCertificate = await certificate.save();
    res.status(201).json(createdCertificate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete a certificate
// @route   DELETE /api/certificates/:id
// @access  Private/Admin
router.delete('/:id', protect, async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);

    if (certificate) {
      await Certificate.deleteOne({ _id: req.params.id });
      res.json({ message: 'Certificate removed' });
    } else {
      res.status(404).json({ message: 'Certificate not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
