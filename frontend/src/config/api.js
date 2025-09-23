// API Configuration for different environments
const API_CONFIG = {
  development: {
    baseURL: 'http://localhost:3001',
    timeout: 10000
  },
  production: {
    baseURL: process.env.REACT_APP_API_URL || 'https://clubbee-backend.onrender.com',
    timeout: 15000
  }
};

const environment = process.env.NODE_ENV || 'development';
const config = API_CONFIG[environment];

export const API_BASE_URL = config.baseURL;
export const API_TIMEOUT = config.timeout;

// API endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  auth: {
    login: '/api/auth/login',
    logout: '/api/auth/logout',
    verify: '/api/auth/verify'
  },
  
  // User endpoints
  users: {
    base: '/api/users',
    profile: '/api/users/profile',
    update: '/api/users/update'
  },
  
  // Club endpoints
  clubs: {
    base: '/api/clubs',
    join: (id) => `/api/clubs/${id}/join`,
    leave: (id) => `/api/clubs/${id}/leave`,
    members: (id) => `/api/clubs/${id}/members`
  },
  
  // Event endpoints
  events: {
    base: '/api/events',
    rsvp: (id) => `/api/events/${id}/rsvp`,
    cancel: (id) => `/api/events/${id}/cancel`
  },
  
  // News endpoints
  news: {
    base: '/api/news'
  }
};

// Helper function to build full URL
export const buildURL = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`;
};

console.log(`🌐 API Configuration loaded for ${environment} environment`);
console.log(`📡 API Base URL: ${API_BASE_URL}`);