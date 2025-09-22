// Role management utilities for CLUBBEE
export const USER_ROLES = {
  MEMBER: 'member',
  ADMIN: 'admin',
  SUPER_ADMIN: 'super_admin'
};

export const PERMISSIONS = {
  // Club permissions
  CREATE_CLUB: 'create_club',
  EDIT_CLUB: 'edit_club',
  DELETE_CLUB: 'delete_club',
  MANAGE_CLUB_MEMBERS: 'manage_club_members',
  
  // Event permissions
  CREATE_EVENT: 'create_event',
  EDIT_EVENT: 'edit_event',
  DELETE_EVENT: 'delete_event',
  MANAGE_EVENT_ATTENDEES: 'manage_event_attendees',
  
  // News permissions
  CREATE_NEWS: 'create_news',
  EDIT_NEWS: 'edit_news',
  DELETE_NEWS: 'delete_news',
  
  // Forum permissions (for future)
  CREATE_FORUM_POST: 'create_forum_post',
  MODERATE_FORUM: 'moderate_forum',
  
  // Admin permissions
  MANAGE_USERS: 'manage_users',
  VIEW_ANALYTICS: 'view_analytics'
};

// Role-permission mapping
export const ROLE_PERMISSIONS = {
  [USER_ROLES.MEMBER]: [
    PERMISSIONS.CREATE_CLUB,
    PERMISSIONS.CREATE_EVENT,
    PERMISSIONS.CREATE_FORUM_POST
  ],
  
  [USER_ROLES.ADMIN]: [
    // All member permissions plus admin permissions
    ...ROLE_PERMISSIONS[USER_ROLES.MEMBER] || [],
    PERMISSIONS.EDIT_CLUB,
    PERMISSIONS.MANAGE_CLUB_MEMBERS,
    PERMISSIONS.EDIT_EVENT,
    PERMISSIONS.MANAGE_EVENT_ATTENDEES,
    PERMISSIONS.CREATE_NEWS,
    PERMISSIONS.EDIT_NEWS,
    PERMISSIONS.MODERATE_FORUM
  ],
  
  [USER_ROLES.SUPER_ADMIN]: [
    // All permissions
    ...Object.values(PERMISSIONS)
  ]
};

// Helper functions
export const hasPermission = (userRole, permission) => {
  if (!userRole || !permission) return false;
  const rolePermissions = ROLE_PERMISSIONS[userRole] || [];
  return rolePermissions.includes(permission);
};

export const hasAnyPermission = (userRole, permissions) => {
  if (!userRole || !permissions || !Array.isArray(permissions)) return false;
  return permissions.some(permission => hasPermission(userRole, permission));
};

export const hasAllPermissions = (userRole, permissions) => {
  if (!userRole || !permissions || !Array.isArray(permissions)) return false;
  return permissions.every(permission => hasPermission(userRole, permission));
};

// Check if user is admin of a specific club
export const isClubAdmin = (user, clubId) => {
  if (!user || !clubId) return false;
  
  // Check if user has admin role globally
  if (user.role === USER_ROLES.SUPER_ADMIN) return true;
  
  // Check if user is admin of this specific club
  return user.clubAdminRoles && user.clubAdminRoles.includes(clubId);
};

// Check if user can perform action on club
export const canManageClub = (user, clubId) => {
  if (!user || !clubId) return false;
  
  // Super admins can manage any club
  if (user.role === USER_ROLES.SUPER_ADMIN) return true;
  
  // Club creators can manage their clubs
  if (user.createdClubs && user.createdClubs.includes(clubId)) return true;
  
  // Club admins can manage their clubs
  return isClubAdmin(user, clubId);
};

export default {
  USER_ROLES,
  PERMISSIONS,
  ROLE_PERMISSIONS,
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
  isClubAdmin,
  canManageClub
};