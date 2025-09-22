const mongoose = require('mongoose');
const News = require('../models/News');

// Sample data for when database is not available
const sampleNews = [
  {
    _id: '1',
    title: 'Robotics Club Wins National Competition',
    content: 'Our robotics team secured first place in the national robotics championship with their innovative autonomous robot design.',
    authorId: { name: 'John Doe' },
    date: '2025-09-20T00:00:00.000Z'
  },
  {
    _id: '2',
    title: 'New Drama Society Production Announced',
    content: 'The Drama Society is excited to announce their upcoming production of Shakespeare\'s Hamlet, auditions start next week.',
    authorId: { name: 'Jane Smith' },
    date: '2025-09-19T00:00:00.000Z'
  },
  {
    _id: '3',
    title: 'Inter-College Basketball League Starts',
    content: 'The annual inter-college basketball league will begin next month with 12 teams competing for the championship.',
    authorId: { name: 'Mike Johnson' },
    date: '2025-09-18T00:00:00.000Z'
  }
];

// @desc    Get all news articles
const getAllNews = async (req, res) => {
  try {
    // Check if mongoose is connected
    if (mongoose.connection.readyState !== 1) {
      console.log('MongoDB not connected, returning sample data');
      return res.json(sampleNews);
    }
    
    const news = await News.find()
      .populate('authorId', 'name')
      .sort({ date: -1 });
    res.json(news);
  } catch (error) {
    console.log('Database error, returning sample data:', error.message);
    // Return sample data if database is not available
    res.json(sampleNews);
  }
};

// @desc    Create a new news article
const createNews = async (req, res) => {
  try {
    const { title, content, authorId } = req.body;

    const newNews = new News({
      title,
      content,
      authorId
    });

    const savedNews = await newNews.save();
    const populatedNews = await News.findById(savedNews._id)
      .populate('authorId', 'name');
    
    res.status(201).json(populatedNews);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get news article by ID
const getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id)
      .populate('authorId', 'name');
    
    if (!news) {
      return res.status(404).json({ message: 'News article not found' });
    }
    
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAllNews,
  createNews,
  getNewsById
};