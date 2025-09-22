import React, { useState } from 'react';
import { useEvents } from '../hooks/useApi';
import RSVPButton from '../components/RSVPButton';
import CreateEventModal from '../components/CreateEventModal';

const Events = () => {
  // Using the refresh function by passing it to child components
    const { events, loading, refresh } = useEvents();
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
      <div className="honeycomb-bg" style={{ minHeight: '100vh', padding: '2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <img 
                src="/clubbee-logo.jpg" 
                alt="CLUBBEE Logo"
                style={{ 
                  width: '60px', 
                  height: '60px', 
                  borderRadius: '12px',
                  objectFit: 'cover',
                  border: '3px solid var(--clubbee-gold-primary)',
                  boxShadow: 'var(--shadow-md)'
                }}
              />
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
                  Discover and participate in exciting events 🎉
                </p>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div className="loading-spinner">Loading events...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="honeycomb-bg" style={{ minHeight: '100vh', padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img 
              src="/clubbee-logo.jpg" 
              alt="CLUBBEE Logo"
              style={{ 
                width: '60px', 
                height: '60px', 
                borderRadius: '12px',
                objectFit: 'cover',
                border: '3px solid var(--clubbee-gold-primary)',
                boxShadow: 'var(--shadow-md)'
              }}
            />
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
                Discover and participate in exciting events 🎉
              </p>
            </div>
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
            + Create Event
          </button>
        </div>
        
        {/* Events Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
          {events && Array.isArray(events) ? events.filter(event => event && event._id).map(event => {
            console.log('Event for display:', event, 'Image URL:', event.image || event.imageUrl);
            return (
              <div key={event._id} className="club-card event-card" style={{ 
                background: 'white',
                border: '3px solid var(--clubbee-gold-primary)',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-lg)'
              }}>
                {/* Event Image */}
                {(event.image || event.imageUrl) && (
                  <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                    <img 
                      src={event.image || event.imageUrl} 
                      alt={event.title}
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover'
                      }}
                      onError={(e) => {
                        console.log('Image failed to load:', e.target.src);
                        e.target.parentElement.style.display = 'none';
                      }}
                      onLoad={() => {
                        console.log('Image loaded successfully:', event.image || event.imageUrl);
                      }}
                    />
                    {/* Event Date Overlay */}
                    <div style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      background: 'var(--clubbee-gold-primary)',
                      color: 'var(--clubbee-navy-primary)',
                      padding: '0.5rem 1rem',
                      borderRadius: '20px',
                      fontWeight: '700',
                      fontSize: '0.875rem',
                      boxShadow: 'var(--shadow-md)'
                    }}>
                      📅 {new Date(event.date).toLocaleDateString()}
                    </div>
                  </div>
                )}
                
                {/* Event Content */}
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: '700', 
                    marginBottom: '0.75rem',
                    color: 'var(--clubbee-navy-primary)',
                    lineHeight: '1.3'
                  }}>
                    {event.title}
                  </h3>
                  
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '1rem', 
                    marginBottom: '1rem',
                    fontSize: '0.9rem',
                    color: 'var(--clubbee-navy-light)'
                  }}>
                    <span style={{ fontWeight: '600' }}>
                      👤 {event.organizerId?.name || 'CLUBBEE Events'}
                    </span>
                    {/* Only show date if no image */}
                    {!(event.image || event.imageUrl) && (
                      <span style={{ fontWeight: '600' }}>
                        📅 {new Date(event.date).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  
                  <p style={{ 
                    color: 'var(--clubbee-navy-primary)', 
                    lineHeight: '1.6',
                    marginBottom: '1.5rem',
                    fontSize: '1rem',
                    background: 'var(--clubbee-cream)',
                    padding: '1rem',
                    borderRadius: '10px',
                    border: '1px solid var(--clubbee-gold-light)'
                  }}>
                    {event.description}
                  </p>
                  
                  {/* Attendees Info */}
                  {event.attendees && event.attendees.length > 0 && (
                    <div style={{ 
                      background: 'var(--clubbee-blue-light)',
                      padding: '0.75rem',
                      borderRadius: '10px',
                      marginBottom: '1.5rem',
                      textAlign: 'center',
                      border: '2px solid var(--clubbee-blue-primary)'
                    }}>
                      <span style={{ 
                        color: 'var(--clubbee-navy-primary)', 
                        fontSize: '0.9rem',
                        fontWeight: '600'
                      }}>
                        👥 {event.attendees.length} {event.attendees.length === 1 ? 'person' : 'people'} attending
                      </span>
                    </div>
                  )}
                  
                  {/* RSVP Button */}
                  <RSVPButton 
                    eventId={event._id} 
                    attendees={Array.isArray(event.attendees) ? event.attendees : []}
                  />
                </div>
              </div>
            );
          }) : null}
        </div>

        {/* Empty State */}
        {(!events || events.length === 0) && (
          <div style={{ 
            textAlign: 'center', 
            padding: '4rem',
            background: 'white',
            borderRadius: '16px',
            border: '2px solid var(--clubbee-gold-light)',
            boxShadow: 'var(--shadow-md)'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📅</div>
            <h3 style={{ 
              fontSize: '1.5rem', 
              marginBottom: '0.5rem',
              color: 'var(--clubbee-navy-primary)',
              fontWeight: 'bold'
            }}>
              No events yet
            </h3>
            <p style={{ color: 'var(--clubbee-navy-light)', fontSize: '1.1rem' }}>
              Be the first to create an exciting campus event!
            </p>
          </div>
        )}
      </div>

      {/* Create Event Modal */}
      <CreateEventModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onEventCreated={handleEventCreated}
      />
    </div>
  );
};

export default Events;