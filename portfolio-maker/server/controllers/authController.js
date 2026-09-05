const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Portfolio = require('../models/Portfolio');

// Generate JWT token helper
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'portfolio_maker_super_secret_jwt_key_2026', {
    expiresIn: '30d'
  });
};

// Generate unique username helper
const generateUsername = async (name, email) => {
  let baseUsername = (name || email.split('@')[0])
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9_-]/g, '-')
    .replace(/-+/g, '-');

  if (!baseUsername || baseUsername.length < 3) {
    baseUsername = 'user';
  }

  let username = baseUsername;
  let counter = 1;

  while (await User.findOne({ username })) {
    username = `${baseUsername}-${counter}`;
    counter++;
  }

  return username;
};

// @desc    Register new user & initialize default portfolio
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields (name, email, password)' });
    }

    if (confirmPassword && password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long' });
    }

    // Check if email exists
    const userExists = await User.findOne({ email: email.toLowerCase().trim() });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User with this email already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate unique username
    const username = await generateUsername(name, email);

    // Create user
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      username
    });

    // Initialize portfolio with default starter content
    await Portfolio.create({
      user: user._id,
      username: user.username,
      selectedTemplate: 'modern-dev',
      published: true,
      personalInfo: {
        fullName: user.name,
        title: 'Full Stack Developer',
        bio: `Hello! I am ${user.name}, a passionate developer building modern web applications.`,
        email: user.email,
        phone: '+1 (555) 000-1234',
        location: 'San Francisco, CA',
        profileImage: '',
        resumeUrl: ''
      },
      education: [
        {
          degree: 'B.S. in Computer Science',
          institution: 'State University',
          startYear: '2021',
          endYear: '2025',
          grade: '3.8 GPA',
          description: 'Focused on algorithms, web development, and software design principles.'
        }
      ],
      skills: [
        { name: 'JavaScript', level: 90, category: 'Frontend' },
        { name: 'React', level: 85, category: 'Frontend' },
        { name: 'Node.js', level: 80, category: 'Backend' },
        { name: 'MongoDB', level: 75, category: 'Database' }
      ],
      experience: [
        {
          title: 'Software Developer Intern',
          company: 'Tech Solutions Inc.',
          type: 'Internship',
          startDate: 'Jun 2024',
          endDate: 'Aug 2024',
          current: false,
          description: 'Built REST APIs in Node.js and improved React dashboard performance.'
        }
      ],
      projects: [
        {
          title: 'Dynamic Portfolio Maker',
          description: 'A full-stack MERN application that enables users to create, customize, and publish developer portfolios.',
          technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
          githubUrl: 'https://github.com',
          liveDemoUrl: 'https://demo.com',
          imageUrl: ''
        }
      ],
      certifications: [
        {
          name: 'Full Stack Web Development Certification',
          issuingOrganization: 'Coursera / Meta',
          issueDate: '2024',
          credentialUrl: ''
        }
      ],
      socialLinks: {
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        twitter: '',
        instagram: '',
        youtube: '',
        website: ''
      }
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    // Find user with password included
    const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe
};
