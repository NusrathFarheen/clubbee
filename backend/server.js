require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
const port = process.env.PORT || 3001;

// Configure CORS for production and development
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? [
        'https://clubbee-frontend.vercel.app',
        'https://clubbee.vercel.app',
        process.env.FRONTEND_URL
      ].filter(Boolean)
    : ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(express.json());

// Connect to MongoDB
connectDB();

// API Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/clubs', require('./routes/clubs'));
app.use('/api/events', require('./routes/events'));
app.use('/api/news', require('./routes/news'));

app.get('/', (req, res) => {
  res.send('Campus Club Management Suite Backend');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
