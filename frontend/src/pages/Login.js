import React from 'react';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const { signInWithGoogle, loading, error } = useAuth();

  return (
    <div style={{ 
      maxWidth: '400px', 
      margin: '100px auto', 
      padding: '2rem', 
      backgroundColor: 'white', 
      borderRadius: '8px', 
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
        Campus Club Management
      </h2>
      <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#4b5563' }}>
        Sign in with your Google account to access the campus club management system.
      </p>
      
      <button 
        onClick={signInWithGoogle}
        disabled={loading}
        style={{ 
          width: '100%', 
          backgroundColor: '#2563eb', 
          color: 'white', 
          padding: '0.75rem', 
          borderRadius: '4px', 
          border: 'none', 
          cursor: loading ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          opacity: loading ? 0.7 : 1
        }}
      >
        {loading ? 'Signing in...' : 'Sign in with Google'}
      </button>
      
      {error && (
        <div style={{ color: '#dc2626', textAlign: 'center', marginTop: '1rem' }}>
          <p>{error}</p>
          {error.includes('popup') && (
            <div style={{ marginTop: '1rem', fontSize: '0.85rem', backgroundColor: '#fee2e2', padding: '0.75rem', borderRadius: '4px' }}>
              <p><strong>Popup Blocked?</strong></p>
              <p>1. Allow popups for this site in your browser</p>
              <p>2. Check for a popup blocker icon in the address bar</p>
              <p>3. Try clicking the sign-in button again</p>
            </div>
          )}
          {error.includes('unauthorized-domain') && (
            <div style={{ marginTop: '1rem', fontSize: '0.85rem', backgroundColor: '#fee2e2', padding: '0.75rem', borderRadius: '4px' }}>
              <p><strong>Domain Not Authorized</strong></p>
              <p>You need to add 'localhost' to Firebase authorized domains:</p>
              <p>Firebase Console → Authentication → Settings → Authorized domains</p>
            </div>
          )}
          {error.includes('Firebase') && !error.includes('popup') && !error.includes('unauthorized-domain') && (
            <div style={{ marginTop: '1rem', fontSize: '0.85rem', backgroundColor: '#fee2e2', padding: '0.75rem', borderRadius: '4px' }}>
              <p>Firebase configuration may need to be completed.</p>
              <p style={{ marginTop: '0.5rem' }}>Check Firebase Console settings.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Login;