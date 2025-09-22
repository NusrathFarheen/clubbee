const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const authMiddleware = require('../middlewares/authMiddleware');

// @route   GET /api/news
// @desc    Get all news articles
// @access  Public
router.get('/', newsController.getAllNews);

// @route   POST /api/news
// @desc    Create a new news article
// @access  Protected
router.post('/', authMiddleware, newsController.createNews);

// @route   GET /api/news/:id
// @desc    Get news article by ID
// @access  Public
router.get('/:id', newsController.getNewsById);

module.exports = router;