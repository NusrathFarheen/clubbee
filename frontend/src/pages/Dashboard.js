import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useClubs, useEvents } from '../hooks/useApi';

const Dashboard = () => {
  const { user } = useAuth();
  const { clubs } = useClubs();
  const { events } = useEvents();

  // Calculate user stats
  const userClubsCount = clubs?.filter(club => 
    Array.isArray(club.members) && club.members.some(member => 
      (typeof member === 'string' && member === user?.uid) ||
      (member.uid && member.uid === user?.uid) ||
      (member.email && member.email === user?.email)
    )
  ).length || 0;

  const userEventsCount = events?.filter(event =>
    Array.isArray(event.attendees) && event.attendees.some(attendee =>
      (typeof attendee === 'string' && attendee === user?.uid) ||
      (attendee.uid && attendee.uid === user?.uid) ||
      (attendee.email && attendee.email === user?.email)
    )
  ).length || 0;

  const upcomingEvents = events?.filter(event => 
    new Date(event.date) > new Date()
  ).length || 0;

  return (
    <div className="honeycomb-bg" style={{ minHeight: '100vh', padding: 'var(--spacing-lg)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* 🐝 Professional Hero Section */}
        <div className="card-professional" style={{ 
          textAlign: 'center', 
          marginBottom: 'var(--spacing-xxl)',
          padding: 'var(--spacing-xxl)',
          background: 'linear-gradient(135deg, var(--clubbee-off-white) 0%, var(--clubbee-cream) 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Subtle background accent */}
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '150px',
            height: '150px',
            background: 'linear-gradient(45deg, var(--clubbee-gold-primary), var(--clubbee-gold-bright))',
            opacity: 0.08,
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            transform: 'rotate(15deg)'
          }} />
          
          <div style={{ 
            marginBottom: 'var(--spacing-lg)',
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            justifyContent: 'center'
          }}>
            <img 
              src="/clubbee-logo.jpg" 
              alt="CLUBBEE Logo"
              style={{ 
                width: '100px', 
                height: '100px', 
                borderRadius: 'var(--radius-lg)',
                objectFit: 'cover',
                border: '3px solid var(--clubbee-gold-primary)',
                boxShadow: '0 8px 20px rgba(212, 165, 116, 0.3)'
              }}
            />
          </div>
          
          <h1 className="heading-hero" style={{ 
            margin: 0,
            position: 'relative',
            zIndex: 1
          }}>
            Welcome to CLUBBEE
          </h1>
          
          <div className="subheading" style={{ 
            marginTop: 'var(--spacing-md)',
            position: 'relative',
            zIndex: 1,
            color: 'var(--brand-navy-primary)'
          }}>
            CONNECT • UNITE • ELEVATE
          </div>
          
          {user && (
            <div className="body-text" style={{ 
              marginTop: 'var(--spacing-lg)',
              fontSize: '1.125rem',
              position: 'relative',
              zIndex: 1
            }}>
              Hello, <span style={{ 
                fontWeight: '600', 
                color: 'var(--brand-navy-primary)' 
              }}>{user.displayName || 'Amazing Bee'}</span>! 🌟
            </div>
          )}
        </div>

        {user ? (
          <>
            {/* 📊 Professional Stats Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 'var(--spacing-xl)',
              marginBottom: 'var(--spacing-xxl)'
            }}>
              
              {/* Total Clubs Stat */}
              <div className="honeycomb-card bee-animation metric-card" style={{
                textAlign: 'center',
                background: '#F0F2F5',
                color: '#333333',
                border: '1px solid rgba(199, 160, 70, 0.2)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
              }}>
                <div className="hexagon" style={{ 
                  width: '80px', 
                  height: '80px', 
                  margin: '0 auto var(--spacing-lg)',
                  background: '#222C3B',
                  color: '#C7A046',
                  fontSize: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%'
                }}>
                  🏛️
                </div>
                <h3 style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: 'bold', 
                  margin: 0,
                  color: '#333333'
                }}>
                  {clubs?.length || 0}
                </h3>
                <p style={{ 
                  fontSize: '1.1rem', 
                  fontWeight: '600', 
                  marginTop: 'var(--spacing-sm)',
                  color: '#666666'
                }}>
                  Total Clubs
                </p>
              </div>

              {/* Your Clubs Stat */}
              <div className="honeycomb-card bee-animation metric-card" style={{
                textAlign: 'center',
                background: '#222C3B',
                color: '#D0D0D0',
                border: '1px solid rgba(199, 160, 70, 0.3)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)'
              }}>
                <div className="hexagon" style={{ 
                  width: '80px', 
                  height: '80px', 
                  margin: '0 auto var(--spacing-lg)',
                  background: '#C7A046',
                  color: '#222C3B',
                  fontSize: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%'
                }}>
                  💖
                </div>
                <h3 style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: 'bold', 
                  margin: 0,
                  color: '#FFFFFF'
                }}>
                  {userClubsCount}
                </h3>
                <p style={{ 
                  fontSize: '1.1rem', 
                  fontWeight: '600', 
                  marginTop: 'var(--spacing-sm)',
                  color: '#D0D0D0'
                }}>
                  Your Clubs
                </p>
              </div>

              {/* Events Stat */}
              <div className="honeycomb-card bee-animation metric-card" style={{
                textAlign: 'center',
                background: '#F0F2F5',
                color: '#333333',
                border: '1px solid rgba(199, 160, 70, 0.2)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
              }}>
                <div className="hexagon" style={{ 
                  width: '80px', 
                  height: '80px', 
                  margin: '0 auto var(--spacing-lg)',
                  background: '#222C3B',
                  color: '#C7A046',
                  fontSize: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%'
                }}>
                  📅
                </div>
                <h3 style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: 'bold', 
                  margin: 0,
                  color: '#333333'
                }}>
                  {userEventsCount}
                </h3>
                <p style={{ 
                  fontSize: '1.1rem', 
                  fontWeight: '600', 
                  marginTop: 'var(--spacing-sm)',
                  color: '#666666'
                }}>
                  Your Events
                </p>
              </div>

              {/* Upcoming Events Stat */}
              <div className="honeycomb-card bee-animation metric-card" style={{
                textAlign: 'center',
                background: '#222C3B',
                color: '#D0D0D0',
                border: '1px solid rgba(199, 160, 70, 0.3)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)'
              }}>
                <div className="hexagon" style={{ 
                  width: '80px', 
                  height: '80px', 
                  margin: '0 auto var(--spacing-lg)',
                  background: '#C7A046',
                  color: '#222C3B',
                  fontSize: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%'
                }}>
                  🚀
                </div>
                <h3 style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: 'bold', 
                  margin: 0,
                  color: '#FFFFFF'
                }}>
                  {upcomingEvents}
                </h3>
                <p style={{ 
                  fontSize: '1.1rem', 
                  fontWeight: '600', 
                  marginTop: 'var(--spacing-sm)',
                  color: '#D0D0D0'
                }}>
                  Upcoming Events
                </p>
              </div>
            </div>

            {/* 🎯 Quick Actions */}
            <div className="honeycomb-card quick-actions-container" style={{
              background: '#222C3B',
              border: '1px solid rgba(199, 160, 70, 0.3)',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)'
            }}>
              <h2 className="clubbee-text-gold" style={{ 
                fontSize: '2rem', 
                fontWeight: 'bold', 
                textAlign: 'center',
                marginBottom: 'var(--spacing-xl)',
                color: '#C7A046'
              }}>
                🎯 Quick Actions
              </h2>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: 'var(--spacing-lg)'
              }}>
                <a href="/clubs" style={{ textDecoration: 'none' }}>
                  <div className="quick-action-button" style={{
                    width: '100%',
                    textAlign: 'center',
                    padding: 'var(--spacing-lg)',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'block',
                    background: '#C7A046',
                    color: '#222C3B',
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 12px rgba(199, 160, 70, 0.3)'
                  }}>
                    🏛️ Explore Clubs
                  </div>
                </a>
                
                <a href="/events" style={{ textDecoration: 'none' }}>
                  <div className="quick-action-button" style={{
                    width: '100%',
                    textAlign: 'center',
                    padding: 'var(--spacing-lg)',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    border: '1px solid rgba(199, 160, 70, 0.3)',
                    cursor: 'pointer',
                    display: 'block',
                    background: '#222C3B',
                    color: '#D0D0D0',
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                  }}>
                    📅 Browse Events
                  </div>
                </a>
              </div>
            </div>
          </>
        ) : (
          /* 🔒 Login Prompt */
          <div className="honeycomb-card" style={{ 
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(244, 196, 48, 0.05))',
            border: '2px solid var(--clubbee-gold-primary)'
          }}>
            <div className="hexagon" style={{ 
              width: '120px', 
              height: '120px', 
              margin: '0 auto var(--spacing-xl)',
              background: 'var(--clubbee-gold-primary)',
              fontSize: '3rem'
            }}>
              🔑
            </div>
            
            <h2 className="clubbee-text-gold" style={{ 
              fontSize: '2.5rem', 
              fontWeight: 'bold',
              marginBottom: 'var(--spacing-lg)',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
            }}>
              Join the Hive!
            </h2>
            
            <p style={{ 
              fontSize: '1.2rem', 
              color: 'var(--clubbee-gold-light)',
              marginBottom: 'var(--spacing-xl)',
              lineHeight: '1.6'
            }}>
              Connect with amazing communities, discover exciting events, and elevate your campus experience with CLUBBEE! 🐝
            </p>
            
            <div style={{
              background: 'linear-gradient(45deg, var(--clubbee-gold-primary), var(--clubbee-gold-bright))',
              color: 'var(--clubbee-navy-primary)',
              padding: 'var(--spacing-md)',
              borderRadius: 'var(--radius-lg)',
              fontSize: '1.1rem',
              fontWeight: '600',
              display: 'inline-block'
            }}>
              Please log in to start connecting! ✨
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;