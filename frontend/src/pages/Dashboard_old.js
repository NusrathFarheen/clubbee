import React from 'react';
import { useDashboardStats } from '../hooks/useApi';

const Dashboard = () => {
  const { stats, loading } = useDashboardStats();

  const cardStyle = {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    textAlign: 'center'
  };

  const statNumberStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    margin: '0.5rem 0'
  };

  if (loading) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Dashboard</h2>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Dashboard</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        <div style={cardStyle}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>My Clubs</h3>
          <p style={{ ...statNumberStyle, color: '#2563eb' }}>{stats.myClubs}</p>
          <p style={{ color: '#6b7280' }}>Clubs joined</p>
        </div>
        
        <div style={cardStyle}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>Upcoming Events</h3>
          <p style={{ ...statNumberStyle, color: '#16a34a' }}>{stats.upcomingEvents}</p>
          <p style={{ color: '#6b7280' }}>Events this week</p>
        </div>
        
        <div style={cardStyle}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>Badges Earned</h3>
          <p style={{ ...statNumberStyle, color: '#9333ea' }}>{stats.badges}</p>
          <p style={{ color: '#6b7280' }}>Achievement badges</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
        <div style={cardStyle}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>Total Clubs</h3>
          <p style={{ ...statNumberStyle, color: '#dc2626' }}>{stats.totalClubs}</p>
          <p style={{ color: '#6b7280' }}>Available clubs</p>
        </div>
        
        <div style={cardStyle}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>News Articles</h3>
          <p style={{ ...statNumberStyle, color: '#ea580c' }}>{stats.totalNews}</p>
          <p style={{ color: '#6b7280' }}>Latest updates</p>
        </div>
      </div>
      
      <div style={{ marginTop: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Recent Activity</h3>
        <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', padding: '1.5rem' }}>
          <p style={{ color: '#6b7280' }}>Your recent club activities will appear here...</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;