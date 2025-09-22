const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// @route   GET /api/users/profile
// @desc    Get current user profile
// @access  Protected
router.get('/profile', authMiddleware, userController.getUserProfile);

// @route   GET /api/users/:id
// @desc    Get user profile by ID
// @access  Public
router.get('/:id', userController.getUserProfile);

// @route   POST /api/users/auth
// @desc    Register/authenticate user with Firebase
// @access  Public
router.post('/auth', userController.authenticateUser);

// @route   POST /api/users
// @desc    Register new user (legacy)
// @access  Public
router.post('/', userController.registerUser);

// @route   PUT /api/users/:id/badges
// @desc    Update user badges
// @access  Protected
router.put('/:id/badges', authMiddleware, userController.updateUserBadges);

module.exports = router;