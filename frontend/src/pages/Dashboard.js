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
        
        {/* 🐝 Hero Section */}
        <div className="honeycomb-card" style={{ 
          textAlign: 'center', 
          marginBottom: 'var(--spacing-xl)',
          background: 'linear-gradient(135deg, rgba(244, 196, 48, 0.1), rgba(255, 215, 0, 0.05))',
          border: '2px solid var(--clubbee-gold-primary)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Background Pattern */}
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '200px',
            height: '200px',
            background: 'var(--clubbee-gold-primary)',
            opacity: 0.1,
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
                width: '120px', 
                height: '120px', 
                borderRadius: '16px',
                objectFit: 'cover',
                border: '4px solid var(--clubbee-gold-primary)',
                boxShadow: 'var(--shadow-xl)'
              }}
            />
          </div>
          
          <h1 className="clubbee-text-gold" style={{ 
            fontSize: '3.5rem', 
            fontWeight: 'bold', 
            margin: 0,
            textShadow: '3px 3px 6px rgba(0, 0, 0, 0.3)',
            position: 'relative',
            zIndex: 1
          }}>
            Welcome to CLUBBEE
          </h1>
          
          <div style={{ 
            fontSize: '1.5rem', 
            color: 'var(--clubbee-gold-light)', 
            marginTop: 'var(--spacing-md)',
            fontWeight: '600',
            letterSpacing: '2px',
            position: 'relative',
            zIndex: 1
          }}>
            CONNECT • UNITE • ELEVATE
          </div>
          
          {user && (
            <div style={{ 
              marginTop: 'var(--spacing-lg)',
              fontSize: '1.2rem',
              color: 'var(--clubbee-navy-primary)',
              position: 'relative',
              zIndex: 1
            }}>
              Hello, <span className="clubbee-text-gold" style={{ fontWeight: '700' }}>{user.displayName || 'Amazing Bee'}</span>! 🌟
            </div>
          )}
        </div>

        {user ? (
          <>
            {/* 📊 Stats Honeycomb Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--spacing-xl)',
              marginBottom: 'var(--spacing-xl)'
            }}>
              
              {/* Total Clubs Stat */}
              <div className="honeycomb-card bee-animation" style={{
                textAlign: 'center',
                background: 'linear-gradient(135deg, var(--clubbee-gold-primary), var(--clubbee-gold-bright))',
                color: 'var(--clubbee-navy-primary)',
                border: 'none'
              }}>
                <div className="hexagon" style={{ 
                  width: '80px', 
                  height: '80px', 
                  margin: '0 auto var(--spacing-lg)',
                  background: 'var(--clubbee-navy-primary)',
                  color: 'var(--clubbee-gold-bright)',
                  fontSize: '2rem'
                }}>
                  🏛️
                </div>
                <h3 style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: 'bold', 
                  margin: 0,
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'
                }}>
                  {clubs?.length || 0}
                </h3>
                <p style={{ 
                  fontSize: '1.1rem', 
                  fontWeight: '600', 
                  marginTop: 'var(--spacing-sm)' 
                }}>
                  Total Clubs
                </p>
              </div>

              {/* Your Clubs Stat */}
              <div className="honeycomb-card bee-animation" style={{
                textAlign: 'center',
                background: 'linear-gradient(135deg, var(--clubbee-navy-primary), var(--clubbee-navy-dark))',
                color: 'var(--clubbee-gold-bright)',
                border: 'none'
              }}>
                <div className="hexagon" style={{ 
                  width: '80px', 
                  height: '80px', 
                  margin: '0 auto var(--spacing-lg)',
                  background: 'var(--clubbee-gold-primary)',
                  color: 'var(--clubbee-navy-primary)',
                  fontSize: '2rem'
                }}>
                  💖
                </div>
                <h3 style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: 'bold', 
                  margin: 0,
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
                }}>
                  {userClubsCount}
                </h3>
                <p style={{ 
                  fontSize: '1.1rem', 
                  fontWeight: '600', 
                  marginTop: 'var(--spacing-sm)' 
                }}>
                  Your Clubs
                </p>
              </div>

              {/* Events Stat */}
              <div className="honeycomb-card bee-animation" style={{
                textAlign: 'center',
                background: 'linear-gradient(135deg, var(--clubbee-gold-primary), var(--clubbee-gold-bright))',
                color: 'var(--clubbee-navy-primary)',
                border: 'none'
              }}>
                <div className="hexagon" style={{ 
                  width: '80px', 
                  height: '80px', 
                  margin: '0 auto var(--spacing-lg)',
                  background: 'var(--clubbee-navy-primary)',
                  color: 'var(--clubbee-gold-bright)',
                  fontSize: '2rem'
                }}>
                  📅
                </div>
                <h3 style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: 'bold', 
                  margin: 0,
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'
                }}>
                  {userEventsCount}
                </h3>
                <p style={{ 
                  fontSize: '1.1rem', 
                  fontWeight: '600', 
                  marginTop: 'var(--spacing-sm)' 
                }}>
                  Your Events
                </p>
              </div>

              {/* Upcoming Events Stat */}
              <div className="honeycomb-card bee-animation" style={{
                textAlign: 'center',
                background: 'linear-gradient(135deg, var(--clubbee-navy-primary), var(--clubbee-navy-dark))',
                color: 'var(--clubbee-gold-bright)',
                border: 'none'
              }}>
                <div className="hexagon" style={{ 
                  width: '80px', 
                  height: '80px', 
                  margin: '0 auto var(--spacing-lg)',
                  background: 'var(--clubbee-gold-primary)',
                  color: 'var(--clubbee-navy-primary)',
                  fontSize: '2rem'
                }}>
                  🚀
                </div>
                <h3 style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: 'bold', 
                  margin: 0,
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
                }}>
                  {upcomingEvents}
                </h3>
                <p style={{ 
                  fontSize: '1.1rem', 
                  fontWeight: '600', 
                  marginTop: 'var(--spacing-sm)' 
                }}>
                  Upcoming Events
                </p>
              </div>
            </div>

            {/* 🎯 Quick Actions */}
            <div className="honeycomb-card" style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(244, 196, 48, 0.05))',
              border: '2px solid var(--clubbee-gold-primary)'
            }}>
              <h2 className="clubbee-text-gold" style={{ 
                fontSize: '2rem', 
                fontWeight: 'bold', 
                textAlign: 'center',
                marginBottom: 'var(--spacing-xl)',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'
              }}>
                🎯 Quick Actions
              </h2>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: 'var(--spacing-lg)'
              }}>
                <a href="/clubs" style={{ textDecoration: 'none' }}>
                  <div className="btn-honey" style={{
                    width: '100%',
                    textAlign: 'center',
                    padding: 'var(--spacing-lg)',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'block'
                  }}>
                    🏛️ Explore Clubs
                  </div>
                </a>
                
                <a href="/events" style={{ textDecoration: 'none' }}>
                  <div className="btn-navy" style={{
                    width: '100%',
                    textAlign: 'center',
                    padding: 'var(--spacing-lg)',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'block'
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