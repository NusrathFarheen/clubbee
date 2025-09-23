import { useNotifications } from '../contexts/NotificationContext';

// Notification types and their default configurations
const NOTIFICATION_TYPES = {
  CLUB_INVITE: {
    icon: '🏛️',
    type: 'club_invite'
  },
  EVENT_REMINDER: {
    icon: '🎉',
    type: 'event_reminder'
  },
  EVENT_CREATED: {
    icon: '🎉',
    type: 'event_created'
  },
  CLUB_JOINED: {
    icon: '🏛️',
    type: 'club_joined'
  },
  NEWS_POSTED: {
    icon: '📰',
    type: 'news'
  },
  ACHIEVEMENT: {
    icon: '🏆',
    type: 'achievement'
  },
  MEMBER_JOINED: {
    icon: '👥',
    type: 'member_joined'
  },
  GENERAL: {
    icon: '📢',
    type: 'general'
  }
};

export const useNotificationTriggers = () => {
  const { addNotification } = useNotifications();

  const triggerClubInvite = (clubName, actionUrl = '/clubs') => {
    addNotification({
      ...NOTIFICATION_TYPES.CLUB_INVITE,
      title: 'Club Invitation',
      message: `You have been invited to join ${clubName}`,
      actionUrl
    });
  };

  const triggerEventReminder = (eventName, timeUntil, actionUrl = '/events') => {
    addNotification({
      ...NOTIFICATION_TYPES.EVENT_REMINDER,
      title: 'Event Reminder',
      message: `${eventName} starts ${timeUntil}`,
      actionUrl
    });
  };

  const triggerEventCreated = (eventName, clubName, actionUrl = '/events') => {
    addNotification({
      ...NOTIFICATION_TYPES.EVENT_CREATED,
      title: 'New Event Created',
      message: `${clubName} has created a new event: ${eventName}`,
      actionUrl
    });
  };

  const triggerClubJoined = (clubName, actionUrl = '/clubs') => {
    addNotification({
      ...NOTIFICATION_TYPES.CLUB_JOINED,
      title: 'Club Joined Successfully',
      message: `Welcome to ${clubName}! You are now a member.`,
      actionUrl
    });
  };

  const triggerNewsPosted = (newsTitle, actionUrl = '/news') => {
    addNotification({
      ...NOTIFICATION_TYPES.NEWS_POSTED,
      title: 'Campus News',
      message: newsTitle,
      actionUrl
    });
  };

  const triggerAchievement = (achievementName, actionUrl = '/profile') => {
    addNotification({
      ...NOTIFICATION_TYPES.ACHIEVEMENT,
      title: 'Achievement Unlocked!',
      message: `You earned the "${achievementName}" badge`,
      actionUrl
    });
  };

  const triggerMemberJoined = (memberName, clubName, actionUrl = '/clubs') => {
    addNotification({
      ...NOTIFICATION_TYPES.MEMBER_JOINED,
      title: 'New Member',
      message: `${memberName} joined ${clubName}`,
      actionUrl
    });
  };

  const triggerGeneral = (title, message, actionUrl = null) => {
    addNotification({
      ...NOTIFICATION_TYPES.GENERAL,
      title,
      message,
      actionUrl
    });
  };

  return {
    triggerClubInvite,
    triggerEventReminder,
    triggerEventCreated,
    triggerClubJoined,
    triggerNewsPosted,
    triggerAchievement,
    triggerMemberJoined,
    triggerGeneral
  };
};

export default useNotificationTriggers;