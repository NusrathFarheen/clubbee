import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Sample notifications for demo
  useEffect(() => {
    if (user) {
      const sampleNotifications = [
        {
          id: '1',
          type: 'club_invite',
          title: 'Club Invitation',
          message: 'You have been invited to join the Photography Club',
          timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
          read: false,
          icon: '🏛️',
          actionUrl: '/clubs'
        },
        {
          id: '2',
          type: 'event_reminder',
          title: 'Event Reminder',
          message: 'Tech Talk: AI in Healthcare starts in 2 hours',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
          read: false,
          icon: '🎉',
          actionUrl: '/events'
        },
        {
          id: '3',
          type: 'news',
          title: 'Campus News',
          message: 'New academic year registration is now open',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
          read: true,
          icon: '📰',
          actionUrl: '/news'
        },
        {
          id: '4',
          type: 'achievement',
          title: 'Achievement Unlocked!',
          message: 'You earned the "Active Member" badge',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
          read: false,
          icon: '🏆',
          actionUrl: '/profile'
        }
      ];
      
      setNotifications(sampleNotifications);
      setUnreadCount(sampleNotifications.filter(n => !n.read).length);
    }
  }, [user]);

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
      ...notification
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    setUnreadCount(prev => prev + 1);
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true }
          : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    setUnreadCount(0);
  };

  const clearNotification = (notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
    const notification = notifications.find(n => n.id === notificationId);
    if (notification && !notification.read) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  const value = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    clearNotification,
    clearAllNotifications
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};