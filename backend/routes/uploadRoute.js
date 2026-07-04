const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { uploadToCloudinary } = require('../utils/cloudinary');

// @desc    Upload file (image / PDF)
// @route   POST /api/upload
// @access  Private/Admin
router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a file' });
    }

    const fileUrl = await uploadToCloudinary(req.file.path);
    res.json({
      success: true,
      fileUrl: fileUrl
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
