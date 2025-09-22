import React, { useState } from 'react';
import { useClubs } from '../hooks/useApi';
import { useAuth } from '../hooks/useAuth';
import CreateClubModal from '../components/CreateClubModal';

const Clubs = () => {
  const { clubs, loading, error, refresh, joinClub, leaveClub } = useClubs();
  const { user } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [joiningClub, setJoiningClub] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  const categories = [
    'Technology', 'Arts', 'Sports', 'Science', 'Business', 
    'Social', 'Academic', 'Music', 'Photography', 'Gaming', 
    'Environment', 'Volunteer', 'Other'
  ];

  const handleClubCreated = (newClub) => {
    console.log('=== CLUB CREATED HANDLER ===');
    console.log('New club received:', newClub);
    
    // Refresh the clubs list to include the new club
    refresh();
    console.log('Refreshing clubs list to include new Firestore club');
  };

  const handleJoinClub = async (clubId, clubName) => {
    if (!user) {
      showToast('Please log in to join clubs', 'error');
      return;
    }

    setJoiningClub(clubId);
    try {
      await joinClub(clubId, user.uid, user.displayName || user.email);
      console.log(`Successfully joined ${clubName}`);
      showToast(`🎉 Welcome to ${clubName}! You're now a member`, 'success');
    } catch (error) {
      console.error('Error joining club:', error);
      if (error.message.includes('already a member')) {
        showToast('You are already a member of this club!', 'info');
      } else {
        showToast('Failed to join club. Please try again.', 'error');
      }
    } finally {
      setJoiningClub(null);
    }
  };

  const handleLeaveClub = async (clubId, clubName) => {
    if (!user) {
      showToast('Please log in to leave clubs', 'error');
      return;
    }

    if (!window.confirm(`Are you sure you want to leave ${clubName}?`)) {
      return;
    }

    setJoiningClub(clubId);
    try {
      await leaveClub(clubId, user.uid);
      console.log(`Successfully left ${clubName}`);
      showToast(`👋 You've left ${clubName}. We'll miss you!`, 'success');
    } catch (error) {
      console.error('Error leaving club:', error);
      showToast('Failed to leave club. Please try again.', 'error');
    } finally {
      setJoiningClub(null);
    }
  };

  const isUserMember = (club) => {
    if (!user || !club.members) return false;
    return club.members.some(member => 
      member.userId === user.uid || member === user.uid
    );
  };

  // Filter clubs based on search and category
  const filteredClubs = clubs.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         club.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || club.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Clubs</h2>
        <p>Loading clubs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Clubs</h2>
        <p style={{ color: '#dc2626' }}>Error loading clubs: {error}</p>
      </div>
    );
  }

  return (
    <div className="honeycomb-bg" style={{ minHeight: '100vh', padding: 'var(--spacing-lg)' }}>
      {/* Toast Notification */}
      {toast.show && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 1000,
          background: toast.type === 'success' ? 'var(--clubbee-green-primary)' :
                     toast.type === 'error' ? '#dc2626' :
                     toast.type === 'info' ? 'var(--clubbee-blue-primary)' : 'var(--clubbee-gold-primary)',
          color: 'white',
          padding: '1rem 1.5rem',
          borderRadius: '12px',
          boxShadow: 'var(--shadow-lg)',
          fontWeight: '600',
          fontSize: '1rem',
          maxWidth: '400px',
          animation: 'slideInRight 0.3s ease-out'
        }}>
          {toast.message}
        </div>
      )}
      
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* 🐝 Header Section */}
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
                🏛️ Campus Clubs
              </h2>
              <p style={{ 
                color: 'var(--clubbee-gold-light)', 
                margin: '0.5rem 0 0 0',
                fontSize: '1.1rem'
              }}>
                Connect with communities that inspire you 🐝
              </p>
            </div>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="btn-honey pulse-honey"
            style={{ 
              fontSize: '1rem',
              padding: 'var(--spacing-md) var(--spacing-xl)',
              fontWeight: '600'
            }}
          >
            ✨ Create New Club
          </button>
        </div>

        {/* 🔍 Search and Filter Section */}
        <div className="honeycomb-card" style={{ 
          marginBottom: 'var(--spacing-xl)', 
          display: 'flex', 
          gap: 'var(--spacing-lg)', 
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          <div style={{ flex: 1, minWidth: '250px' }}>
            <input
              type="text"
              placeholder="🔍 Search clubs by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: 'var(--spacing-md)',
                border: '2px solid var(--clubbee-gold-primary)',
                borderRadius: 'var(--radius-lg)',
                fontSize: '1rem',
                background: 'rgba(255, 255, 255, 0.9)',
                color: 'var(--clubbee-navy-primary)',
                transition: 'var(--transition-normal)'
              }}
              onFocus={(e) => {
                e.target.style.boxShadow = 'var(--shadow-honey)';
                e.target.style.transform = 'scale(1.02)';
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = 'none';
                e.target.style.transform = 'scale(1)';
              }}
            />
          </div>
          <div style={{ minWidth: '200px' }}>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                width: '100%',
                padding: 'var(--spacing-md)',
                border: '2px solid var(--clubbee-gold-primary)',
                borderRadius: 'var(--radius-lg)',
                fontSize: '1rem',
                background: 'rgba(255, 255, 255, 0.9)',
                color: 'var(--clubbee-navy-primary)',
                cursor: 'pointer'
              }}
            >
              <option value="">🌟 All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'Technology' && '💻'} 
                  {category === 'Arts' && '🎨'} 
                  {category === 'Sports' && '⚽'} 
                  {category === 'Science' && '🔬'} 
                  {category === 'Business' && '💼'} 
                  {category === 'Social' && '👥'} 
                  {category === 'Academic' && '📚'} 
                  {category === 'Music' && '🎵'} 
                  {category === 'Photography' && '📸'} 
                  {category === 'Gaming' && '🎮'} 
                  {category === 'Environment' && '🌱'} 
                  {category === 'Volunteer' && '🤝'} 
                  {category === 'Other' && '✨'} 
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ⚠️ Error Message */}
        {error && (
          <div className="message-warning" style={{ marginBottom: 'var(--spacing-lg)' }}>
            {error}
          </div>
        )}
        
        {/* 🍯 Honeycomb Grid of Clubs */}
        <div className="honeycomb-grid">
          {filteredClubs.map(club => {
            const isMember = isUserMember(club);
            const memberCount = club.members ? club.members.length : 0;
            
            return (
              <div key={club._id} className="honeycomb-card bee-animation" style={{
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* 🐝 Club Image */}
                {(club.image || club.imageUrl) && (
                  <div style={{ marginBottom: 'var(--spacing-lg)', textAlign: 'center' }}>
                    <div className="hex-image" style={{ 
                      width: '150px', 
                      height: '150px',
                      margin: '0 auto'
                    }}>
                      <img 
                        src={club.image || club.imageUrl} 
                        alt={club.name}
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover'
                        }}
                        onError={(e) => {
                          console.log('Club image failed to load:', e.target.src);
                          e.target.parentElement.style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                )}
                
                {/* 📝 Club Info */}
                <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>
                  <h3 className="clubbee-text-gold" style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: '700', 
                    marginBottom: 'var(--spacing-sm)',
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)'
                  }}>
                    {club.name}
                  </h3>
                  
                  <div style={{
                    display: 'inline-block',
                    background: 'linear-gradient(45deg, var(--clubbee-gold-primary), var(--clubbee-gold-bright))',
                    color: 'var(--clubbee-navy-primary)',
                    padding: 'var(--spacing-xs) var(--spacing-md)',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    marginBottom: 'var(--spacing-md)'
                  }}>
                    {club.category}
                  </div>
                  
                  <p style={{ 
                    color: 'var(--clubbee-navy-primary)', 
                    marginBottom: 'var(--spacing-md)', 
                    fontSize: '0.95rem',
                    lineHeight: '1.6'
                  }}>
                    {club.description}
                  </p>
                  
                  <div style={{ 
                    color: 'var(--clubbee-medium-gray)', 
                    fontSize: '0.875rem', 
                    marginBottom: 'var(--spacing-lg)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 'var(--spacing-md)',
                    flexWrap: 'wrap'
                  }}>
                    <span>
                      🐝 {memberCount} {memberCount === 1 ? 'member' : 'members'}
                    </span>
                    {club.founderName && (
                      <span>
                        👑 Founded by {club.founderName}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* 🎯 Action Button */}
                <button 
                  onClick={() => isMember ? handleLeaveClub(club._id || club.id, club.name) : handleJoinClub(club._id || club.id, club.name)}
                  disabled={joiningClub === (club._id || club.id) || !user}
                  className={isMember ? "btn-navy" : "btn-honey"}
                  style={{ 
                    width: '100%',
                    fontSize: '1rem',
                    fontWeight: '600',
                    opacity: joiningClub === (club._id || club.id) || !user ? 0.6 : 1,
                    cursor: joiningClub === (club._id || club.id) || !user ? 'not-allowed' : 'pointer'
                  }}
                >
                  {joiningClub === (club._id || club.id) ? (
                    <span className="bee-spinner" style={{ display: 'inline-block', marginRight: '0.5rem' }}></span>
                  ) : null}
                  {joiningClub === (club._id || club.id) ? 'Processing...' : (isMember ? '💔 Leave Club' : '💖 Join Club')}
                </button>
                
                {!user && (
                  <p style={{ 
                    fontSize: '0.75rem', 
                    color: 'var(--clubbee-medium-gray)', 
                    textAlign: 'center', 
                    marginTop: 'var(--spacing-sm)',
                    fontStyle: 'italic'
                  }}>
                    Please log in to join clubs 🐝
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* 📭 Empty State */}
        {filteredClubs.length === 0 && !loading && (
          <div className="honeycomb-card" style={{ 
            textAlign: 'center', 
            padding: 'var(--spacing-xxl)',
            background: 'rgba(255, 255, 255, 0.05)'
          }}>
            <div className="hexagon" style={{ 
              width: '100px', 
              height: '100px', 
              margin: '0 auto var(--spacing-lg)',
              background: 'var(--clubbee-gold-primary)',
              fontSize: '2rem'
            }}>
              🔍
            </div>
            <h3 className="clubbee-text-gold" style={{ marginBottom: 'var(--spacing-md)' }}>
              No clubs found
            </h3>
            <p style={{ color: 'var(--clubbee-gold-light)' }}>
              {searchTerm || selectedCategory ? 'Try adjusting your filters to discover amazing clubs! 🐝' : 'Be the pioneer and create the first club! ✨'}
            </p>
          </div>
        )}

        {/* 🎭 Create Club Modal */}
        <CreateClubModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onClubCreated={handleClubCreated}
        />
      </div>
    </div>
  );
};

export default Clubs;