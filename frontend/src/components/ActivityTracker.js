import React, { useState } from 'react';
import { useActivity } from '../contexts/ActivityContext';
import './ActivityTracker.css';

const ActivityTracker = () => {
  const { activities, getRecentActivities, getActivitiesByType, formatTimestamp } = useActivity();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState(24);

  // Activity type icons mapping
  const activityIcons = {
    'club_join': '👥',
    'club_create': '🎯',
    'event_create': '📅',
    'event_rsvp': '✅',
    'news_post': '📰',
    'achievement': '🏆'
  };

  // Filter activities based on selected criteria
  const getFilteredActivities = () => {
    let filtered = activities;

    // Apply time filter
    if (timeFilter > 0) {
      filtered = getRecentActivities(timeFilter);
    }

    // Apply type filter
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(activity => activity.type === selectedFilter);
    }

    return filtered.slice(0, 20); // Show max 20 activities
  };

  const filteredActivities = getFilteredActivities();

  const activityTypes = [
    { value: 'all', label: 'All Activities', icon: '📊' },
    { value: 'club_join', label: 'Club Joins', icon: '👥' },
    { value: 'club_create', label: 'New Clubs', icon: '🎯' },
    { value: 'event_create', label: 'New Events', icon: '📅' },
    { value: 'event_rsvp', label: 'Event RSVPs', icon: '✅' },
    { value: 'news_post', label: 'News Posts', icon: '📰' },
    { value: 'achievement', label: 'Achievements', icon: '🏆' }
  ];

  const timeFilters = [
    { value: 1, label: 'Last Hour' },
    { value: 6, label: 'Last 6 Hours' },
    { value: 24, label: 'Last 24 Hours' },
    { value: 168, label: 'Last Week' },
    { value: 0, label: 'All Time' }
  ];

  const getBadgeClass = (type) => {
    return `activity-badge ${type.replace('_', '-')}`;
  };

  const getTypeLabel = (type) => {
    return activityTypes.find(t => t.value === type)?.label || 'Activity';
  };

  return (
    <div className="recent-activity-container">
      {/* Header with Title and Filters */}
      <div className="activity-header">
        <h2 className="activity-title">
          <span className="icon">📈</span>
          Recent Activity
        </h2>
        
        <div className="activity-filters">
          {/* Type Filter */}
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="activity-filter-select"
          >
            {activityTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.icon} {type.label}
              </option>
            ))}
          </select>

          {/* Time Filter */}
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(Number(e.target.value))}
            className="activity-filter-select"
          >
            {timeFilters.map((filter) => (
              <option key={filter.value} value={filter.value}>
                {filter.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="activity-feed">
        {filteredActivities.length === 0 ? (
          <div className="activity-empty">
            <div className="icon">🔍</div>
            <p>No activities found for the selected filters.</p>
          </div>
        ) : (
          filteredActivities.map((activity) => (
            <div key={activity.id} className="activity-item">
              <div className="activity-item-content">
                <div className="activity-icon">
                  {activityIcons[activity.type] || '📌'}
                </div>
                
                <div className="activity-details">
                  <div className="activity-main-text">
                    <span className="activity-user">{activity.user}</span>
                    <span className="activity-action"> {activity.action} </span>
                    <span className="activity-target">{activity.target}</span>
                  </div>
                  
                  <div className="activity-meta">
                    <span className={getBadgeClass(activity.type)}>
                      {getTypeLabel(activity.type)}
                    </span>
                    <span className="activity-timestamp">
                      {formatTimestamp(activity.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Activity Summary Statistics */}
      <div className="activity-summary">
        <div className="activity-summary-grid">
          <div className="summary-item">
            <span className="summary-number">
              {getRecentActivities(24).length}
            </span>
            <span className="summary-label">Today</span>
          </div>
          <div className="summary-item">
            <span className="summary-number">
              {getActivitiesByType('club_join').length}
            </span>
            <span className="summary-label">Club Joins</span>
          </div>
          <div className="summary-item">
            <span className="summary-number">
              {getActivitiesByType('event_create').length}
            </span>
            <span className="summary-label">New Events</span>
          </div>
          <div className="summary-item">
            <span className="summary-number">
              {getActivitiesByType('news_post').length}
            </span>
            <span className="summary-label">News Posts</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityTracker;