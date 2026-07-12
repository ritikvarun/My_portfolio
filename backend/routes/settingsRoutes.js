const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { uploadToCloudinary } = require('../utils/cloudinary');

// @desc    Get portfolio settings
// @route   GET /api/settings
// @access  Public
router.get('/', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      // Create default if none exists
      settings = await Settings.create({});
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Update portfolio settings
// @route   POST /api/settings
// @access  Private/Admin
router.post('/', protect, async (req, res) => {
  const {
    developerName,
    developerTitle,
    bio,
    aboutQuote,
    contactEmail,
    contactPhone,
    contactAddress,
    githubUrl,
    linkedinUrl,
    instagramUrl,
    resumeUrl,
    profileImage,
    aboutImage,
    whatsappUrl,
    aboutBio
  } = req.body;

  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings({});
    }

    settings.developerName = developerName !== undefined ? developerName : settings.developerName;
    settings.developerTitle = developerTitle !== undefined ? developerTitle : settings.developerTitle;
    settings.bio = bio !== undefined ? bio : settings.bio;
    settings.aboutQuote = aboutQuote !== undefined ? aboutQuote : settings.aboutQuote;
    settings.contactEmail = contactEmail !== undefined ? contactEmail : settings.contactEmail;
    settings.contactPhone = contactPhone !== undefined ? contactPhone : settings.contactPhone;
    settings.contactAddress = contactAddress !== undefined ? contactAddress : settings.contactAddress;
    settings.githubUrl = githubUrl !== undefined ? githubUrl : settings.githubUrl;
    settings.linkedinUrl = linkedinUrl !== undefined ? linkedinUrl : settings.linkedinUrl;
    settings.instagramUrl = instagramUrl !== undefined ? instagramUrl : settings.instagramUrl;
    settings.resumeUrl = resumeUrl !== undefined ? resumeUrl : settings.resumeUrl;
    settings.profileImage = profileImage !== undefined ? profileImage : settings.profileImage;
    settings.aboutImage = aboutImage !== undefined ? aboutImage : settings.aboutImage;
    settings.whatsappUrl = whatsappUrl !== undefined ? whatsappUrl : settings.whatsappUrl;
    settings.aboutBio = aboutBio !== undefined ? aboutBio : settings.aboutBio;

    const updatedSettings = await settings.save();
    res.json({ success: true, settings: updatedSettings });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Upload about/profile photo or resume CV
// @route   POST /api/settings/upload-file
// @access  Private/Admin
router.post('/upload-file', protect, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const fileUrl = await uploadToCloudinary(req.file.path);
    res.json({ success: true, fileUrl });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Legacy endpoint mapping for the old admin setting about-photo route
router.post('/about-photo', protect, upload.single('photo'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No photo uploaded' });
    }
    const fileUrl = await uploadToCloudinary(req.file.path);
    res.json({ success: true, aboutPhoto: fileUrl });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
