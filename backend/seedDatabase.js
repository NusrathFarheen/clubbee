require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const User = require('./models/User');
const Club = require('./models/Club');
const Event = require('./models/Event');
const News = require('./models/News');

const sampleData = {
  users: [
    { name: 'John Doe', email: 'john@college.edu', role: 'student' },
    { name: 'Jane Smith', email: 'jane@college.edu', role: 'student' },
    { name: 'Mike Johnson', email: 'mike@college.edu', role: 'admin' },
  ],
  clubs: [
    { name: 'Robotics Club', category: 'Technology', description: 'Building robots and exploring automation' },
    { name: 'Drama Society', category: 'Arts', description: 'Theater productions and acting workshops' },
    { name: 'Basketball Club', category: 'Sports', description: 'Basketball training and tournaments' },
    { name: 'Coding Club', category: 'Technology', description: 'Programming competitions and hackathons' },
  ],
  events: [
    { title: 'Robot Competition', date: new Date('2025-09-25'), description: 'Annual robotics competition' },
    { title: 'Annual Drama Performance', date: new Date('2025-09-28'), description: 'End of year theater show' },
    { title: 'Basketball Tournament', date: new Date('2025-10-01'), description: 'Inter-college basketball tournament' },
    { title: 'Hackathon 2025', date: new Date('2025-10-05'), description: '48-hour coding competition' },
  ],
  news: [
    { 
      title: 'Robotics Club Wins National Competition',
      content: 'Our robotics team secured first place in the national robotics championship with their innovative autonomous robot design.',
      date: new Date('2025-09-20')
    },
    {
      title: 'New Drama Society Production Announced',
      content: 'The Drama Society is excited to announce their upcoming production of Shakespeare\'s Hamlet, auditions start next week.',
      date: new Date('2025-09-19')
    },
    {
      title: 'Inter-College Basketball League Starts',
      content: 'The annual inter-college basketball league will begin next month with 12 teams competing for the championship.',
      date: new Date('2025-09-18')
    }
  ]
};

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    const isConnected = await connectDB();
    if (!isConnected) {
      console.log('Failed to connect to MongoDB. Seeding aborted.');
      process.exit(1);
    }

    // Clear existing data
    await User.deleteMany({});
    await Club.deleteMany({});
    await Event.deleteMany({});
    await News.deleteMany({});
    console.log('Cleared existing data');

    // Create users
    const users = await User.insertMany(sampleData.users);
    console.log('Created users');

    // Create clubs
    const clubs = await Club.insertMany(sampleData.clubs);
    console.log('Created clubs');

    // Create events with organizer references
    const eventsWithOrganizers = sampleData.events.map((event, index) => ({
      ...event,
      organizerId: clubs[index]._id
    }));
    const events = await Event.insertMany(eventsWithOrganizers);
    console.log('Created events');

    // Create news with author references
    const newsWithAuthors = sampleData.news.map((article, index) => ({
      ...article,
      authorId: users[index]._id
    }));
    await News.insertMany(newsWithAuthors);
    console.log('Created news articles');

    // Update clubs with events
    for (let i = 0; i < clubs.length; i++) {
      if (events[i]) {
        clubs[i].events.push(events[i]._id);
        await clubs[i].save();
      }
    }

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeder if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;