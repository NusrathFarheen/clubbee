const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const authMiddleware = require('../middlewares/authMiddleware');

// @route   GET /api/events
// @desc    Get all events
// @access  Public
router.get('/', eventController.getAllEvents);

// @route   POST /api/events
// @desc    Create a new event
// @access  Protected
router.post('/', authMiddleware, eventController.createEvent);

// @route   PUT /api/events/:id/rsvp
// @desc    RSVP to an event
// @access  Protected
router.put('/:id/rsvp', authMiddleware, eventController.rsvpToEvent);

// @route   GET /api/events/:id
// @desc    Get event by ID
// @access  Public
router.get('/:id', eventController.getEventById);

module.exports = router;