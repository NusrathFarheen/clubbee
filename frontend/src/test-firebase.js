// Test Firebase connection
import { clubsService, eventsService, newsService } from './services/firebaseService';

const testFirebaseConnection = async () => {
  console.log('🔥 Testing Firebase connection...');
  
  try {
    // Test creating a club
    console.log('Testing club creation...');
    const testClub = {
      name: 'Test Firebase Club',
      category: 'Technology',
      description: 'Testing direct Firebase integration for real-time data'
    };
    
    const createdClub = await clubsService.createClub(testClub);
    console.log('✅ Club created successfully:', createdClub);
    
    // Test fetching clubs
    console.log('Testing club retrieval...');
    const clubs = await clubsService.getAllClubs();
    console.log('✅ Clubs retrieved:', clubs.length, 'clubs found');
    
    // Test creating an event
    console.log('Testing event creation...');
    const testEvent = {
      title: 'Test Firebase Event',
      description: 'Testing direct Firebase integration for events',
      date: new Date().toISOString(),
      organizerId: { name: 'Test Organizer' }
    };
    
    const createdEvent = await eventsService.createEvent(testEvent);
    console.log('✅ Event created successfully:', createdEvent);
    
    // Test fetching events
    console.log('Testing event retrieval...');
    const events = await eventsService.getAllEvents();
    console.log('✅ Events retrieved:', events.length, 'events found');
    
    // Test creating news
    console.log('Testing news creation...');
    const testNews = {
      title: 'Test Firebase News',
      content: 'Testing direct Firebase integration for news',
      category: 'announcement',
      authorId: { name: 'Test Author' }
    };
    
    const createdNews = await newsService.createNews(testNews);
    console.log('✅ News created successfully:', createdNews);
    
    // Test fetching news
    console.log('Testing news retrieval...');
    const news = await newsService.getAllNews();
    console.log('✅ News retrieved:', news.length, 'articles found');
    
    console.log('🎉 All Firebase tests passed! Real-time data is working!');
    
  } catch (error) {
    console.error('❌ Firebase test failed:', error);
  }
};

// Export for use in browser console
window.testFirebaseConnection = testFirebaseConnection;

export default testFirebaseConnection;