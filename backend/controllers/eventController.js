const mongoose = require('mongoose');
const Event = require('../models/Event');
const User = require('../models/User');
const Club = require('../models/Club');

// Sample data for when database is not available
const sampleEvents = [
  {
    _id: '1',
    title: 'Robot Competition',
    date: '2025-09-25T00:00:00.000Z',
    description: 'Annual robotics competition',
    organizerId: { name: 'Robotics Club' },
    attendees: []
  },
  {
    _id: '2',
    title: 'Annual Drama Performance',
    date: '2025-09-28T00:00:00.000Z',
    description: 'End of year theater show',
    organizerId: { name: 'Drama Society' },
    attendees: []
  },
  {
    _id: '3',
    title: 'Basketball Tournament',
    date: '2025-10-01T00:00:00.000Z',
    description: 'Inter-college basketball tournament',
    organizerId: { name: 'Basketball Club' },
    attendees: []
  },
  {
    _id: '4',
    title: 'Hackathon 2025',
    date: '2025-10-05T00:00:00.000Z',
    description: '48-hour coding competition',
    organizerId: { name: 'Coding Club' },
    attendees: []
  }
];

// @desc    Get all events
const getAllEvents = async (req, res) => {
  try {
    // Check if mongoose is connected
    if (mongoose.connection.readyState !== 1) {
      console.log('MongoDB not connected, returning sample data');
      return res.json(sampleEvents);
    }
    
    const events = await Event.find()
      .populate('organizerId', 'name')
      .populate('attendees', 'name email')
      .sort({ date: 1 });
    res.json(events);
  } catch (error) {
    console.log('Database error, returning sample data:', error.message);
    // Return sample data if database is not available
    res.json(sampleEvents);
  }
};

// @desc    Create a new event
const createEvent = async (req, res) => {
  try {
    const { title, date, description, organizerId, image, imageUrl } = req.body;
    console.log('Backend creating event with image:', image || imageUrl);

    // Check if mongoose is connected
    if (mongoose.connection.readyState !== 1) {
      console.log('MongoDB not connected, returning mock event creation response');
      // For testing purposes, return a mock response
      const mockEvent = {
        _id: Date.now().toString(),
        title,
        date,
        description,
        image: image || imageUrl,
        imageUrl: image || imageUrl, // Include both for compatibility
        organizerId: { 
          _id: organizerId || 'mock-club-id',
          name: 'Demo Club' 
        },
        attendees: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      console.log('Returning mock event:', mockEvent);
      return res.status(201).json(mockEvent);
    }

    const newEvent = new Event({
      title,
      date,
      description,
      image,
      organizerId
    });

    const savedEvent = await newEvent.save();
    
    // Add event to organizer (club)
    if (organizerId) {
      await Club.findByIdAndUpdate(organizerId, {
        $push: { events: savedEvent._id }
      });
    }

    const populatedEvent = await Event.findById(savedEvent._id)
      .populate('organizerId', 'name');
    
    res.status(201).json(populatedEvent);
  } catch (error) {
    console.log('Error creating event:', error.message);
    // If there's a database error, return a mock response for demo purposes
    const { title, date, description, organizerId, image, imageUrl } = req.body;
    const mockEvent = {
      _id: Date.now().toString(),
      title: title,
      date: date,
      description: description,
      image: image || imageUrl,
      imageUrl: image || imageUrl,
      organizerId: { 
        _id: organizerId || 'mock-club-id',
        name: 'Demo Club' 
      },
      attendees: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    console.log('Error fallback - returning mock event:', mockEvent);
    res.status(201).json(mockEvent);
  }
};

// @desc    RSVP to an event or cancel RSVP
const rsvpToEvent = async (req, res) => {
  try {
    const { action } = req.body;
    const eventId = req.params.id;
    const userId = req.user.uid; // Get user ID from Firebase auth

    // Check if mongoose is connected
    if (mongoose.connection.readyState !== 1) {
      console.log('MongoDB not connected, returning mock response');
      // For testing purposes, return a mock response
      return res.json({
        _id: eventId,
        title: 'Sample Event',
        date: new Date(),
        description: 'Sample description',
        organizerId: { name: 'Sample Club' },
        attendees: action === 'rsvp' ? [{ uid: userId, email: req.user.email }] : []
      });
    }

    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Find user in our system
    let user = await User.findOne({ email: req.user.email });
    
    // If user doesn't exist in our database yet, create them
    if (!user) {
      user = new User({
        name: req.user.name || 'Anonymous User',
        email: req.user.email,
        firebaseUid: req.user.uid,
      });
      await user.save();
    }

    if (action === 'rsvp') {
      // Check if user already RSVP'd
      if (event.attendees.some(attendee => 
        attendee.toString() === user._id.toString() ||
        attendee.email === user.email)) {
        return res.status(400).json({ message: 'You have already RSVP\'d to this event' });
      }

      // Add user to event attendees
      event.attendees.push(user._id);
    } 
    else if (action === 'cancel') {
      // Remove user from attendees
      event.attendees = event.attendees.filter(attendee => 
        attendee.toString() !== user._id.toString()
      );
    }
    else {
      return res.status(400).json({ message: 'Invalid action. Must be "rsvp" or "cancel"' });
    }

    await event.save();

    const updatedEvent = await Event.findById(eventId)
      .populate('organizerId', 'name')
      .populate('attendees', 'name email');
    
    res.json(updatedEvent);
  } catch (error) {
    console.error('RSVP Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get event by ID
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('organizerId', 'name')
      .populate('attendees', 'name email');
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAllEvents,
  createEvent,
  rsvpToEvent,
  getEventById
};