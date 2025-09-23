import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { hasPermission, hasAnyPermission, hasAllPermissions, canManageClub } from '../utils/roleManager';

// Simple component to protect routes based on authentication
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
    return fallback || <Navigate to="/login" />;
  }
  
  return children;
};

// Component to protect routes based on user permissions
export const PermissionRoute = ({ children, permissions, requireAll = false, fallback = null }) => {
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
    return fallback || <Navigate to="/login" />;
  }
  
  const hasAccess = requireAll 
    ? hasAllPermissions(user.role, permissions)
    : hasAnyPermission(user.role, permissions);
    
  if (!hasAccess) {
    return fallback || (
      <div style={{ 
        textAlign: 'center', 
        padding: '2rem',
        background: 'var(--clubbee-navy-primary)',
        color: 'white',
        borderRadius: '8px',
        margin: '2rem'
      }}>
        <h2>Access Denied</h2>
        <p>You don't have permission to access this resource.</p>
      </div>
    );
  }
  
  return children;
};

// Component to conditionally render based on authentication
export const ConditionalRender = ({ children, fallback = null, condition }) => {
  const { user } = useAuth();
  
  if (!user || !condition(user)) {
    return fallback || null;
  }
  
  return children;
};

export default { ProtectedRoute, PermissionRoute, ConditionalRender };