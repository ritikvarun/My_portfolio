const path = require('path');
const fs = require('fs');

// @desc    Download or redirect to the latest Resume static file
// @route   GET /api/download-cv
// @access  Public
router.get('/', (req, res) => {
  const filePath = path.join(__dirname, '../../frontend/public/Ritik.pdf');
  if (fs.existsSync(filePath)) {
    return res.download(filePath, 'Ritik_Varun_Resume.pdf');
  }
  return res.redirect('https://www.ritikvarun.me/Ritik.pdf');
});

module.exports = router;
