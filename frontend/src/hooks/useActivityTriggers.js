import { useActivity } from '../contexts/ActivityContext';
import { useAuth } from './useAuth';

export const useActivityTriggers = () => {
  const { addActivity } = useActivity();
  const { user } = useAuth();

  const triggerClubJoin = (clubName) => {
    addActivity({
      type: 'club_join',
      user: user?.displayName || 'Unknown User',
      action: 'joined',
      target: clubName,
      icon: '👥',
      color: 'text-green-600'
    });
  };

  const triggerClubCreate = (clubName) => {
    addActivity({
      type: 'club_create',
      user: user?.displayName || 'Unknown User',
      action: 'created',
      target: clubName,
      icon: '🎯',
      color: 'text-purple-600'
    });
  };

  const triggerEventCreate = (eventTitle) => {
    addActivity({
      type: 'event_create',
      user: user?.displayName || 'Unknown User',
      action: 'created event',
      target: eventTitle,
      icon: '📅',
      color: 'text-blue-600'
    });
  };

  const triggerEventRSVP = (eventTitle) => {
    addActivity({
      type: 'event_rsvp',
      user: user?.displayName || 'Unknown User',
      action: 'RSVPed to',
      target: eventTitle,
      icon: '✅',
      color: 'text-green-600'
    });
  };

  const triggerNewsPost = (newsTitle) => {
    addActivity({
      type: 'news_post',
      user: user?.displayName || 'Unknown User',
      action: 'posted news',
      target: newsTitle,
      icon: '📰',
      color: 'text-orange-600'
    });
  };

  const triggerAchievement = (badgeName) => {
    addActivity({
      type: 'achievement',
      user: user?.displayName || 'Unknown User',
      action: 'earned badge',
      target: badgeName,
      icon: '🏆',
      color: 'text-yellow-600'
    });
  };

  const triggerCustomActivity = (type, action, target, icon = '📌', color = 'text-gray-600') => {
    addActivity({
      type,
      user: user?.displayName || 'Unknown User',
      action,
      target,
      icon,
      color
    });
  };

  return {
    triggerClubJoin,
    triggerClubCreate,
    triggerEventCreate,
    triggerEventRSVP,
    triggerNewsPost,
    triggerAchievement,
    triggerCustomActivity
  };
};