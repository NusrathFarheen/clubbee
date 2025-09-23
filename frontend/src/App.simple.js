import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Clubs from './pages/Clubs';
import Events from './pages/Events';
import Login from './pages/Login';

// Create a simplified version without the problematic authentication code
function App() {
  return (
    <Router>
      <div className="honeycomb-bg" style={{ minHeight: '100vh' }}>
        <nav style={{ 
          background: 'linear-gradient(135deg, #1a2a6c 0%, #2a4b8c 100%)',
          borderBottom: '3px solid #f4c430',
          padding: '1rem 0',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ 
            maxWidth: '1200px', 
            margin: '0 auto', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '0 1rem'
          }}>
            <div className="logo" style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ color: '#f4c430', fontSize: '1.5rem', fontWeight: 'bold' }}>CLUBBEE</span>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link to="/" style={{ color: '#f4c430', textDecoration: 'none' }}>Home</Link>
              <Link to="/clubs" style={{ color: '#f4c430', textDecoration: 'none' }}>Clubs</Link>
              <Link to="/events" style={{ color: '#f4c430', textDecoration: 'none' }}>Events</Link>
              <Link to="/login" style={{ color: '#f4c430', textDecoration: 'none' }}>Login</Link>
            </div>
          </div>
        </nav>
          
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clubs" element={<Clubs />} />
            <Route path="/events" element={<Events />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;