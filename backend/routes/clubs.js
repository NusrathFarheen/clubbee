const express = require('express');
const router = express.Router();
const clubController = require('../controllers/clubController');
const authMiddleware = require('../middlewares/authMiddleware');

// @route   GET /api/clubs
// @desc    Get all clubs
// @access  Public
router.get('/', clubController.getAllClubs);

// @route   POST /api/clubs
// @desc    Create a new club
// @access  Protected
router.post('/', authMiddleware, clubController.createClub);

// @route   PUT /api/clubs/:id/join
// @desc    Join a club
// @access  Protected
router.put('/:id/join', authMiddleware, clubController.joinClub);

// @route   GET /api/clubs/:id
// @desc    Get club by ID
// @access  Public
router.get('/:id', clubController.getClubById);

module.exports = router;