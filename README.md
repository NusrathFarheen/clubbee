# Campus Club Management Suite

A comprehensive web platform for digitizing student club operations and fostering inter-college collaboration.

## 🎯 Overview

The Campus Club Management Suite enables students to create and manage clubs, organize events, publish achievements, and interact with like-minded peers across colleges. Built with modern web technologies for fast prototyping and scalability.

## 🚀 Features

- **Club Management**: Create, browse, and join clubs across various categories
- **Event Planning**: Organize events with RSVP system and attendance tracking
- **News & Announcements**: Share achievements and updates campus-wide
- **User Dashboard**: Track participation, badges, and club activities
- **Authentication**: Secure Google-based login system

## 🛠️ Tech Stack

- **Frontend**: React + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: MongoDB with Mongoose
- **Authentication**: Firebase Authentication
- **Deployment**: Vercel (Frontend), Render/Heroku (Backend)

## 📁 Project Structure

```
campus-club-suite/
├── frontend/                # React + Tailwind frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Dashboard, Clubs, Events, News
│   │   ├── hooks/           # Custom hooks (auth, API calls)
│   │   └── utils/           # Helper functions
│   └── package.json
├── backend/                 # Express backend
│   ├── models/              # Mongoose schemas
│   ├── routes/              # API endpoints
│   ├── controllers/         # Business logic
│   ├── middlewares/         # Auth, error handling
│   └── server.js
├── database/                # MongoDB config
└── docs/                    # Documentation
```

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Firebase project for authentication

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd campus-club-suite
   ```

2. **Install dependencies**
   ```bash
   npm run install:backend
   npm run install:frontend
   ```

3. **Set up environment variables**
   - Create `.env` files in both `frontend` and `backend` directories
   - Add your MongoDB connection string and Firebase config

4. **Start the development servers**
   
   Backend (runs on port 3001):
   ```bash
   npm run start:backend
   ```
   
   Frontend (runs on port 3000):
   ```bash
   npm run start:frontend
   ```

## 📊 API Endpoints

### Users
- `GET /api/users/:id` - Get user profile
- `POST /api/users` - Register new user

### Clubs
- `GET /api/clubs` - Fetch all clubs
- `POST /api/clubs` - Create a new club
- `PUT /api/clubs/:id/join` - Join a club

### Events
- `GET /api/events` - List all events
- `POST /api/events` - Create an event
- `PUT /api/events/:id/rsvp` - RSVP to an event

### News
- `GET /api/news` - Fetch news posts
- `POST /api/news` - Add a news article

## 🎮 Demo Data

The application includes sample data for clubs, events, and news to demonstrate functionality during development and presentations.

## 🚧 Development Roadmap

- [ ] Complete backend API implementation
- [ ] Add Firebase authentication integration
- [ ] Implement real-time notifications
- [ ] Add mobile responsiveness
- [ ] Create admin dashboard
- [ ] Add analytics and reporting

## 🤝 Contributing

This project is being developed for a hackathon. For contributions:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

---

Built with ❤️ for the campus community