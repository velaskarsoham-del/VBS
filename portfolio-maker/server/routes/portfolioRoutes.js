const express = require('express');
const router = express.Router();
const {
  getUserPortfolio,
  updateUserPortfolio,
  uploadAvatar,
  togglePublishStatus,
  getPublicPortfolio,
  getAiInsights
} = require('../controllers/portfolioController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Public route to fetch portfolio by username
router.get('/public/:username', getPublicPortfolio);

// Protected routes
router.get('/', protect, getUserPortfolio);
router.put('/', protect, updateUserPortfolio);
router.post('/upload-avatar', protect, upload.single('avatar'), uploadAvatar);
router.put('/publish', protect, togglePublishStatus);
router.get('/ai-insights', protect, getAiInsights);

module.exports = router;

