const Portfolio = require('../models/Portfolio');
const User = require('../models/User');

// @desc    Get logged in user portfolio
// @route   GET /api/portfolio
// @access  Private
const getUserPortfolio = async (req, res, next) => {
  try {
    let portfolio = await Portfolio.findOne({ user: req.user.id });

    // If portfolio does not exist yet, create default empty portfolio
    if (!portfolio) {
      portfolio = await Portfolio.create({
        user: req.user.id,
        username: req.user.username,
        personalInfo: {
          fullName: req.user.name,
          email: req.user.email,
          title: 'Software Engineer',
          bio: 'Welcome to my portfolio!'
        }
      });
    }

    res.json({ success: true, portfolio });
  } catch (error) {
    next(error);
  }
};

// @desc    Save/Update user portfolio
// @route   PUT /api/portfolio
// @access  Private
const updateUserPortfolio = async (req, res, next) => {
  try {
    const portfolioData = req.body;

    let portfolio = await Portfolio.findOne({ user: req.user.id });

    if (!portfolio) {
      portfolio = new Portfolio({
        user: req.user.id,
        username: req.user.username,
        ...portfolioData
      });
    } else {
      // Retain user reference and username
      portfolioData.user = req.user.id;
      portfolioData.username = req.user.username;
      
      Object.assign(portfolio, portfolioData);
    }

    await portfolio.save();

    res.json({ success: true, message: 'Portfolio updated successfully', portfolio });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload profile picture
// @route   POST /api/portfolio/upload-avatar
// @access  Private
const uploadAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload an image file' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    let portfolio = await Portfolio.findOne({ user: req.user.id });
    if (portfolio) {
      portfolio.personalInfo.profileImage = imageUrl;
      await portfolio.save();
    }

    res.json({
      success: true,
      message: 'Profile image uploaded successfully',
      imageUrl
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle portfolio publish status
// @route   PUT /api/portfolio/publish
// @access  Private
const togglePublishStatus = async (req, res, next) => {
  try {
    let portfolio = await Portfolio.findOne({ user: req.user.id });

    if (!portfolio) {
      return res.status(404).json({ success: false, message: 'Portfolio not found' });
    }

    portfolio.published = typeof req.body.published === 'boolean' ? req.body.published : !portfolio.published;
    await portfolio.save();

    res.json({
      success: true,
      message: `Portfolio ${portfolio.published ? 'published' : 'unpublished'} successfully`,
      published: portfolio.published,
      publicUrl: `/portfolio/${portfolio.username}`
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get public portfolio by username
// @route   GET /api/portfolio/public/:username
// @access  Public
const getPublicPortfolio = async (req, res, next) => {
  try {
    const { username } = req.params;

    const portfolio = await Portfolio.findOne({
      username: username.toLowerCase().trim(),
      published: true
    });

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio not found or is currently private'
      });
    }

    res.json({ success: true, portfolio });
  } catch (error) {
    next(error);
  }
};

// @desc    Get AI Portfolio Insights & Recommendations
// @route   GET /api/portfolio/ai-insights
// @access  Private
const getAiInsights = async (req, res, next) => {
  try {
    const { analyzePortfolio } = require('../services/aiAssistant');
    let portfolio = await Portfolio.findOne({ user: req.user.id });

    if (!portfolio) {
      return res.status(404).json({ success: false, message: 'Portfolio not found' });
    }

    const insights = analyzePortfolio(portfolio);
    res.json({ success: true, insights });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserPortfolio,
  updateUserPortfolio,
  uploadAvatar,
  togglePublishStatus,
  getPublicPortfolio,
  getAiInsights
};

