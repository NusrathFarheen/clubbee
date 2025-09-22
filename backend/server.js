require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
const port = process.env.PORT || 3001;

// Enable CORS for all origins
app.use(cors());

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
