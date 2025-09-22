import React, { useState } from 'react';
import { useEvents } from '../hooks/useApi';
import RSVPButton from '../components/RSVPButton';
import CreateEventModal from '../components/CreateEventModal';

const Events = () => {
  // Using the refresh function by passing it to child components
  const { events, loading, error, refresh, addEvent } = useEvents();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleEventCreated = (newEvent) => {
    console.log('=== EVENT CREATED HANDLER ===');
    console.log('New event received:', newEvent);
    console.log('Current events before adding:', events);
    
    // Since the modal now directly uses Firestore, we just need to refresh
    // the events list to get the latest data including the new event
    refresh();
    
    console.log('Refreshing events list to include new Firestore event');
  };

  if (loading) {
    return (
      <div className="honeycomb-bg" style={{ minHeight: '100vh', padding: 'var(--spacing-lg)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 className="clubbee-text-gold" style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: 'var(--spacing-lg)' }}>📅 Campus Events</h2>
          <div className="bee-spinner" style={{ fontSize: '2rem' }}></div>
          <p style={{ color: 'var(--clubbee-gold-light)', marginTop: 'var(--spacing-md)' }}>Loading amazing events...</p>
        </div>
      </div>
    );
  }

  // For demo purposes, we'll show events even if there's an error but we have fallback data
  const hasEvents = events && events.length > 0;

  return (
    <div className="honeycomb-bg" style={{ minHeight: '100vh', padding: 'var(--spacing-lg)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* 🐝 Header Section */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: 'var(--spacing-xl)',
          background: 'rgba(255, 255, 255, 0.1)',
          padding: 'var(--spacing-lg)',
          borderRadius: 'var(--radius-lg)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(244, 196, 48, 0.2)'
        }}>
          <div>
            <h2 className="clubbee-text-gold" style={{ 
              fontSize: '2.5rem', 
              fontWeight: 'bold', 
              margin: 0,
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
            }}>
              📅 Campus Events
            </h2>
            <p style={{ 
              color: 'var(--clubbee-gold-light)', 
              margin: '0.5rem 0 0 0',
              fontSize: '1.1rem'
            }}>
              Discover amazing experiences waiting for you 🐝
            </p>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="btn-honey pulse-honey"
            style={{ 
              fontSize: '1rem',
              padding: 'var(--spacing-md) var(--spacing-xl)',
              fontWeight: '600'
            }}
          >
            ⭐ Create Event
          </button>
        </div>

        {/* 🍯 Honeycomb Grid of Events */}
        <div className="honeycomb-grid">
          {events.map(event => {
            console.log('Rendering event:', {
              id: event._id,
              title: event.title,
              date: event.date,
              image: event.image,
              imageUrl: event.imageUrl,
              attendees: event.attendees
            });

            return (
              <div key={event._id} className="honeycomb-card bee-animation" style={{
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* 📸 Event Image */}
                {(event.image || event.imageUrl) && (
                  <div style={{ marginBottom: 'var(--spacing-lg)', textAlign: 'center' }}>
                    <div className="hex-image" style={{ 
                      width: '180px', 
                      height: '180px',
                      margin: '0 auto'
                    }}>
                      <img 
                        src={event.image || event.imageUrl} 
                        alt={event.title}
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover'
                        }}
                        onError={(e) => {
                          console.log('Event image failed to load:', e.target.src);
                          e.target.parentElement.style.display = 'none';
                        }}
                        onLoad={() => {
                          console.log('Image loaded successfully:', event.image || event.imageUrl);
                        }}
                      />
                    </div>
                  </div>
                )}
                
                {/* 📝 Event Info */}
                <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>
                  <h3 className="clubbee-text-gold" style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: '700', 
                    marginBottom: 'var(--spacing-sm)',
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)'
                  }}>
                    {event.title}
                  </h3>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 'var(--spacing-md)',
                    marginBottom: 'var(--spacing-md)',
                    flexWrap: 'wrap'
                  }}>
                    <div style={{
                      background: 'linear-gradient(45deg, var(--clubbee-gold-primary), var(--clubbee-gold-bright))',
                      color: 'var(--clubbee-navy-primary)',
                      padding: 'var(--spacing-xs) var(--spacing-md)',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}>
                      📅 {new Date(event.date).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <p style={{ 
                    color: 'var(--clubbee-navy-primary)', 
                    marginBottom: 'var(--spacing-md)', 
                    fontSize: '0.95rem',
                    lineHeight: '1.6'
                  }}>
                    {event.description}
                  </p>
                  
                  <div style={{ 
                    color: 'var(--clubbee-medium-gray)', 
                    fontSize: '0.875rem', 
                    marginBottom: 'var(--spacing-lg)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 'var(--spacing-md)',
                    flexWrap: 'wrap'
                  }}>
                    <span>
                      🐝 {event.attendees ? event.attendees.length : 0} attending
                    </span>
                    {(event.organizerId?.name) && (
                      <span>
                        🎯 By {event.organizerId?.name}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* 🎯 RSVP Button */}
                <div style={{ marginTop: 'auto' }}>
                  <RSVPButton eventId={event._id} attendees={event.attendees || []}/>
                </div>
              </div>
            );
          })}
        </div>

        {/* 📭 Empty State */}
        {events.length === 0 && !loading && (
          <div className="honeycomb-card" style={{ 
            textAlign: 'center', 
            padding: 'var(--spacing-xxl)',
            background: 'rgba(255, 255, 255, 0.05)'
          }}>
            <div className="hexagon" style={{ 
              width: '100px', 
              height: '100px', 
              margin: '0 auto var(--spacing-lg)',
              background: 'var(--clubbee-gold-primary)',
              fontSize: '2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              📅
            </div>
            <h3 className="clubbee-text-gold" style={{ marginBottom: 'var(--spacing-md)' }}>
              No events found
            </h3>
            <p style={{ color: 'var(--clubbee-gold-light)' }}>
              Be the first to create an exciting event for your community! ✨
            </p>
          </div>
        )}

        {/* 🎭 Create Event Modal */}
        <CreateEventModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onEventCreated={handleEventCreated}
        />
      </div>
    </div>
  );
};

export default Events;