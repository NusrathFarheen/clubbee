import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useEvents } from '../hooks/useApi';
import ImageUpload from '../components/ImageUpload';

const CreateEventModal = ({ isOpen, onClose, onEventCreated }) => {
  const { user } = useAuth();
  const { addEvent } = useEvents();
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
      
      // Use the Firebase-enabled addEvent function
      const newEvent = await addEvent({
        ...eventData,
        organizerId: { name: user?.displayName || 'Demo User' },
        attendees: []
      });
      
      console.log('Event created successfully:', newEvent);
      
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
      backgroundColor: 'rgba(44, 62, 80, 0.9)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(8px)',
      padding: '1rem'
    }}>
      <div className="honeycomb-card" style={{
        width: '100%',
        maxWidth: '600px',
        maxHeight: '90vh',
        overflow: 'auto',
        position: 'relative'
      }}>
        {/* 🐝 Header */}
        <div style={{ 
          marginBottom: 'var(--spacing-xl)',
          textAlign: 'center',
          borderBottom: '2px solid var(--clubbee-gold-primary)',
          paddingBottom: 'var(--spacing-lg)'
        }}>
          <h2 className="clubbee-text-gold" style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold',
            margin: 0,
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'
          }}>
            ⭐ Create New Event
          </h2>
          <p style={{ 
            color: 'var(--clubbee-gold-light)', 
            margin: '0.5rem 0 0 0',
            fontSize: '1rem'
          }}>
            Plan amazing experiences for your community 🐝
          </p>
        </div>

        {/* ⚠️ Error Message */}
        {error && (
          <div className="message-warning" style={{ marginBottom: 'var(--spacing-lg)' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* 📝 Event Title */}
          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: 'var(--spacing-sm)', 
              fontWeight: '600',
              color: 'var(--clubbee-navy-primary)',
              fontSize: '1rem'
            }}>
              ⭐ Event Title *
            </label>
            <input
              type="text"
              name="title"
              value={eventData.title}
              onChange={handleInputChange}
              required
              placeholder="Enter your event's title..."
              style={{
                width: '100%',
                padding: 'var(--spacing-md)',
                fontSize: '1rem',
                border: '2px solid var(--clubbee-gold-primary)',
                borderRadius: 'var(--radius-lg)',
                background: 'rgba(255, 255, 255, 0.9)',
                color: 'var(--clubbee-navy-primary)',
                transition: 'var(--transition-normal)'
              }}
              onFocus={(e) => {
                e.target.style.boxShadow = 'var(--shadow-honey)';
                e.target.style.transform = 'scale(1.02)';
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = 'none';
                e.target.style.transform = 'scale(1)';
              }}
            />
          </div>

          {/* 📅 Event Date */}
          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: 'var(--spacing-sm)', 
              fontWeight: '600',
              color: 'var(--clubbee-navy-primary)',
              fontSize: '1rem'
            }}>
              📅 Event Date & Time *
            </label>
            <input
              type="datetime-local"
              name="date"
              value={eventData.date}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: 'var(--spacing-md)',
                fontSize: '1rem',
                border: '2px solid var(--clubbee-gold-primary)',
                borderRadius: 'var(--radius-lg)',
                background: 'rgba(255, 255, 255, 0.9)',
                color: 'var(--clubbee-navy-primary)',
                cursor: 'pointer'
              }}
            />
          </div>

          {/* 📄 Description */}
          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: 'var(--spacing-sm)', 
              fontWeight: '600',
              color: 'var(--clubbee-navy-primary)',
              fontSize: '1rem'
            }}>
              📄 Event Description *
            </label>
            <textarea
              name="description"
              value={eventData.description}
              onChange={handleInputChange}
              required
              placeholder="Describe your amazing event..."
              rows={4}
              style={{
                width: '100%',
                padding: 'var(--spacing-md)',
                fontSize: '1rem',
                border: '2px solid var(--clubbee-gold-primary)',
                borderRadius: 'var(--radius-lg)',
                background: 'rgba(255, 255, 255, 0.9)',
                color: 'var(--clubbee-navy-primary)',
                resize: 'vertical',
                minHeight: '100px',
                transition: 'var(--transition-normal)'
              }}
              onFocus={(e) => {
                e.target.style.boxShadow = 'var(--shadow-honey)';
                e.target.style.transform = 'scale(1.01)';
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = 'none';
                e.target.style.transform = 'scale(1)';
              }}
            />
          </div>

          {/* 🖼️ Image Upload */}
          <div style={{ marginBottom: 'var(--spacing-xl)' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: 'var(--spacing-sm)', 
              fontWeight: '600',
              color: 'var(--clubbee-navy-primary)',
              fontSize: '1rem'
            }}>
              🖼️ Event Image
            </label>
            <ImageUpload
              currentImage={eventData.imageUrl}
              onImageUpload={handleImageUpload}
              placeholder="Upload Event Image"
              folder="event-images"
              maxSize={5 * 1024 * 1024} // 5MB limit for event images
            />
          </div>

          {/* 🎯 Action Buttons */}
          <div style={{ 
            display: 'flex', 
            gap: 'var(--spacing-md)', 
            justifyContent: 'flex-end',
            borderTop: '2px solid var(--clubbee-gold-primary)',
            paddingTop: 'var(--spacing-lg)',
            marginTop: 'var(--spacing-lg)'
          }}>
            <button 
              type="button" 
              onClick={onClose}
              className="btn-navy"
              style={{
                padding: 'var(--spacing-md) var(--spacing-xl)',
                fontSize: '1rem',
                fontWeight: '600'
              }}
            >
              🚫 Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="btn-honey pulse-honey"
              style={{
                padding: 'var(--spacing-md) var(--spacing-xl)',
                fontSize: '1rem',
                fontWeight: '600',
                opacity: loading ? 0.7 : 1,
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? (
                <>
                  <span className="bee-spinner" style={{ display: 'inline-block', marginRight: '0.5rem' }}></span>
                  Creating...
                </>
              ) : (
                '⭐ Create Event'
              )}
            </button>
          </div>
        </form>

        {/* ❌ Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 'var(--spacing-lg)',
            right: 'var(--spacing-lg)',
            background: 'none',
            border: 'none',
            fontSize: '2rem',
            cursor: 'pointer',
            color: 'var(--clubbee-gold-primary)',
            transition: 'var(--transition-normal)',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'var(--clubbee-gold-primary)';
            e.target.style.color = 'var(--clubbee-navy-primary)';
            e.target.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'none';
            e.target.style.color = 'var(--clubbee-gold-primary)';
            e.target.style.transform = 'scale(1)';
          }}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default CreateEventModal;