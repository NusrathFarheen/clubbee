// API service for communicating with the Express backend
const API_BASE_URL = 'http://localhost:3001/api';

// Helper function to get auth token (for demo purposes)
const getAuthToken = () => {
  // In a real app, this would get the Firebase JWT
  // For demo, we'll use the dev token that works with our middleware
  return 'Bearer dev-token';
};

// Helper function to make API requests
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getAuthToken(),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API Request Error for ${endpoint}:`, error);
    throw error;
  }
};

// Clubs API
export const clubsAPI = {
  // Get all clubs
  getClubs: () => apiRequest('/clubs'),
  
  // Create a new club
  createClub: (clubData) => apiRequest('/clubs', {
    method: 'POST',
    body: JSON.stringify(clubData),
  }),
  
  // Join a club
  joinClub: (clubId, userData) => apiRequest(`/clubs/${clubId}/join`, {
    method: 'PUT',
    body: JSON.stringify(userData),
  }),
  
  // Leave a club
  leaveClub: (clubId, userData) => apiRequest(`/clubs/${clubId}/leave`, {
    method: 'PUT',
    body: JSON.stringify(userData),
  }),
};

// Events API
export const eventsAPI = {
  // Get all events
  getEvents: () => apiRequest('/events'),
  
  // Create a new event
  createEvent: (eventData) => apiRequest('/events', {
    method: 'POST',
    body: JSON.stringify(eventData),
  }),
  
  // RSVP to an event
  rsvpEvent: (eventId, userData) => apiRequest(`/events/${eventId}/rsvp`, {
    method: 'PUT',
    body: JSON.stringify(userData),
  }),
};

// News API
export const newsAPI = {
  // Get all news
  getNews: () => apiRequest('/news'),
  
  // Create a news article
  createNews: (newsData) => apiRequest('/news', {
    method: 'POST',
    body: JSON.stringify(newsData),
  }),
};

// Combined API service
export const apiService = {
  clubs: clubsAPI,
  events: eventsAPI,
  news: newsAPI,
};

export default apiService;