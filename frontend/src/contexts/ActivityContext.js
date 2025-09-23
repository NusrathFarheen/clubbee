import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

const ActivityContext = createContext();

export const useActivity = () => {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error('useActivity must be used within an ActivityProvider');
  }
  return context;
};

export const ActivityProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Sample activity data for development
  const sampleActivities = [
    {
      id: 1,
      type: 'club_join',
      user: 'John Doe',
      action: 'joined',
      target: 'Tech Club',
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      icon: '👥',
      color: 'text-green-600'
    },
    {
      id: 2,
      type: 'event_create',
      user: 'Sarah Wilson',
      action: 'created event',
      target: 'React Workshop',
      timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      icon: '📅',
      color: 'text-blue-600'
    },
    {
      id: 3,
      type: 'club_create',
      user: 'Mike Johnson',
      action: 'created',
      target: 'Photography Club',
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      icon: '🎯',
      color: 'text-purple-600'
    },
    {
      id: 4,
      type: 'event_rsvp',
      user: 'Emily Chen',
      action: 'RSVPed to',
      target: 'Code Review Session',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
      icon: '✅',
      color: 'text-green-600'
    },
    {
      id: 5,
      type: 'news_post',
      user: 'Alex Rodriguez',
      action: 'posted news',
      target: 'Weekly Campus Update',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      icon: '📰',
      color: 'text-orange-600'
    },
    {
      id: 6,
      type: 'achievement',
      user: 'Lisa Park',
      action: 'earned badge',
      target: 'Event Organizer',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      icon: '🏆',
      color: 'text-yellow-600'
    }
  ];

  useEffect(() => {
    // Initialize with sample data
    setActivities(sampleActivities);
  }, []);

  // Function to add new activity
  const addActivity = (activity) => {
    const newActivity = {
      id: Date.now(),
      timestamp: new Date(),
      ...activity
    };
    
    setActivities(prev => [newActivity, ...prev].slice(0, 50)); // Keep last 50 activities
  };

  // Function to get recent activities (last 24 hours)
  const getRecentActivities = (hours = 24) => {
    const cutoff = new Date(Date.now() - hours * 60 * 60 * 1000);
    return activities.filter(activity => activity.timestamp > cutoff);
  };

  // Function to get activities by type
  const getActivitiesByType = (type) => {
    return activities.filter(activity => activity.type === type);
  };

  // Function to get user-specific activities
  const getUserActivities = (username) => {
    return activities.filter(activity => activity.user === username);
  };

  // Helper function to format timestamp
  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const value = {
    activities,
    loading,
    addActivity,
    getRecentActivities,
    getActivitiesByType,
    getUserActivities,
    formatTimestamp
  };

  return (
    <ActivityContext.Provider value={value}>
      {children}
    </ActivityContext.Provider>
  );
};