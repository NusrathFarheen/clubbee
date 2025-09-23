import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Clubs from './pages/Clubs';
import Events from './pages/Events';
import Login from './pages/Login';
import { AuthProvider, useAuth } from './hooks/useAuth';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

function AppContent() {
  const { user, logOut } = useAuth();
  
  return (
    <div className="honeycomb-bg" style={{ minHeight: '100vh' }}>
      <nav style={{ 
        background: 'linear-gradient(135deg, var(--clubbee-navy-primary) 0%, var(--clubbee-navy-light) 100%)',
        borderBottom: '3px solid var(--clubbee-gold-primary)',
        padding: '1rem 0'
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
            <img 
              src="/logo192.png" 
              alt="Clubbee Logo" 
              style={{ height: '40px', marginRight: '0.5rem' }} 
            />
            <span style={{ 
              color: 'var(--clubbee-gold-primary)', 
              fontSize: '1.5rem', 
              fontWeight: 'bold'
            }}>
              CLUBBEE
            </span>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/" style={{ color: '#f4c430', textDecoration: 'none' }}>Home</Link>
            <Link to="/clubs" style={{ color: '#f4c430', textDecoration: 'none' }}>Clubs</Link>
            <Link to="/events" style={{ color: '#f4c430', textDecoration: 'none' }}>Events</Link>
            {!user && (
              <Link to="/login" style={{ color: '#f4c430', textDecoration: 'none' }}>Login</Link>
            )}
            {user && (
              <button 
                onClick={logOut}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: 'var(--clubbee-gold-light)',
                  cursor: 'pointer'
                }}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
        
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/events" element={<Events />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;