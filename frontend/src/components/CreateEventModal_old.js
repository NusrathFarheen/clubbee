import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import ImageUpload from '../components/ImageUpload';
import { eventsService } from '../services/firebaseService';

const CreateEventModal = ({ isOpen, onClose, onEventCreated }) => {
  const { user } = useAuth();
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    imageUrl: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = (imageUrl) => {
    console.log('Image uploaded in CreateEventModal:', imageUrl);
    setEventData({
      ...eventData,
      imageUrl: imageUrl
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!eventData.title || !eventData.description || !eventData.date) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log('Creating event with data:', eventData);
      console.log('Event image URL:', eventData.imageUrl);
      
      // Use Firestore directly instead of backend
      const newEvent = await eventsService.createEvent({
        ...eventData,
        organizerId: { name: user?.displayName || 'Demo User' },
        attendees: []
      });
      
      console.log('Event created successfully in Firestore:', newEvent);
      
      // Call the callback to update the events list
      onEventCreated(newEvent);
      onClose();
      setEventData({ title: '', description: '', date: '', imageUrl: '' });
      
    } catch (err) {
      console.error('Failed to create event:', err);
      setError('Failed to create event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '2rem',
        maxWidth: '500px',
        width: '90%',
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>Create New Event</h3>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: '#6b7280'
            }}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Event Title *
            </label>
            <input
              type="text"
              name="title"
              value={eventData.title}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
              placeholder="Enter event title"
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Event Date *
            </label>
            <input
              type="datetime-local"
              name="date"
              value={eventData.date}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Description *
            </label>
            <textarea
              name="description"
              value={eventData.description}
              onChange={handleInputChange}
              required
              rows={4}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '1rem',
                resize: 'vertical'
              }}
              placeholder="Describe your event"
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Event Image (Optional)
            </label>
            <ImageUpload
              currentImage={eventData.imageUrl}
              onImageUpload={handleImageUpload}
              placeholder="Upload Event Image"
              folder="event-images"
              maxSize={5 * 1024 * 1024} // 5MB limit for event images
            />
          </div>

          {error && (
            <div style={{ 
              color: '#dc2626', 
              backgroundColor: '#fee2e2', 
              padding: '0.75rem', 
              borderRadius: '4px', 
              marginBottom: '1rem',
              fontSize: '0.875rem'
            }}>
              {error}
            </div>
          )}

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '0.5rem 1rem',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                backgroundColor: 'white',
                color: '#374151',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: loading ? '#9ca3af' : '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Creating...' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEventModal;