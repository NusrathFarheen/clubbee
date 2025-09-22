const mongoose = require('mongoose');
const User = require('../models/User');

// @desc    Get user profile by ID
const getUserProfile = async (req, res) => {
  try {
    // If this is a request to /api/users/profile
    if (req.user) {
      const user = await User.findOne({ firebaseUid: req.user.uid })
        .populate('clubsJoined');
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      return res.json(user);
    }

    // Otherwise it's a request for a specific user by ID
    const user = await User.findById(req.params.id).populate('clubsJoined');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Authenticate or register user from Firebase
const authenticateUser = async (req, res) => {
  try {
    const { uid, email, displayName, photoURL } = req.body;
    
    // Check if user already exists
    let user = await User.findOne({ firebaseUid: uid });
    
    if (user) {
      // User exists, update their info
      user.lastLogin = new Date();
      if (photoURL) user.photoURL = photoURL;
      await user.save();
      return res.json(user);
    }
    
    // User doesn't exist, create new user
    user = new User({
      firebaseUid: uid,
      name: displayName,
      email,
      photoURL,
      role: 'student'
    });
    
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Register new user
const registerUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const newUser = new User({
      name,
      email,
      role: role || 'student'
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update user badges
const updateUserBadges = async (req, res) => {
  try {
    const { badges } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { badges: { $each: badges } } },
      { new: true }
    );
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getUserProfile,
  registerUser,
  updateUserBadges,
  authenticateUser
};