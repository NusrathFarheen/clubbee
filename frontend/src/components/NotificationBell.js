import React, { useState, useRef, useEffect } from 'react';
import { useNotifications } from '../contexts/NotificationContext';

const NotificationBell = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearNotification } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    
    // Navigate to the action URL if provided
    if (notification.actionUrl) {
      window.location.href = notification.actionUrl;
    }
  };

  return (
    <div className="notification-bell" ref={dropdownRef} style={{ position: 'relative' }}>
      {/* Bell Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'relative',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '0.5rem',
          borderRadius: 'var(--radius-md)',
          transition: 'var(--transition-normal)',
          color: 'var(--clubbee-gold-light)'
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
        <span style={{ fontSize: '1.25rem' }}>🔔</span>
        
        {/* Unread Count Badge */}
        {unreadCount > 0 && (
          <span
            style={{
              position: 'absolute',
              top: '0.25rem',
              right: '0.25rem',
              background: 'var(--clubbee-coral)',
              color: 'white',
              borderRadius: '50%',
              width: '18px',
              height: '18px',
              fontSize: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            right: '0',
            marginTop: '0.5rem',
            width: '350px',
            maxHeight: '400px',
            overflowY: 'auto',
            background: 'white',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-xl)',
            border: '1px solid var(--clubbee-gold-light)',
            zIndex: 1000
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '1rem',
              borderBottom: '1px solid var(--border-light)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'var(--clubbee-navy-light)',
              borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0'
            }}
          >
            <h3 style={{ margin: 0, color: 'var(--clubbee-gold-primary)', fontSize: '1rem' }}>
              Notifications ({unreadCount} unread)
            </h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--clubbee-gold-light)',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  textDecoration: 'underline'
                }}
              >
                Mark all read
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {notifications.length === 0 ? (
              <div
                style={{
                  padding: '2rem',
                  textAlign: 'center',
                  color: 'var(--text-muted)',
                  fontSize: '0.875rem'
                }}
              >
                <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>📭</span>
                No notifications yet
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  style={{
                    padding: '0.75rem 1rem',
                    borderBottom: '1px solid var(--border-light)',
                    cursor: 'pointer',
                    transition: 'var(--transition-normal)',
                    background: notification.read ? 'transparent' : 'rgba(244, 196, 48, 0.05)',
                    borderLeft: notification.read ? 'none' : '3px solid var(--clubbee-gold-primary)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'var(--bg-hover)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = notification.read ? 'transparent' : 'rgba(244, 196, 48, 0.05)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.25rem', marginTop: '0.125rem' }}>
                      {notification.icon}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h4
                          style={{
                            margin: 0,
                            fontSize: '0.875rem',
                            fontWeight: notification.read ? '500' : '600',
                            color: notification.read ? 'var(--text-muted)' : 'var(--clubbee-navy-primary)'
                          }}
                        >
                          {notification.title}
                        </h4>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            clearNotification(notification.id);
                          }}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'var(--text-muted)',
                            fontSize: '0.75rem',
                            padding: '0.125rem'
                          }}
                        >
                          ✕
                        </button>
                      </div>
                      <p
                        style={{
                          margin: '0.25rem 0 0 0',
                          fontSize: '0.8125rem',
                          color: 'var(--text-secondary)',
                          lineHeight: '1.4'
                        }}
                      >
                        {notification.message}
                      </p>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          color: 'var(--text-muted)',
                          marginTop: '0.25rem',
                          display: 'block'
                        }}
                      >
                        {formatTimeAgo(notification.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div
              style={{
                padding: '0.75rem 1rem',
                borderTop: '1px solid var(--border-light)',
                textAlign: 'center',
                background: 'var(--bg-subtle)'
              }}
            >
              <button
                onClick={() => {
                  setIsOpen(false);
                  // Navigate to a dedicated notifications page if you have one
                  // window.location.href = '/notifications';
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--clubbee-navy-primary)',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  textDecoration: 'underline'
                }}
              >
                View All Notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;