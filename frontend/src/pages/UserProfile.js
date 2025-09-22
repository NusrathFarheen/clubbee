import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import ImageUpload from '../components/ImageUpload';

const UserProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to get user's joined clubs from localStorage
  const getUserJoinedClubs = (userId) => {
    try {
      const saved = localStorage.getItem('clubMemberships');
      if (saved) {
        const membershipData = JSON.parse(saved);
        const joinedClubs = [];
        
        // Check each club to see if user is a member
        Object.entries(membershipData).forEach(([clubId, members]) => {
          const isMember = members.some(member => 
            member.userId === userId || member === userId
          );
          
          if (isMember) {
            // Get club name from demo data
            const clubNames = {
              '1': { name: '🤖 Robotics Club', category: 'Technology' },
              '2': { name: '🎭 Drama Society', category: 'Arts' },
              '3': { name: '🏀 Basketball Club', category: 'Sports' },
              '4': { name: '📚 Book Club', category: 'Academic' },
              '5': { name: '🎨 Art Society', category: 'Arts' },
              '6': { name: '♻️ Environmental Club', category: 'Service' }
            };
            
            const clubInfo = clubNames[clubId] || { name: 'Unknown Club', category: 'Other' };
            joinedClubs.push({
              _id: clubId,
              ...clubInfo
            });
          }
        });
        
        return joinedClubs;
      }
    } catch (error) {
      console.error('Failed to load joined clubs:', error);
    }
    
    return [];
  };

  // Handle profile picture upload
  const handleProfilePictureUpload = async (imageUrl) => {
    try {
      console.log('Updating profile picture to:', imageUrl);
      
      // Update local state immediately for better UX
      setProfile(prev => ({
        ...prev,
        photoURL: imageUrl
      }));

      // Also store in localStorage for persistence
      if (user) {
        localStorage.setItem(`profilePicture_${user.uid}`, imageUrl);
      }

      // Send to backend (if available)
      if (user) {
        const token = await user.getIdToken();
        try {
          const response = await fetch('http://localhost:3001/api/users/profile', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              photoURL: imageUrl
            })
          });
          
          if (response.ok) {
            console.log('Profile picture updated on backend successfully');
          }
        } catch (err) {
          console.log('Failed to update profile picture on backend:', err);
          // Continue anyway - the image is uploaded to Firebase Storage
        }
      }
    } catch (err) {
      console.error('Failed to update profile picture:', err);
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) return;
      
      try {
        const token = await user.getIdToken();
        try {
          const response = await fetch('/api/users/profile', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (!response.ok) {
            throw new Error('Failed to fetch user profile');
          }
          
          const data = await response.json();
          setProfile(data);
        } catch (apiErr) {
          console.log('API error, using demo profile data:', apiErr.message);
          
          // Get stored profile picture from localStorage
          const storedPhotoURL = localStorage.getItem(`profilePicture_${user.uid}`);
          
          // Get actual joined clubs from localStorage
          const joinedClubs = getUserJoinedClubs(user.uid);
          
          // Provide demo data for hackathon presentation
          setProfile({
            _id: 'demo-user-123',
            name: user.displayName || 'Demo User',
            email: user.email || 'demo@example.com',
            photoURL: storedPhotoURL || user.photoURL, // Use stored or Firebase photo
            role: 'Student',
            createdAt: '2025-08-15T00:00:00.000Z',
            clubsJoined: joinedClubs, // Use actual joined clubs
            badges: [
              '🚀 Early Adopter',
              '🏆 Club Leader',
              '🔍 Event Explorer',
              '⭐ Top Contributor',
              '🎯 Goal Achiever',
              '🤝 Community Builder',
              '🎓 Academic Excellence'
            ]
          });
        }
      } catch (err) {
        console.error('Auth error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [user]);

  if (loading) {
    return (
      <div className="honeycomb-bg" style={{ minHeight: '100vh', padding: '2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: 'var(--spacing-xl)',
            background: 'rgba(255, 255, 255, 0.1)',
            padding: 'var(--spacing-lg)',
            borderRadius: 'var(--radius-lg)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(244, 196, 48, 0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <img 
                src="/clubbee-logo.jpg" 
                alt="CLUBBEE Logo"
                style={{ 
                  width: '60px', 
                  height: '60px', 
                  borderRadius: '12px',
                  objectFit: 'cover',
                  border: '3px solid var(--clubbee-gold-primary)',
                  boxShadow: 'var(--shadow-md)'
                }}
              />
              <div>
                <h2 className="clubbee-text-gold" style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: 'bold', 
                  margin: 0,
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
                }}>
                  👤 My Profile
                </h2>
                <p style={{ 
                  color: 'var(--clubbee-gold-light)', 
                  margin: '0.5rem 0 0 0',
                  fontSize: '1.1rem'
                }}>
                  Manage your account and preferences 🎯
                </p>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div className="loading-spinner">
              <div className="bee-spinner"></div>
              Loading your profile...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="honeycomb-bg" style={{ minHeight: '100vh', padding: '2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: 'var(--spacing-xl)',
            background: 'rgba(255, 255, 255, 0.1)',
            padding: 'var(--spacing-lg)',
            borderRadius: 'var(--radius-lg)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(244, 196, 48, 0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <img 
                src="/clubbee-logo.jpg" 
                alt="CLUBBEE Logo"
                style={{ 
                  width: '60px', 
                  height: '60px', 
                  borderRadius: '12px',
                  objectFit: 'cover',
                  border: '3px solid var(--clubbee-gold-primary)',
                  boxShadow: 'var(--shadow-md)'
                }}
              />
              <div>
                <h2 className="clubbee-text-gold" style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: 'bold', 
                  margin: 0,
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
                }}>
                  👤 My Profile
                </h2>
                <p style={{ 
                  color: 'var(--clubbee-gold-light)', 
                  margin: '0.5rem 0 0 0',
                  fontSize: '1.1rem'
                }}>
                  Manage your account and preferences 🎯
                </p>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#dc2626', padding: '2rem', background: 'white', borderRadius: '12px', border: '2px solid #dc2626' }}>
              Error loading profile: {error}
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="btn-honey"
              style={{ marginTop: '1rem' }}
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="honeycomb-bg" style={{ minHeight: '100vh', padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: 'var(--spacing-xl)',
          background: 'rgba(255, 255, 255, 0.1)',
          padding: 'var(--spacing-lg)',
          borderRadius: 'var(--radius-lg)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(244, 196, 48, 0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img 
              src="/clubbee-logo.jpg" 
              alt="CLUBBEE Logo"
              style={{ 
                width: '60px', 
                height: '60px', 
                borderRadius: '12px',
                objectFit: 'cover',
                border: '3px solid var(--clubbee-gold-primary)',
                boxShadow: 'var(--shadow-md)'
              }} 
            />
            <div>
              <h2 className="clubbee-text-gold" style={{ 
                fontSize: '2.5rem', 
                fontWeight: 'bold', 
                margin: 0,
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
              }}>
                👤 My Profile
              </h2>
              <p style={{ 
                color: 'var(--clubbee-gold-light)', 
                margin: '0.5rem 0 0 0',
                fontSize: '1.1rem'
              }}>
                Manage your account and preferences 🎯
              </p>
            </div>
          </div>
        </div>
      
        {user && (
          <div className="club-card" style={{ marginBottom: '2rem', padding: '2rem' }}>
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
              {/* Profile Picture Section */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '200px' }}>
                <div style={{ position: 'relative', marginBottom: '1rem' }}>
                  <ImageUpload
                    currentImage={profile?.photoURL || user.photoURL}
                    onImageUpload={handleProfilePictureUpload}
                    placeholder="Upload Profile Picture"
                    folder="profile-pictures"
                    maxSize={5 * 1024 * 1024} // 5MB limit for profile pictures
                  />
                </div>
                <p style={{ 
                  fontSize: '0.875rem', 
                  color: 'var(--clubbee-navy-light)', 
                  textAlign: 'center',
                  maxWidth: '180px'
                }}>
                  Click to upload a new profile picture
                </p>
              </div>
              
              {/* Profile Info Section */}
              <div style={{ flex: 1 }}>
                <h3 style={{ 
                  fontSize: '2rem', 
                  fontWeight: 'bold', 
                  marginBottom: '0.5rem',
                  color: 'var(--clubbee-navy-primary)'
                }}>
                  {user.displayName || 'CLUBBEE Member'}
                </h3>
                <p style={{ 
                  color: 'var(--clubbee-navy-light)', 
                  marginBottom: '1.5rem',
                  fontSize: '1.1rem'
                }}>
                  📧 {user.email}
                </p>
                
                {profile && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div style={{ 
                      background: 'var(--clubbee-gold-light)', 
                      padding: '1rem', 
                      borderRadius: '12px',
                      border: '2px solid var(--clubbee-gold-primary)'
                    }}>
                      <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🎓</div>
                      <div style={{ fontWeight: '600', color: 'var(--clubbee-navy-primary)' }}>Role</div>
                      <div style={{ color: 'var(--clubbee-navy-light)' }}>{profile.role}</div>
                    </div>
                    <div style={{ 
                      background: 'var(--clubbee-blue-light)', 
                      padding: '1rem', 
                      borderRadius: '12px',
                      border: '2px solid var(--clubbee-blue-primary)'
                    }}>
                      <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📅</div>
                      <div style={{ fontWeight: '600', color: 'var(--clubbee-navy-primary)' }}>Member Since</div>
                      <div style={{ color: 'var(--clubbee-navy-light)' }}>
                        {new Date(profile.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div style={{ 
                      background: 'var(--clubbee-orange-light)', 
                      padding: '1rem', 
                      borderRadius: '12px',
                      border: '2px solid var(--clubbee-orange-primary)'
                    }}>
                      <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🏛️</div>
                      <div style={{ fontWeight: '600', color: 'var(--clubbee-navy-primary)' }}>Clubs Joined</div>
                      <div style={{ color: 'var(--clubbee-navy-light)' }}>
                        {profile.clubsJoined?.length || 0} clubs
                      </div>
                    </div>
                    <div style={{ 
                      background: 'var(--clubbee-green-light)', 
                      padding: '1rem', 
                      borderRadius: '12px',
                      border: '2px solid var(--clubbee-green-primary)'
                    }}>
                      <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🏆</div>
                      <div style={{ fontWeight: '600', color: 'var(--clubbee-navy-primary)' }}>Badges Earned</div>
                      <div style={{ color: 'var(--clubbee-navy-light)' }}>
                        {profile.badges?.length || 0} badges
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        {profile && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
            {/* My Clubs Section */}
            <div className="club-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <img 
                  src="/clubbee-logo.jpg" 
                  alt="CLUBBEE" 
                  style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '8px', 
                    objectFit: 'cover',
                    border: '2px solid var(--clubbee-blue-primary)',
                    boxShadow: 'var(--shadow-sm)'
                  }} 
                />
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--clubbee-navy-primary)' }}>
                  My Clubs
                </h3>
              </div>
              
              {profile.clubsJoined && profile.clubsJoined.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {profile.clubsJoined.map(club => (
                    <div 
                      key={club._id} 
                      className="event-card"
                      style={{ 
                        padding: '1rem',
                        background: 'var(--clubbee-cream)',
                        border: '2px solid var(--clubbee-gold-light)',
                        borderRadius: '12px'
                      }}
                    >
                      <div style={{ fontWeight: '600', color: 'var(--clubbee-navy-primary)', fontSize: '1.1rem' }}>
                        {club.name}
                      </div>
                      <div style={{ 
                        fontSize: '0.875rem', 
                        color: 'var(--clubbee-navy-light)',
                        marginTop: '0.25rem'
                      }}>
                        📂 {club.category}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--clubbee-navy-light)' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏛️</div>
                  <p>You haven't joined any clubs yet.</p>
                  <p style={{ fontSize: '0.875rem' }}>Explore clubs to find your community!</p>
                </div>
              )}
            </div>
            
            {/* My Badges Section */}
            <div className="club-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <img 
                  src="/clubbee-logo.jpg" 
                  alt="CLUBBEE" 
                  style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '8px', 
                    objectFit: 'cover',
                    border: '2px solid var(--clubbee-gold-primary)',
                    boxShadow: 'var(--shadow-sm)'
                  }} 
                />
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--clubbee-navy-primary)' }}>
                  My Badges
                </h3>
              </div>
              
              {profile.badges && profile.badges.length > 0 ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  {profile.badges.map((badge, index) => (
                    <div 
                      key={index}
                      className="badge-honey"
                      style={{ 
                        background: 'linear-gradient(135deg, var(--clubbee-gold-primary), var(--clubbee-gold-light))',
                        color: 'var(--clubbee-navy-primary)',
                        padding: '0.75rem 1rem', 
                        borderRadius: '20px',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        border: '2px solid var(--clubbee-gold-primary)',
                        boxShadow: 'var(--shadow-md)'
                      }}
                    >
                      {badge}
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--clubbee-navy-light)' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏆</div>
                  <p>You haven't earned any badges yet.</p>
                  <p style={{ fontSize: '0.875rem' }}>Participate in clubs to earn achievements!</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;