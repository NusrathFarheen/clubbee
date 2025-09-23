require('dotenv').config({ path: '.env.test' });
const mongoose = require('mongoose');

// Production MongoDB Connection String
const MONGODB_URI = process.env.MONGODB_URI;

// Sample Data for Production Database
const sampleData = {
  clubs: [
    {
      name: "Tech Innovation Club",
      category: "Technology",
      description: "A community for tech enthusiasts to learn, share, and build innovative projects together.",
      members: [],
      events: [],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Creative Arts Society",
      category: "Arts",
      description: "Unleash your creativity through various art forms including painting, sculpture, and digital art.",
      members: [],
      events: [],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Environmental Action Group",
      category: "Environment",
      description: "Working together to create a sustainable campus and raise environmental awareness.",
      members: [],
      events: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],
  events: [
    {
      title: "Welcome Week Tech Fair",
      description: "Join us for an exciting showcase of the latest technology trends and student projects.",
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
      organizerId: { name: "Tech Innovation Club" },
      attendees: [],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: "Campus Art Exhibition",
      description: "Showcase your artistic talents and view amazing works from fellow students.",
      date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks from now
      organizerId: { name: "Creative Arts Society" },
      attendees: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],
  news: [
    {
      title: "Welcome to CLUBBEE!",
      content: "We're excited to launch our new Campus Club Management platform. Connect with amazing communities and discover exciting opportunities on campus!",
      authorId: { name: "CLUBBEE Team" },
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]
};

async function initializeDatabase() {
  try {
    console.log('🔌 Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas successfully!');

    // Create collections
    const db = mongoose.connection.db;
    
    console.log('📦 Creating collections and inserting sample data...');
    
    // Insert sample clubs
    const clubsCollection = db.collection('clubs');
    await clubsCollection.deleteMany({}); // Clear existing data
    await clubsCollection.insertMany(sampleData.clubs);
    console.log(`✅ Inserted ${sampleData.clubs.length} sample clubs`);
    
    // Insert sample events
    const eventsCollection = db.collection('events');
    await eventsCollection.deleteMany({}); // Clear existing data
    await eventsCollection.insertMany(sampleData.events);
    console.log(`✅ Inserted ${sampleData.events.length} sample events`);
    
    // Insert sample news
    const newsCollection = db.collection('news');
    await newsCollection.deleteMany({}); // Clear existing data
    await newsCollection.insertMany(sampleData.news);
    console.log(`✅ Inserted ${sampleData.news.length} sample news articles`);
    
    // Create indexes for better performance
    console.log('🔍 Creating database indexes...');
    await clubsCollection.createIndex({ name: 1 });
    await clubsCollection.createIndex({ category: 1 });
    await eventsCollection.createIndex({ date: 1 });
    await eventsCollection.createIndex({ "organizerId.name": 1 });
    await newsCollection.createIndex({ date: -1 });
    console.log('✅ Database indexes created successfully!');
    
    console.log('🎉 Database initialization completed successfully!');
    console.log('📊 Database Statistics:');
    console.log(`   - Clubs: ${await clubsCollection.countDocuments()}`);
    console.log(`   - Events: ${await eventsCollection.countDocuments()}`);
    console.log(`   - News: ${await newsCollection.countDocuments()}`);
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB Atlas');
    process.exit(0);
  }
}

// Run the initialization
console.log('🚀 Starting MongoDB Atlas database initialization...');
console.log('📝 Make sure to update MONGODB_URI with your actual connection string!');
console.log('');

initializeDatabase();