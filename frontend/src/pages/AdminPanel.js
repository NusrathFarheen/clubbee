import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../hooks/useAuth';
import { ProtectedRoute, usePermissions } from './ProtectedRoutes';
import { PERMISSIONS, USER_ROLES } from '../utils/roleManager';

const AdminPanel = () => {
  const { user } = useAuth();
  const { hasPermission } = usePermissions();
  const [emailToPromote, setEmailToPromote] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const promoteToAdmin = async (e) => {
    e.preventDefault();
    if (!emailToPromote) return;

    setLoading(true);
    setMessage('');

    try {
      // For demo purposes, we'll promote the current user if they enter their own email
      if (emailToPromote === user.email) {
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, {
          role: USER_ROLES.ADMIN,
          promotedAt: new Date().toISOString()
        });
        
        setMessage(`✅ Successfully promoted ${emailToPromote} to Admin!`);
        setEmailToPromote('');
        
        // Refresh the page to update user role
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setMessage(`❌ User not found: ${emailToPromote}. For demo purposes, enter your own email.`);
      }
    } catch (error) {
      console.error('Error promoting user:', error);
      setMessage('❌ Failed to promote user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="honeycomb-bg" style={{ minHeight: '100vh', padding: '2rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="card-header" style={{ marginBottom: '2rem' }}>
            <h1 className="page-title">⚙️ Admin Panel</h1>
            <p className="page-subtitle">Manage user roles and permissions</p>
          </div>

          {/* Current User Info */}
          <div className="honeycomb-card" style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: 'var(--clubbee-navy-primary)', marginBottom: '1rem' }}>
              👤 Your Current Role
            </h3>
            <div style={{ 
              background: user?.role === USER_ROLES.ADMIN ? 'var(--clubbee-gold-primary)' : 'var(--clubbee-blue-primary)',
              color: 'white',
              padding: '1rem',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <strong>
                {user?.role === USER_ROLES.ADMIN ? '👑 Admin' : '👥 Member'}
              </strong>
              <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', opacity: 0.9 }}>
                {user?.email}
              </p>
            </div>
          </div>

          {/* Promote User Form */}
          <div className="honeycomb-card">
            <h3 style={{ color: 'var(--clubbee-navy-primary)', marginBottom: '1rem' }}>
              🔑 Promote User to Admin
            </h3>
            
            {user?.role !== USER_ROLES.ADMIN && (
              <div style={{
                background: 'var(--clubbee-orange-primary)',
                color: 'white',
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '1rem'
              }}>
                <strong>Demo Mode:</strong> Enter your own email below to promote yourself to Admin and unlock news publishing features!
              </div>
            )}

            <form onSubmit={promoteToAdmin}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '600',
                  color: 'var(--clubbee-navy-primary)'
                }}>
                  📧 User Email
                </label>
                <input
                  type="email"
                  value={emailToPromote}
                  onChange={(e) => setEmailToPromote(e.target.value)}
                  placeholder="Enter email address to promote"
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid var(--clubbee-gold-primary)',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-honey"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  fontSize: '1rem',
                  fontWeight: '600'
                }}
              >
                {loading ? 'Promoting...' : '🚀 Promote to Admin'}
              </button>
            </form>

            {message && (
              <div style={{
                marginTop: '1rem',
                padding: '1rem',
                borderRadius: '8px',
                background: message.includes('✅') ? 'var(--clubbee-green-primary)' : 'var(--clubbee-orange-primary)',
                color: 'white',
                textAlign: 'center'
              }}>
                {message}
              </div>
            )}
          </div>

          {/* Admin Features Preview */}
          {user?.role === USER_ROLES.ADMIN && (
            <div className="honeycomb-card" style={{ marginTop: '2rem' }}>
              <h3 style={{ color: 'var(--clubbee-navy-primary)', marginBottom: '1rem' }}>
                👑 Admin Features Unlocked
              </h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div style={{ 
                  padding: '1rem', 
                  background: 'var(--clubbee-gold-light)', 
                  borderRadius: '8px' 
                }}>
                  ✅ <strong>News Publishing:</strong> Create and publish news articles
                </div>
                <div style={{ 
                  padding: '1rem', 
                  background: 'var(--clubbee-blue-light)', 
                  borderRadius: '8px' 
                }}>
                  ✅ <strong>Club Management:</strong> Edit club details and manage members
                </div>
                <div style={{ 
                  padding: '1rem', 
                  background: 'var(--clubbee-green-light)', 
                  borderRadius: '8px' 
                }}>
                  ✅ <strong>Event Moderation:</strong> Edit and manage events
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminPanel;