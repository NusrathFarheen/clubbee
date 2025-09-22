const mongoose = require('mongoose');
const Event = require('../models/Event');
const User = require('../models/User');
const Club = require('../models/Club');

// Sample data for when database is not available
const sampleEvents = [
  {
    _id: '1',
    title: '🤖 AI & Robotics Showcase 2024',
    date: '2024-12-15T18:00:00.000Z',
    description: 'Join us for an incredible showcase of artificial intelligence and robotics projects! See autonomous robots, AI demos, and cutting-edge technology in action. Perfect for tech enthusiasts and future innovators!',
    organizerId: { name: 'AI & Robotics Society', _id: '1' },
    attendees: [
      { userId: 'user1', displayName: 'Alex Rodriguez', rsvpAt: '2024-11-20T10:00:00Z' },
      { userId: 'user2', displayName: 'Sarah Chen', rsvpAt: '2024-11-21T14:30:00Z' },
      { userId: 'user25', displayName: 'Michael Zhang', rsvpAt: '2024-11-22T09:15:00Z' }
    ],
    location: 'Engineering Building - Main Auditorium',
    category: 'Technology',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: '2',
    title: '🎭 "A Midsummer Night\'s Dream" Production',
    date: '2024-12-08T19:30:00.000Z',
    description: 'Experience Shakespeare like never before! Our theater club presents a modern adaptation of this beloved comedy. An evening of magic, romance, and laughter awaits you!',
    organizerId: { name: 'Theater & Drama Club', _id: '2' },
    attendees: [
      { userId: 'user5', displayName: 'Isabella Martinez', rsvpAt: '2024-11-18T11:00:00Z' },
      { userId: 'user6', displayName: 'David Kim', rsvpAt: '2024-11-19T13:20:00Z' },
      { userId: 'user26', displayName: 'Emma Thompson', rsvpAt: '2024-11-20T15:10:00Z' },
      { userId: 'user27', displayName: 'James Wilson', rsvpAt: '2024-11-21T16:45:00Z' }
    ],
    location: 'Campus Theater - Main Stage',
    category: 'Arts',
    imageUrl: 'https://images.unsplash.com/photo-1507924538820-ede94a04019d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: '3',
    title: '🏀 Intramural Basketball Championship',
    date: '2024-12-02T16:00:00.000Z',
    description: 'The ultimate basketball showdown! Watch our campus teams compete for the championship title. Exciting games, team spirit, and amazing prizes await!',
    organizerId: { name: 'Campus Athletics', _id: '3' },
    attendees: [
      { userId: 'user8', displayName: 'Jordan Williams', rsvpAt: '2024-11-15T12:00:00Z' },
      { userId: 'user9', displayName: 'Maya Patel', rsvpAt: '2024-11-16T14:45:00Z' },
      { userId: 'user10', displayName: 'Tyler Brooks', rsvpAt: '2024-11-17T10:30:00Z' },
      { userId: 'user28', displayName: 'Sophie Davis', rsvpAt: '2024-11-18T16:00:00Z' },
      { userId: 'user29', displayName: 'Ryan Martinez', rsvpAt: '2024-11-19T11:15:00Z' }
    ],
    location: 'Sports Complex - Main Gymnasium',
    category: 'Sports',
    imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: '4',
    title: '💻 Winter Hackathon 2024: "Code for Change"',
    date: '2024-12-14T09:00:00.000Z',
    description: '48 hours of pure coding excitement! Create innovative solutions for real-world problems. Prizes, mentorship, free meals, and amazing networking opportunities. All skill levels welcome!',
    organizerId: { name: 'Code & Coffee Society', _id: '4' },
    attendees: [
      { userId: 'user13', displayName: 'Ryan Foster', rsvpAt: '2024-11-10T09:30:00Z' },
      { userId: 'user14', displayName: 'Priya Sharma', rsvpAt: '2024-11-12T13:45:00Z' },
      { userId: 'user15', displayName: 'Lucas Anderson', rsvpAt: '2024-11-14T15:20:00Z' },
      { userId: 'user30', displayName: 'Anna Chang', rsvpAt: '2024-11-16T10:00:00Z' }
    ],
    location: 'Computer Science Building - Labs 1-3',
    category: 'Technology',
    imageUrl: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: '5',
    title: '🌍 Campus Sustainability Fair',
    date: '2024-11-30T11:00:00.000Z',
    description: 'Learn how to make our campus more sustainable! Interactive booths, eco-friendly product demos, workshops on green living, and a plant exchange. Help us build a greener future!',
    organizerId: { name: 'Environmental Action Club', _id: '5' },
    attendees: [
      { userId: 'user16', displayName: 'Emma Wilson', rsvpAt: '2024-11-08T10:15:00Z' },
      { userId: 'user17', displayName: 'Noah Garcia', rsvpAt: '2024-11-10T12:30:00Z' },
      { userId: 'user31', displayName: 'Lily Chen', rsvpAt: '2024-11-12T14:00:00Z' }
    ],
    location: 'Student Union - Main Plaza',
    category: 'Service',
    imageUrl: 'https://images.unsplash.com/photo-1569163139610-de8bccec2ad0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: '6',
    title: '🎨 Student Art Exhibition: "Visions of Tomorrow"',
    date: '2024-12-06T17:00:00.000Z',
    description: 'Discover the incredible talent of our student artists! Featuring paintings, sculptures, digital art, and photography. Wine, cheese, and creative inspiration included!',
    organizerId: { name: 'Creative Arts Collective', _id: '6' },
    attendees: [
      { userId: 'user19', displayName: 'Sophie Turner', rsvpAt: '2024-11-14T09:45:00Z' },
      { userId: 'user20', displayName: 'Ethan Parker', rsvpAt: '2024-11-16T11:30:00Z' },
      { userId: 'user32', displayName: 'Maya Rodriguez', rsvpAt: '2024-11-18T15:20:00Z' }
    ],
    location: 'Arts Building - Gallery Space',
    category: 'Arts',
    imageUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: '7',
    title: '🎵 Battle of the Bands 2024',
    date: '2024-12-10T20:00:00.000Z',
    description: 'The most anticipated musical event of the year! Student bands compete for the ultimate title. Amazing performances, great energy, and unforgettable music all night long!',
    organizerId: { name: 'Campus Music Collective', _id: '8' },
    attendees: [
      { userId: 'user23', displayName: 'Liam Rodriguez', rsvpAt: '2024-11-11T10:00:00Z' },
      { userId: 'user24', displayName: 'Chloe Kim', rsvpAt: '2024-11-13T12:45:00Z' },
      { userId: 'user33', displayName: 'Alex Johnson', rsvpAt: '2024-11-15T16:30:00Z' },
      { userId: 'user34', displayName: 'Nina Patel', rsvpAt: '2024-11-17T18:15:00Z' }
    ],
    location: 'Student Union - Concert Hall',
    category: 'Arts',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: '8',
    title: '📚 Poetry Slam & Open Mic Night',
    date: '2024-11-28T19:00:00.000Z',
    description: 'Express yourself through words! Share your poetry, stories, or just enjoy amazing performances from fellow students. Cozy atmosphere with hot chocolate and good vibes.',
    organizerId: { name: 'Literary Society', _id: '7' },
    attendees: [
      { userId: 'user21', displayName: 'Grace Mitchell', rsvpAt: '2024-11-05T13:15:00Z' },
      { userId: 'user22', displayName: 'Aaron Cooper', rsvpAt: '2024-11-07T15:45:00Z' },
      { userId: 'user35', displayName: 'Zoe Williams', rsvpAt: '2024-11-09T17:30:00Z' }
    ],
    location: 'Library - Reading Room',
    category: 'Academic',
    imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
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