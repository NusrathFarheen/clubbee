const mongoose = require('mongoose');
const News = require('../models/News');

// Sample data for when database is not available
const sampleNews = [
  {
    _id: '1',
    title: '🏆 AI & Robotics Society Wins International Championship!',
    content: 'Incredible news! Our AI & Robotics Society team has secured FIRST PLACE at the International University Robotics Championship in Tokyo! Their autonomous robot "CLUBBEE-Bot" impressed judges with its innovative AI navigation system and sustainable design. The team competed against 150+ universities worldwide and brought home the $50,000 grand prize! This victory puts our campus on the global map for technological innovation. Congratulations to Alex Rodriguez, Sarah Chen, and the entire team! 🎉🤖',
    authorId: { name: 'Dean of Engineering', _id: 'admin1' },
    date: '2024-11-15T09:00:00.000Z',
    category: 'achievement',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featured: true
  },
  {
    _id: '2',
    title: '🎭 Theater Club\'s "Midsummer Night\'s Dream" Sells Out in Record Time!',
    content: 'Amazing response from our campus community! All 500 tickets for our Theater & Drama Club\'s production of "A Midsummer Night\'s Dream" sold out in just 2 hours! Due to overwhelming demand, we\'re excited to announce TWO additional shows on December 9th and 10th. Director Isabella Martinez and the cast have been working tirelessly to bring this magical adaptation to life. Don\'t miss this enchanting experience! 🌟',
    authorId: { name: 'Student Activities Office', _id: 'admin2' },
    date: '2024-11-12T14:30:00.000Z',
    category: 'announcement',
    imageUrl: 'https://images.unsplash.com/photo-1507924538820-ede94a04019d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featured: false
  },
  {
    _id: '3',
    title: '🌱 Campus Goes Carbon Neutral - A Historic Achievement!',
    content: 'We\'re thrilled to announce that our campus has officially achieved CARBON NEUTRALITY! Thanks to the incredible efforts of our Environmental Action Club and the entire campus community, we\'ve reduced emissions by 60% and offset the remainder through renewable energy projects. This makes us the first university in our state to reach this milestone! Special recognition goes to Emma Wilson, Noah Garcia, and all the eco-warriors who made this possible. Together, we\'re building a sustainable future! 🌍',
    authorId: { name: 'Campus Sustainability Office', _id: 'admin3' },
    date: '2024-11-10T11:15:00.000Z',
    category: 'achievement',
    imageUrl: 'https://images.unsplash.com/photo-1569163139610-de8bccec2ad0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featured: true
  },
  {
    _id: '4',
    title: '💻 Winter Hackathon Registration Now Open - $25,000 in Prizes!',
    content: 'Get ready to code for change! Registration is now open for our Winter Hackathon 2024 "Code for Change" on December 14-15. This year\'s theme focuses on creating tech solutions for social good. We have an incredible $25,000 prize pool, mentorship from industry professionals, and participation from 15+ tech companies looking to hire talent. Whether you\'re a coding newbie or a programming pro, this event is for YOU! Sign up at hackathon.clubbee.edu 💪',
    authorId: { name: 'Code & Coffee Society', _id: 'club4' },
    date: '2024-11-08T16:45:00.000Z',
    category: 'event',
    imageUrl: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featured: false
  },
  {
    _id: '5',
    title: '🏀 Campus Athletics Breaks All-Time Attendance Record!',
    content: 'What an incredible game night! Last Friday\'s basketball match against State University drew a RECORD-BREAKING crowd of 3,200 fans! The energy in the gymnasium was absolutely electric as our team fought hard in a thrilling 89-87 victory. Jordan Williams scored a career-high 28 points, and Maya Patel delivered clutch free throws in the final seconds. Season tickets are now available - don\'t miss the championship run! 🔥',
    authorId: { name: 'Athletic Department', _id: 'admin4' },
    date: '2024-11-05T20:30:00.000Z',
    category: 'achievement',
    imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featured: false
  },
  {
    _id: '6',
    title: '📚 New Study Spaces Open in Library - Perfect for Finals!',
    content: 'Just in time for finals season! The library has unveiled 50 new state-of-the-art study spaces on the 3rd floor. Features include: individual pods with adjustable lighting, collaborative group rooms, silent study zones, charging stations, and complimentary coffee bar open 24/7 during finals week. The Literary Society helped design these spaces based on student feedback. Reserve your spot online starting Monday! 📖☕',
    authorId: { name: 'Library Services', _id: 'admin5' },
    date: '2024-11-03T10:00:00.000Z',
    category: 'announcement',
    imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featured: false
  },
  {
    _id: '7',
    title: '🎨 Student Art Exhibition Raises $12,000 for Local Charity!',
    content: 'Art with impact! The Creative Arts Collective\'s "Visions of Tomorrow" exhibition was not only a stunning showcase of student talent but also a tremendous success for community giving. Through art sales and donations, the event raised $12,000 for the Local Children\'s Education Fund! Sophie Turner\'s digital art piece "Future Dreams" was the top seller at $2,000. Thank you to everyone who supported our young artists and local community! 🎨❤️',
    authorId: { name: 'Creative Arts Collective', _id: 'club6' },
    date: '2024-11-01T13:20:00.000Z',
    category: 'achievement',
    imageUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featured: false
  },
  {
    _id: '8',
    title: '🎵 Battle of the Bands Lineup Announced - 12 Amazing Acts!',
    content: 'The moment you\'ve all been waiting for! The Battle of the Bands 2024 lineup is here, and it\'s INCREDIBLE! 12 student bands will compete on December 10th, including headliners "Electric Dreams" (featuring Liam Rodriguez), "Acoustic Soul" (led by Chloe Kim), and "Rock Revival." Genres range from indie rock to electronic to classical fusion. Winner gets $5,000, recording studio time, and a spot at Spring Festival! Tickets on sale Wednesday. 🎸🥁',
    authorId: { name: 'Campus Music Collective', _id: 'club8' },
    date: '2024-10-29T15:45:00.000Z',
    category: 'event',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featured: false
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
  console.log('Creating news:', req.body);
  
  try {
    const { title, content, authorId, category } = req.body;

    // Always use mock data for development since MongoDB is not properly connected
    console.log('Using mock data for news creation');
    const mockNews = {
      _id: Date.now().toString(),
      title,
      content,
      category: category || 'announcement',
      authorId: {
        _id: authorId || req.user?.uid || 'dev-user',
        name: req.user?.name || 'Demo User'
      },
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    console.log('Created mock news:', mockNews);
    return res.status(201).json(mockNews);
    
  } catch (error) {
    console.error('Error in createNews:', error.message);
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