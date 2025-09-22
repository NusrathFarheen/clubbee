import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { hasPermission, hasAnyPermission, canManageClub } from '../utils/roleManager';

// Component to protect routes based on authentication
export const ProtectedRoute = ({ children, fallback = null }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh' 
      }}>
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }
  
  if (!user) {
    return fallback || (
      <div style={{ 
        textAlign: 'center', 
        padding: '2rem',
        background: 'var(--clubbee-navy-primary)',
        color: 'white',
        borderRadius: '8px',
        margin: '2rem'
      }}>
        <h2>🔒 Authentication Required</h2>
        <p>Please log in to access this feature.</p>
      </div>
    );
  }
  
  return children;
};

// Component to protect routes based on permissions
export const PermissionProtectedRoute = ({ 
  children, 
  permission, 
  permissions, 
  requireAll = false,
  fallback = null 
}) => {
  const { user } = useAuth();
  
  let hasAccess = false;
  
  if (permission) {
    hasAccess = hasPermission(user?.role, permission);
  } else if (permissions) {
    hasAccess = requireAll 
      ? hasAllPermissions(user?.role, permissions)
      : hasAnyPermission(user?.role, permissions);
  }
  
  if (!hasAccess) {
    return fallback || (
      <div style={{ 
        textAlign: 'center', 
        padding: '2rem',
        background: 'var(--clubbee-orange-primary)',
        color: 'white',
        borderRadius: '8px',
        margin: '2rem'
      }}>
        <h2>🚫 Access Denied</h2>
        <p>You don't have permission to access this feature.</p>
      </div>
    );
  }
  
  return children;
};

// Component to protect club-specific actions
export const ClubProtectedRoute = ({ 
  children, 
  clubId, 
  requireOwnership = false,
  fallback = null 
}) => {
  const { user } = useAuth();
  
  const hasAccess = requireOwnership 
    ? canManageClub(user, clubId)
    : user && (canManageClub(user, clubId) || user.role === 'member');
  
  if (!hasAccess) {
    return fallback || (
      <div style={{ 
        textAlign: 'center', 
        padding: '2rem',
        background: 'var(--clubbee-orange-primary)',
        color: 'white',
        borderRadius: '8px',
        margin: '2rem'
      }}>
        <h2>🏛️ Club Access Required</h2>
        <p>You need appropriate club permissions to access this feature.</p>
      </div>
    );
  }
  
  return children;
};

// Component to conditionally render content based on permissions
export const ConditionalRender = ({ 
  permission, 
  permissions, 
  requireAll = false,
  clubId,
  requireClubOwnership = false,
  children,
  fallback = null 
}) => {
  const { user } = useAuth();
  
  let shouldRender = false;
  
  // Check authentication
  if (!user) {
    return fallback;
  }
  
  // Check club permissions
  if (clubId) {
    shouldRender = requireClubOwnership 
      ? canManageClub(user, clubId)
      : true; // User is authenticated
  }
  
  // Check general permissions
  else if (permission) {
    shouldRender = hasPermission(user.role, permission);
  } else if (permissions) {
    shouldRender = requireAll 
      ? hasAllPermissions(user.role, permissions)
      : hasAnyPermission(user.role, permissions);
  } else {
    // No specific permissions required, just authentication
    shouldRender = true;
  }
  
  return shouldRender ? children : fallback;
};

// Hook for checking permissions in components
export const usePermissions = () => {
  const { user } = useAuth();
  
  return {
    hasPermission: (permission) => hasPermission(user?.role, permission),
    hasAnyPermission: (permissions) => hasAnyPermission(user?.role, permissions),
    hasAllPermissions: (permissions) => hasAllPermissions(user?.role, permissions),
    canManageClub: (clubId) => canManageClub(user, clubId),
    isAuthenticated: !!user,
    userRole: user?.role,
    user
  };
};

export default {
  ProtectedRoute,
  PermissionProtectedRoute,
  ClubProtectedRoute,
  ConditionalRender,
  usePermissions
};