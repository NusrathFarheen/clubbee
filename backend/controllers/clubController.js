const mongoose = require('mongoose');
const Club = require('../models/Club');
const User = require('../models/User');

// Sample data for when database is not available
const sampleClubs = [
  { 
    _id: '1', 
    name: 'Robotics Club', 
    category: 'Technology', 
    description: 'Building robots and exploring automation',
    members: ['John Doe', 'Jane Smith']
  },
  { 
    _id: '2', 
    name: 'Drama Society', 
    category: 'Arts', 
    description: 'Theater productions and acting workshops',
    members: ['Alice Brown', 'Bob Wilson']
  },
  { 
    _id: '3', 
    name: 'Basketball Club', 
    category: 'Sports', 
    description: 'Basketball training and tournaments',
    members: ['Mike Johnson', 'Sarah Davis']
  },
  { 
    _id: '4', 
    name: 'Coding Club', 
    category: 'Technology', 
    description: 'Programming competitions and hackathons',
    members: ['Alex Chen', 'Emily Taylor']
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
  try {
    const { name, category, description } = req.body;
    
    // Check if club already exists
    const existingClub = await Club.findOne({ name });
    if (existingClub) {
      return res.status(400).json({ message: 'Club with this name already exists' });
    }

    const newClub = new Club({
      name,
      category,
      description
    });

    const savedClub = await newClub.save();
    res.status(201).json(savedClub);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Join a club
const joinClub = async (req, res) => {
  try {
    const { userId } = req.body;
    const clubId = req.params.id;

    // Check if club exists
    const club = await Club.findById(clubId);
    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if user already in club
    if (club.members.includes(userId)) {
      return res.status(400).json({ message: 'User already in this club' });
    }

    // Add user to club and club to user
    club.members.push(userId);
    user.clubsJoined.push(clubId);

    await club.save();
    await user.save();

    const updatedClub = await Club.findById(clubId).populate('members', 'name email');
    res.json(updatedClub);
  } catch (error) {
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