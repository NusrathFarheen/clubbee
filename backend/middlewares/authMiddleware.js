const admin = require('firebase-admin');
const User = require('../models/User');

// Initialize Firebase Admin (simplified for development)
let adminInitialized = false;
try {
  if (!admin.apps.length) {
    // For development without service account key
    console.log('Firebase Admin SDK not fully configured - using development mode');
    adminInitialized = false;
  }
} catch (error) {
  console.log('Firebase admin initialization error:', error.message);
  adminInitialized = false;
}

// Middleware to verify Firebase ID token
const authMiddleware = async (req, res, next) => {
  const headerToken = req.headers.authorization;
  if (!headerToken) {
    return res.status(401).send({ message: 'No token provided' });
  }

  if (headerToken && headerToken.split(' ')[0] !== 'Bearer') {
    return res.status(401).send({ message: 'Invalid token format' });
  }

  const token = headerToken.split(' ')[1];

  try {
    if (adminInitialized) {
      // Use Firebase Admin SDK to verify token
      const decodedToken = await admin.auth().verifyIdToken(token);
      req.user = decodedToken;
    } else {
      // Development mode - extract user info from token payload
      // This is NOT secure and should only be used for development
      console.log('Development mode: Accepting token without full verification');
      
      // For now, allow requests with any token and use a default user
      req.user = {
        uid: 'dev-user-' + Date.now(),
        email: 'dev@example.com',
        name: 'Development User'
      };
    }
    next();
  } catch (err) {
    console.error('Error verifying auth token:', err);
    return res.status(401).send({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;