import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useEvents } from '../hooks/useApi';
import { toast } from 'react-hot-toast';

const RSVPButton = ({ eventId, attendees = [] }) => {
  const { user } = useAuth();
  const { rsvpToEvent, cancelRSVP } = useEvents();
  const [isRSVPed, setIsRSVPed] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Check if user has already RSVP'd to this event
  useEffect(() => {
    if (user && Array.isArray(attendees) && attendees.length > 0) {
      setIsRSVPed(attendees.some(attendee => 
        (attendee && attendee.email && attendee.email === user.email) || 
        (typeof attendee === 'string' && attendee === user.uid) ||
        (attendee && attendee.uid && attendee.uid === user.uid) ||
        (attendee && attendee.userId && attendee.userId === user.uid)
      ));
    } else {
      setIsRSVPed(false);
    }
  }, [user, attendees]);
  
  const handleRSVP = async () => {
    if (!user) {
      toast.error('You must be logged in to RSVP');
      return;
    }
    
    if (!eventId) {
      toast.error('Invalid event ID');
      return;
    }
    
    setLoading(true);
    
    try {
      if (isRSVPed) {
        await cancelRSVP(eventId, user.uid);
        setIsRSVPed(false);
        toast.success('RSVP cancelled successfully!');
      } else {
        await rsvpToEvent(eventId, user.uid, user.displayName || user.email);
        setIsRSVPed(true);
        toast.success('RSVP successful! See you at the event!');
      }
    } catch (err) {
      toast.error(err.message || 'Failed to update RSVP status');
      console.error('RSVP error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div style={{ width: '100%' }}>
      <button
        onClick={handleRSVP}
        disabled={loading || !user}
        className={isRSVPed ? "btn-navy" : "btn-honey"}
        style={{
          width: '100%',
          fontSize: '1rem',
          fontWeight: '600',
          opacity: loading || !user ? 0.6 : 1,
          cursor: loading || !user ? 'not-allowed' : 'pointer',
          position: 'relative'
        }}
      >
        {loading ? (
          <>
            <span className="bee-spinner" style={{ display: 'inline-block', marginRight: '0.5rem' }}></span>
            Processing...
          </>
        ) : !user ? (
          '🔒 Login to RSVP'
        ) : (
          isRSVPed ? '❌ Cancel RSVP' : '✅ RSVP'
        )}
      </button>
      
      {!user && (
        <p style={{ 
          fontSize: '0.75rem', 
          color: 'var(--clubbee-medium-gray)', 
          textAlign: 'center', 
          marginTop: 'var(--spacing-sm)',
          fontStyle: 'italic'
        }}>
          Please log in to RSVP for events 🐝
        </p>
      )}
    </div>
  );
};

export default RSVPButton;