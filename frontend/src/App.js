import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Clubs from './pages/Clubs';
import Events from './pages/Events';
import News from './pages/News';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import CreateClub from './pages/CreateClub';
import FirebaseTest from './pages/FirebaseTest';
import AdminPanel from './pages/AdminPanel';
import { AuthProvider, useAuth } from './hooks/useAuth';
import './App.css';
import './test-firebase'; // Import Firebase test for console access

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

// Protected Route Component - now inside AuthProvider context
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function AppContent() {
  const { user, logOut } = useAuth();
  
  return (
    <div className="honeycomb-bg" style={{ minHeight: '100vh' }}>
      {user && (
        <nav style={{ 
          background: 'linear-gradient(135deg, var(--clubbee-navy-primary) 0%, var(--clubbee-navy-light) 100%)',
          borderBottom: '3px solid var(--clubbee-gold-primary)',
          padding: '1rem 0',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <div style={{ 
            maxWidth: '1200px', 
            margin: '0 auto', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '0 1rem'
          }}>
            {/* 🐝 CLUBBEE Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <img 
                src="/clubbee-logo.jpg" 
                alt="CLUBBEE Logo"
                style={{ 
                  width: '50px', 
                  height: '50px', 
                  borderRadius: '8px',
                  objectFit: 'cover',
                  border: '2px solid var(--clubbee-gold-primary)',
                  boxShadow: 'var(--shadow-md)'
                }}
              />
              <div>
                <h1 className="clubbee-logo" style={{ margin: 0, fontSize: '1.8rem' }}>
                  CLUBBEE
                </h1>
                <p className="clubbee-tagline" style={{ margin: 0, fontSize: '0.75rem' }}>
                  Connect.Unite.Elevate
                </p>
              </div>
            </div>
            
            {/* 🍯 Navigation Links */}
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
              <Link 
                to="/" 
                className="nav-link"
                style={{ 
                  color: 'var(--clubbee-gold-light)', 
                  textDecoration: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  transition: 'var(--transition-normal)',
                  fontWeight: '500'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(244, 196, 48, 0.1)';
                  e.target.style.color = 'var(--clubbee-gold-primary)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = 'var(--clubbee-gold-light)';
                }}
              >
                🏠 Dashboard
              </Link>
              <Link 
                to="/clubs" 
                className="nav-link"
                style={{ 
                  color: 'var(--clubbee-gold-light)', 
                  textDecoration: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  transition: 'var(--transition-normal)',
                  fontWeight: '500'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(244, 196, 48, 0.1)';
                  e.target.style.color = 'var(--clubbee-gold-primary)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = 'var(--clubbee-gold-light)';
                }}
              >
                🏛️ Clubs
              </Link>
              <Link 
                to="/events" 
                className="nav-link"
                style={{ 
                  color: 'var(--clubbee-gold-light)', 
                  textDecoration: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  transition: 'var(--transition-normal)',
                  fontWeight: '500'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(244, 196, 48, 0.1)';
                  e.target.style.color = 'var(--clubbee-gold-primary)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = 'var(--clubbee-gold-light)';
                }}
              >
                🎉 Events
              </Link>
              <Link 
                to="/news" 
                className="nav-link"
                style={{ 
                  color: 'var(--clubbee-gold-light)', 
                  textDecoration: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  transition: 'var(--transition-normal)',
                  fontWeight: '500'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(244, 196, 48, 0.1)';
                  e.target.style.color = 'var(--clubbee-gold-primary)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = 'var(--clubbee-gold-light)';
                }}
              >
                📰 News
              </Link>
              <Link 
                to="/profile" 
                className="nav-link"
                style={{ 
                  color: 'var(--clubbee-gold-light)', 
                  textDecoration: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  transition: 'var(--transition-normal)',
                  fontWeight: '500'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(244, 196, 48, 0.1)';
                  e.target.style.color = 'var(--clubbee-gold-primary)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = 'var(--clubbee-gold-light)';
                }}
              >
                👤 Profile
              </Link>
              <Link 
                to="/admin" 
                className="nav-link"
                style={{ 
                  color: 'var(--clubbee-gold-primary)', 
                  textDecoration: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  transition: 'var(--transition-normal)',
                  fontWeight: '600',
                  border: '1px solid var(--clubbee-gold-primary)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'var(--clubbee-gold-primary)';
                  e.target.style.color = 'var(--clubbee-navy-primary)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = 'var(--clubbee-gold-primary)';
                }}
              >
                ⚙️ Admin
              </Link>
              <Link 
                to="/firebase-test" 
                className="nav-link"
                style={{ 
                  color: 'var(--clubbee-gold-accent)', 
                  textDecoration: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  transition: 'var(--transition-normal)',
                  fontWeight: '500'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 235, 59, 0.1)';
                  e.target.style.color = 'var(--clubbee-gold-bright)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = 'var(--clubbee-gold-accent)';
                }}
              >
                🔧 Debug
              </Link>
              
              {/* 👤 User Profile Section */}
              <div style={{ 
                marginLeft: '2rem', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem',
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-lg)',
                background: 'rgba(244, 196, 48, 0.1)',
                border: '1px solid rgba(244, 196, 48, 0.3)'
              }}>
                {user.photoURL && (
                  <div className="hex-image" style={{ width: '40px', height: '40px' }}>
                    <img 
                      src={user.photoURL} 
                      alt={user.displayName}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                )}
                <span style={{ color: 'var(--clubbee-gold-light)', fontWeight: '500' }}>
                  {user.displayName}
                </span>
                <button 
                  onClick={logOut}
                  className="btn-honey"
                  style={{ 
                    fontSize: '0.875rem',
                    padding: '0.5rem 1rem'
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}
        
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/clubs" element={
            <ProtectedRoute>
              <Clubs />
            </ProtectedRoute>
          } />
          <Route path="/events" element={
            <ProtectedRoute>
              <Events />
            </ProtectedRoute>
          } />
          <Route path="/news" element={
            <ProtectedRoute>
              <News />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          } />
          <Route path="/create-club" element={
            <ProtectedRoute>
              <CreateClub />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          } />
          <Route path="/firebase-test" element={
            <ProtectedRoute>
              <FirebaseTest />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
  );
}

export default App;
