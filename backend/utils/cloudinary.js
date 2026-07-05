const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Uploads a local file to Cloudinary and deletes the local file afterwards.
 * Falls back to local URL if Cloudinary is not configured.
 * @param {string} localFilePath 
 * @param {string} folder 
 * @returns {Promise<string>} File URL
 */
const uploadToCloudinary = async (localFilePath, folder = 'portfolio') => {
  try {
    // Check if Cloudinary is configured (not empty and not using default placeholder values)
    const isCloudinaryConfigured = 
      process.env.CLOUDINARY_CLOUD_NAME && 
      process.env.CLOUDINARY_CLOUD_NAME !== 'your_cloudinary_cloud_name' &&
      process.env.CLOUDINARY_API_KEY && 
      process.env.CLOUDINARY_API_KEY !== 'your_cloudinary_api_key' &&
      process.env.CLOUDINARY_API_SECRET && 
      process.env.CLOUDINARY_API_SECRET !== 'your_cloudinary_api_secret';

    if (!isCloudinaryConfigured) {
      console.warn('Cloudinary credentials missing or default placeholder, falling back to local storage.');
      // Return local relative path
      const filename = localFilePath.split(/[\\/]/).pop();
      return `/uploads/${filename}`;
    }

    const ext = path.extname(localFilePath).toLowerCase();
    const isPdf = ext === '.pdf';
    const resourceType = isPdf ? 'raw' : 'auto';

    const uploadOptions = {
      folder: folder,
      resource_type: resourceType // raw for PDFs, auto for images
    };

    if (isPdf) {
      const filename = localFilePath.split(/[\\/]/).pop();
      uploadOptions.headers = `Content-Disposition: attachment; filename="${filename}"`;
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(localFilePath, uploadOptions);

    // Delete local file after successful upload
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return result.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    // Even on error, clean up local file if it exists to avoid leakage
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    throw error;
  }
};

module.exports = { uploadToCloudinary };
