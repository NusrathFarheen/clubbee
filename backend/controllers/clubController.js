const mongoose = require('mongoose');
const Club = require('../models/Club');
const User = require('../models/User');

// Sample data for when database is not available
const sampleClubs = [
  { 
    _id: '1', 
    name: '🤖 AI & Robotics Society', 
    category: 'Technology', 
    description: 'Building the future with artificial intelligence and robotics. Join us for hackathons, workshops, and cutting-edge projects that push the boundaries of technology!',
    members: [
      { userId: 'user1', displayName: 'Alex Rodriguez', joinedAt: '2024-01-15T10:00:00Z' },
      { userId: 'user2', displayName: 'Sarah Chen', joinedAt: '2024-01-18T14:30:00Z' },
      { userId: 'user3', displayName: 'Marcus Johnson', joinedAt: '2024-02-01T09:15:00Z' },
      { userId: 'user4', displayName: 'Elena Petrov', joinedAt: '2024-02-10T16:45:00Z' }
    ],
    events: ['robot-competition-2024', 'ai-workshop-series'],
    createdAt: '2024-01-10T08:00:00Z',
    image: '🤖'
  },
  { 
    _id: '2', 
    name: '🎭 Theater & Drama Club', 
    category: 'Arts', 
    description: 'Express yourself through the performing arts! We produce amazing shows, offer acting workshops, and create unforgettable theatrical experiences.',
    members: [
      { userId: 'user5', displayName: 'Isabella Martinez', joinedAt: '2024-01-20T11:00:00Z' },
      { userId: 'user6', displayName: 'David Kim', joinedAt: '2024-01-25T13:20:00Z' },
      { userId: 'user7', displayName: 'Olivia Thompson', joinedAt: '2024-02-05T15:10:00Z' }
    ],
    events: ['spring-musical-2024', 'improv-night'],
    createdAt: '2024-01-12T10:30:00Z',
    image: '🎭'
  },
  { 
    _id: '3', 
    name: '🏀 Campus Athletics', 
    category: 'Sports', 
    description: 'Stay active and competitive! We offer basketball, volleyball, and fitness training. Join our championship teams and represent our campus!',
    members: [
      { userId: 'user8', displayName: 'Jordan Williams', joinedAt: '2024-01-14T12:00:00Z' },
      { userId: 'user9', displayName: 'Maya Patel', joinedAt: '2024-01-22T14:45:00Z' },
      { userId: 'user10', displayName: 'Tyler Brooks', joinedAt: '2024-02-03T10:30:00Z' },
      { userId: 'user11', displayName: 'Zara Ahmed', joinedAt: '2024-02-12T16:00:00Z' },
      { userId: 'user12', displayName: 'Cameron Davis', joinedAt: '2024-02-15T11:15:00Z' }
    ],
    events: ['basketball-tournament', 'fitness-bootcamp'],
    createdAt: '2024-01-08T07:45:00Z',
    image: '🏀'
  },
  { 
    _id: '4', 
    name: '💻 Code & Coffee Society', 
    category: 'Technology', 
    description: 'Where caffeine meets code! Join us for programming competitions, web development projects, and late-night coding sessions fueled by great coffee.',
    members: [
      { userId: 'user13', displayName: 'Ryan Foster', joinedAt: '2024-01-16T09:30:00Z' },
      { userId: 'user14', displayName: 'Priya Sharma', joinedAt: '2024-01-28T13:45:00Z' },
      { userId: 'user15', displayName: 'Lucas Anderson', joinedAt: '2024-02-07T15:20:00Z' }
    ],
    events: ['hackathon-prep', 'web-dev-workshop'],
    createdAt: '2024-01-11T09:00:00Z',
    image: '💻'
  },
  { 
    _id: '5', 
    name: '🌱 Environmental Action Club', 
    category: 'Service', 
    description: 'Making our campus and community greener! Join our sustainability initiatives, campus cleanups, and environmental awareness campaigns.',
    members: [
      { userId: 'user16', displayName: 'Emma Wilson', joinedAt: '2024-01-19T10:15:00Z' },
      { userId: 'user17', displayName: 'Noah Garcia', joinedAt: '2024-02-01T12:30:00Z' },
      { userId: 'user18', displayName: 'Ava Lee', joinedAt: '2024-02-08T14:00:00Z' }
    ],
    events: ['earth-day-cleanup', 'sustainability-fair'],
    createdAt: '2024-01-13T11:45:00Z',
    image: '🌱'
  },
  { 
    _id: '6', 
    name: '🎨 Creative Arts Collective', 
    category: 'Arts', 
    description: 'Unleash your creativity! We explore painting, digital art, photography, and mixed media. All skill levels welcome in our inclusive artistic community.',
    members: [
      { userId: 'user19', displayName: 'Sophie Turner', joinedAt: '2024-01-21T09:45:00Z' },
      { userId: 'user20', displayName: 'Ethan Parker', joinedAt: '2024-02-04T11:30:00Z' }
    ],
    events: ['art-exhibition', 'photography-walk'],
    createdAt: '2024-01-17T14:20:00Z',
    image: '🎨'
  },
  { 
    _id: '7', 
    name: '📚 Literary Society', 
    category: 'Academic', 
    description: 'For the love of literature! Book discussions, poetry nights, creative writing workshops, and author visits. Feed your mind with great stories and ideas.',
    members: [
      { userId: 'user21', displayName: 'Grace Mitchell', joinedAt: '2024-01-24T13:15:00Z' },
      { userId: 'user22', displayName: 'Aaron Cooper', joinedAt: '2024-02-06T15:45:00Z' }
    ],
    events: ['poetry-slam', 'author-meet-greet'],
    createdAt: '2024-01-09T16:30:00Z',
    image: '📚'
  },
  { 
    _id: '8', 
    name: '🎵 Campus Music Collective', 
    category: 'Arts', 
    description: 'Making beautiful music together! From jazz ensembles to rock bands, classical to electronic. All instruments and genres welcome in our musical family.',
    members: [
      { userId: 'user23', displayName: 'Liam Rodriguez', joinedAt: '2024-01-26T10:00:00Z' },
      { userId: 'user24', displayName: 'Chloe Kim', joinedAt: '2024-02-09T12:45:00Z' }
    ],
    events: ['battle-of-bands', 'acoustic-night'],
    createdAt: '2024-01-18T13:00:00Z',
    image: '🎵'
  }
];

// @desc    Get all clubs
const getAllClubs = async (req, res) => {
  try {
    // Check if mongoose is connected
    if (mongoose.connection.readyState !== 1) {
      console.log('MongoDB not connected, returning sample data');
      return res.json(sampleClubs);
    }
    
    const clubs = await Club.find().populate('members', 'name email');
    res.json(clubs);
  } catch (error) {
    console.log('Database error, returning sample data:', error.message);
    // Return sample data if database is not available
    res.json(sampleClubs);
  }
};

// @desc    Create a new club
const createClub = async (req, res) => {
  console.log('Creating club:', req.body);
  
  try {
    const { name, category, description } = req.body;
    
    // Always use mock data for development since MongoDB is not properly connected
    console.log('Using mock data for club creation');
    const mockClub = {
      _id: Date.now().toString(),
      name,
      category,
      description,
      members: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    console.log('Created mock club:', mockClub);
    return res.status(201).json(mockClub);
    
  } catch (error) {
    console.error('Error in createClub:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Join a club
const joinClub = async (req, res) => {
  console.log('Joining club:', req.params.id, 'User:', req.body);
  
  try {
    const { userId } = req.body;
    const clubId = req.params.id;

    // Always use mock data for development since MongoDB is not properly connected
    console.log('Using mock data for club join');
    const mockResponse = {
      message: 'Successfully joined club (development mode)',
      clubId: clubId,
      userId: userId || req.user?.uid || 'dev-user',
      joinedAt: new Date(),
      club: {
        _id: clubId,
        name: 'Mock Club',
        members: ['dev-user']
      }
    };
    
    console.log('Mock join response:', mockResponse);
    return res.status(200).json(mockResponse);
    
  } catch (error) {
    console.error('Error in joinClub:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get club by ID
const getClubById = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id)
      .populate('members', 'name email')
      .populate('events');
    
    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }
    
    res.json(club);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAllClubs,
  createClub,
  joinClub,
  getClubById
};