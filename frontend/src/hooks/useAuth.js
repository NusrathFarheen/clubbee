import { useState, useEffect, createContext, useContext } from 'react';
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth } from '../firebase';

// Create Auth Context
const AuthContext = createContext(null);

// Auth Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    }, (error) => {
      setError(error.message);
      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);
  
  // Google Sign In
  const signInWithGoogle = async () => {
    setLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      // Add additional scopes if needed
      provider.addScope('email');
      provider.addScope('profile');
      
      const result = await signInWithPopup(auth, provider);
      
      // Send the user info to your backend
      if (result.user) {
        try {
          const token = await result.user.getIdToken();
          const response = await fetch('http://localhost:3001/api/users/auth', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              uid: result.user.uid,
              email: result.user.email,
              displayName: result.user.displayName,
              photoURL: result.user.photoURL
            })
          });
          
          if (!response.ok) {
            console.warn("Failed to register user with backend, but login successful");
          }
        } catch (err) {
          console.error("Failed to register user with backend:", err);
          // Don't throw error here - user is still logged in successfully
        }
      }
    } catch (err) {
      let errorMessage = err.message;
      
      // Handle specific Firebase auth errors
      if (err.code === 'auth/popup-blocked') {
        errorMessage = 'Popup was blocked by browser. Please allow popups for this site and try again.';
      } else if (err.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Sign-in was cancelled. Please try again.';
      } else if (err.code === 'auth/unauthorized-domain') {
        errorMessage = 'This domain is not authorized for sign-in. Please contact support.';
      }
      
      setError(errorMessage);
      console.error("Firebase authentication error:", err);
    } finally {
      setLoading(false);
    }
  };
  
  // Sign Out
  const logOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const value = {
    user,
    loading,
    error,
    signInWithGoogle,
    logOut
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};