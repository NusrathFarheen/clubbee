# 🐝 CLUBBEE - Campus Club Management Suite

**The Ultimate Platform for Student Life & Campus Engagement**

A modern, comprehensive web application that transforms how students discover, join, and participate in campus clubs and events. Built for the future of student engagement with professional design and powerful features.

---

## 🎯 Vision

CLUBBEE connects students with their passions, fostering vibrant campus communities through seamless club management, event coordination, and social engagement. From robotics competitions to poetry slams, every student finds their tribe.

## ✨ Key Features

### 🏛️ **Club Management**
- **Discover Clubs**: Browse 8+ professional student organizations across Technology, Arts, Sports, Academic, and Service categories
- **Smart Joining**: One-click membership with real-time member tracking
- **Rich Profiles**: Detailed club descriptions, member lists, and upcoming events
- **Search & Filter**: Find clubs by category, name, or interests

### 📅 **Event System**
- **Event Discovery**: Explore exciting campus events from hackathons to theater productions
- **RSVP System**: Secure your spot with real-time attendee tracking
- **Rich Details**: Full event descriptions, locations, dates, and organizer information
- **Visual Appeal**: Professional event cards with high-quality imagery

### 📰 **News & Announcements**
- **Campus Updates**: Stay informed with achievement stories and announcements
- **Rich Content**: Professional journalism-style articles with images
- **Categories**: Filter by achievements, events, or general announcements
- **Engagement**: Author attribution and publication dates

### 🎨 **Professional Design**
- **Modern UI**: Deep blue-black (#121A28) and gold (#C7A046) branding
- **Responsive**: Perfect experience on desktop, tablet, and mobile
- **Loading States**: Branded bee spinner animations throughout
- **Error Handling**: Graceful error messages with retry options

## 🛠️ Technology Stack

### Frontend
- **React 18**: Modern component-based architecture
- **Tailwind CSS**: Utility-first styling with custom design system
- **Custom Hooks**: Clean state management and API integration
- **Loading Components**: Professional UX with spinners and error boundaries

### Backend
- **Node.js + Express**: RESTful API with middleware support
- **MongoDB**: Flexible NoSQL database with Mongoose ODM
- **JWT Authentication**: Secure token-based authentication (Firebase integration ready)
- **Mock Data Fallback**: Reliable demo functionality without database dependency

### Development
- **Modern JavaScript**: ES6+ features and async/await
- **Git Version Control**: Comprehensive commit history
- **Error Handling**: Try-catch blocks and graceful degradation
- **Code Organization**: Modular structure with clear separation of concerns

## 📁 Project Architecture

```
clubbee/
├── frontend/                    # React Application
│   ├── src/
│   │   ├── components/         # Reusable UI Components
│   │   │   ├── LoadingComponents.js  # Spinners, Error Messages
│   │   │   ├── CreateClubModal.js    # Club Creation
│   │   │   └── RSVPButton.js         # Event RSVP
│   │   ├── pages/              # Main Application Pages
│   │   │   ├── Dashboard.js          # Landing Page with Metrics
│   │   │   ├── Clubs.js              # Club Discovery & Management
│   │   │   ├── Events.js             # Event Browsing & RSVP
│   │   │   ├── News.js               # Campus News & Updates
│   │   │   └── UserProfile.js        # User Dashboard
│   │   ├── hooks/              # Custom React Hooks
│   │   │   ├── useApi.js             # API Integration
│   │   │   └── useAuth.js            # Authentication
│   │   ├── services/           # External Service Integration
│   │   │   ├── apiService.js         # Backend API Client
│   │   │   └── firebaseService.js    # Firebase Integration
│   │   └── styles/             # Global Styling
│   │       └── clubbee-theme.css     # Custom Design System
│   └── package.json
├── backend/                     # Express.js API Server
│   ├── models/                 # Database Models
│   │   ├── Club.js                   # Club Schema
│   │   ├── Event.js                  # Event Schema
│   │   ├── News.js                   # News Schema
│   │   └── User.js                   # User Schema
│   ├── controllers/            # Business Logic
│   │   ├── clubController.js         # Club Operations
│   │   ├── eventController.js        # Event Management
│   │   └── newsController.js         # News Management
│   ├── routes/                 # API Endpoints
│   │   ├── clubs.js                  # /api/clubs
│   │   ├── events.js                 # /api/events
│   │   └── news.js                   # /api/news
│   ├── middlewares/            # Express Middleware
│   │   └── authMiddleware.js         # Authentication
│   └── server.js               # Express Server Setup
└── README.md                   # Project Documentation
```
## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14 or higher)
- **Git** for version control
- **Modern web browser** (Chrome, Firefox, Safari, Edge)

### ⚡ Quick Setup (2 minutes)

1. **Clone the repository**
   ```bash
   git clone https://github.com/NusrathFarheen/clubbee.git
   cd clubbee
   ```

2. **Install dependencies**
   ```bash
   # Install all dependencies at once
   npm install
   
   # Or install separately:
   cd backend && npm install
   cd ../frontend && npm install
   ```

3. **Start the servers**
   
   **Terminal 1 - Backend Server:**
   ```bash
   cd backend
   npm start
   # Runs on http://localhost:3001
   ```
   
   **Terminal 2 - Frontend Server:**
   ```bash
   cd frontend  
   npm start
   # Runs on http://localhost:3000
   ```

4. **Open your browser**
   ```
   🌐 http://localhost:3000
   ```

**That's it! 🎉 CLUBBEE is now running with full demo data.**

---

## 🎮 Demo Features

### Immediate Functionality
- **8 Professional Clubs** ready to join
- **8 Exciting Events** ready for RSVP  
- **8 News Articles** showcasing campus life
- **Real-time API** interactions
- **Professional UI** with loading states

### Test the Features
1. **Join clubs** → See member counts update
2. **RSVP to events** → Watch attendee lists grow
3. **Browse news** → Explore rich content
4. **Search & filter** → Find exactly what you need

---

## 🔧 API Endpoints

### Clubs
- `GET /api/clubs` - Get all clubs
- `POST /api/clubs` - Create new club
- `PUT /api/clubs/:id/join` - Join a club
- `PUT /api/clubs/:id/leave` - Leave a club

### Events  
- `GET /api/events` - Get all events
- `POST /api/events` - Create new event
- `PUT /api/events/:id/rsvp` - RSVP to event

### News
- `GET /api/news` - Get all news articles
- `POST /api/news` - Create news article

---

## 🎨 Design System

### Color Palette
- **Primary**: Deep Blue-Black (#121A28)
- **Accent**: CLUBBEE Gold (#C7A046)  
- **Light**: Card Background (#F0F2F5)
- **Text**: Professional hierarchy with proper contrast

### Typography
- **Headings**: Bold, hierarchical sizing
- **Body**: Clean, readable fonts
- **Interactive**: Hover states and transitions

### Components
- **Cards**: Consistent shadows and borders
- **Buttons**: Branded colors with loading states
- **Forms**: Clean inputs with validation
- **Loading**: Bee-themed spinners throughout

---

## 📱 Responsive Design

- **Desktop**: Full-featured experience with multi-column layouts
- **Tablet**: Optimized card layouts and navigation
- **Mobile**: Touch-friendly interface with stacked content
- **Accessibility**: WCAG 2.1 compliant with proper contrast ratios

---

## 🔮 Future Roadmap

### Phase 1 (Post-Hackathon)
- **Real-time notifications** for new events
- **Calendar integration** for personal scheduling  
- **Photo uploading** for events and profiles
- **Advanced search** with multiple filters

### Phase 2 (Semester 2)
- **Mobile app** using React Native
- **Admin dashboard** with analytics
- **Achievement system** with badges
- **Integration APIs** for external tools

### Phase 3 (Year 2)
- **Multi-campus support** for university networks
- **AI recommendations** for clubs and events
- **Social features** like comments and ratings
- **Enterprise features** for administration

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow existing code style and patterns
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🏆 Acknowledgments

- **Hackathon Team**: For the incredible collaboration
- **Open Source Community**: For the amazing tools and libraries
- **Campus Organizations**: For inspiring the real-world use cases
- **Reviewers & Judges**: For the opportunity to showcase innovation

---

## 📞 Contact & Support

- **Project Repository**: [GitHub - CLUBBEE](https://github.com/NusrathFarheen/clubbee)
- **Issues & Bugs**: [GitHub Issues](https://github.com/NusrathFarheen/clubbee/issues)
- **Feature Requests**: [GitHub Discussions](https://github.com/NusrathFarheen/clubbee/discussions)

---

<div align="center">

**🐝 Built with passion for campus communities 🎓**

*Transforming student life, one club at a time.*

**[Live Demo](http://localhost:3000)** | **[API Docs](DEMO_GUIDE.md)** | **[Contributing](CONTRIBUTING.md)**

</div>
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