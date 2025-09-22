import React, { useState } from 'react';
import { useNews } from '../hooks/useApi';
import { useAuth } from '../hooks/useAuth';
import ImageUpload from '../components/ImageUpload';

const News = () => {
  const { news, loading, error, addNews } = useNews();
  const { user } = useAuth();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newArticle, setNewArticle] = useState({
    title: '',
    content: '',
    category: 'announcement',
    imageUrl: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addNews({
        ...newArticle,
        authorId: { name: user.displayName || user.email },
        date: new Date().toISOString()
      });
      setNewArticle({ title: '', content: '', category: 'announcement', imageUrl: '' });
      setShowCreateForm(false);
    } catch (error) {
      console.error('Failed to create news:', error);
    }
  };

  if (loading) {
    return (
      <div className="honeycomb-bg" style={{ minHeight: '100vh', padding: '2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <img 
            src="/clubbee-logo.jpg" 
            alt="CLUBBEE" 
            style={{ 
              width: '80px', 
              height: '80px', 
              borderRadius: '12px', 
              objectFit: 'cover',
              border: '3px solid var(--clubbee-gold-primary)',
              boxShadow: 'var(--shadow-md)',
              marginBottom: '2rem'
            }} 
          />
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--clubbee-navy-primary)', marginBottom: '1rem' }}>
            News & Announcements
          </h2>
          <div className="loading-spinner">Loading latest updates...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="honeycomb-bg" style={{ minHeight: '100vh', padding: '2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--clubbee-navy-primary)', marginBottom: '1rem' }}>
            News & Announcements
          </h2>
          <p style={{ color: '#dc2626', padding: '2rem', background: 'white', borderRadius: '12px', border: '2px solid #dc2626' }}>
            Error loading news: {error}
          </p>
        </div>
      </div>
    );
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'event': return '📅';
      case 'achievement': return '🏆';
      case 'announcement': return '📢';
      default: return '📰';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'event': return 'var(--clubbee-blue-primary)';
      case 'achievement': return 'var(--clubbee-gold-primary)';
      case 'announcement': return 'var(--clubbee-orange-primary)';
      default: return 'var(--clubbee-navy-light)';
    }
  };

  return (
    <div className="honeycomb-bg" style={{ minHeight: '100vh', padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img 
              src="/clubbee-logo.jpg" 
              alt="CLUBBEE" 
              style={{ 
                width: '60px', 
                height: '60px', 
                borderRadius: '12px', 
                objectFit: 'cover',
                border: '3px solid var(--clubbee-gold-primary)',
                boxShadow: 'var(--shadow-md)'
              }} 
            />
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--clubbee-navy-primary)' }}>
              News & Announcements
            </h2>
          </div>
          <button 
            className="btn-honey"
            onClick={() => setShowCreateForm(!showCreateForm)}
            style={{ fontSize: '1rem', padding: '0.75rem 1.5rem' }}
          >
            {showCreateForm ? 'Cancel' : '+ Post News'}
          </button>
        </div>

        {/* Create Form */}
        {showCreateForm && (
          <div className="club-card" style={{ 
            marginBottom: '2rem', 
            padding: '2rem',
            background: 'white',
            border: '3px solid var(--clubbee-gold-primary)',
            borderRadius: '16px',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <h3 style={{ 
              fontSize: '1.75rem', 
              fontWeight: 'bold', 
              color: 'var(--clubbee-navy-primary)', 
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}>
              📰 Create News Article
            </h3>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem', 
                    fontWeight: '600', 
                    color: 'var(--clubbee-navy-primary)',
                    fontSize: '1rem'
                  }}>
                    📝 Title
                  </label>
                  <input
                    type="text"
                    value={newArticle.title}
                    onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                    placeholder="Enter article title..."
                    style={{
                      width: '100%',
                      padding: '0.875rem',
                      borderRadius: '10px',
                      border: '2px solid var(--clubbee-gold-light)',
                      fontSize: '1rem',
                      background: 'var(--clubbee-cream)',
                      color: 'var(--clubbee-navy-primary)',
                      fontWeight: '500'
                    }}
                    required
                  />
                </div>
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem', 
                    fontWeight: '600', 
                    color: 'var(--clubbee-navy-primary)',
                    fontSize: '1rem'
                  }}>
                    📂 Category
                  </label>
                  <select
                    value={newArticle.category}
                    onChange={(e) => setNewArticle({ ...newArticle, category: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.875rem',
                      borderRadius: '10px',
                      border: '2px solid var(--clubbee-gold-light)',
                      fontSize: '1rem',
                      background: 'var(--clubbee-cream)',
                      color: 'var(--clubbee-navy-primary)',
                      fontWeight: '500'
                    }}
                  >
                    <option value="announcement">📢 Announcement</option>
                    <option value="event">📅 Event</option>
                    <option value="achievement">🏆 Achievement</option>
                  </select>
                </div>
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '600', 
                  color: 'var(--clubbee-navy-primary)',
                  fontSize: '1rem'
                }}>
                  📄 Content
                </label>
                <textarea
                  value={newArticle.content}
                  onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
                  rows="4"
                  placeholder="Write your article content here..."
                  style={{
                    width: '100%',
                    padding: '0.875rem',
                    borderRadius: '10px',
                    border: '2px solid var(--clubbee-gold-light)',
                    fontSize: '1rem',
                    resize: 'vertical',
                    background: 'var(--clubbee-cream)',
                    color: 'var(--clubbee-navy-primary)',
                    fontWeight: '500',
                    lineHeight: '1.6'
                  }}
                  required
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '600', 
                  color: 'var(--clubbee-navy-primary)',
                  fontSize: '1rem'
                }}>
                  🖼️ Article Image (Optional)
                </label>
                <div style={{ 
                  background: 'var(--clubbee-cream)',
                  padding: '1rem',
                  borderRadius: '10px',
                  border: '2px solid var(--clubbee-gold-light)'
                }}>
                  <ImageUpload
                    currentImage={newArticle.imageUrl}
                    onImageUpload={(imageUrl) => setNewArticle({ ...newArticle, imageUrl })}
                    placeholder="Upload Article Image"
                    folder="news-images"
                    maxSize={10 * 1024 * 1024} // 10MB limit for news images
                  />
                  <p style={{ 
                    fontSize: '0.875rem', 
                    color: 'var(--clubbee-navy-light)', 
                    marginTop: '0.5rem',
                    textAlign: 'center'
                  }}>
                    Click to upload an image for your article (optional)
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button type="submit" className="btn-honey" style={{ padding: '0.875rem 2rem', fontSize: '1rem' }}>
                  📰 Publish Article
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowCreateForm(false)}
                  style={{
                    padding: '0.875rem 2rem',
                    borderRadius: '10px',
                    border: '2px solid var(--clubbee-navy-light)',
                    background: 'white',
                    color: 'var(--clubbee-navy-primary)',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* News Articles */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {news.map(article => (
            <div key={article._id || article.id} className="club-card event-card" style={{ 
              padding: '2rem',
              background: 'white',
              border: '3px solid var(--clubbee-gold-primary)',
              borderRadius: '16px',
              boxShadow: 'var(--shadow-lg)'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                <div 
                  style={{ 
                    padding: '0.75rem', 
                    borderRadius: '50%', 
                    background: getCategoryColor(article.category),
                    color: 'white',
                    fontSize: '1.5rem',
                    minWidth: '3.5rem',
                    height: '3.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'var(--shadow-md)'
                  }}
                >
                  {getCategoryIcon(article.category)}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ 
                    fontSize: '1.75rem', 
                    fontWeight: '700', 
                    marginBottom: '0.75rem',
                    color: 'var(--clubbee-navy-primary)',
                    lineHeight: '1.3'
                  }}>
                    {article.title}
                  </h3>
                  <div style={{ 
                    fontSize: '0.95rem', 
                    color: 'var(--clubbee-navy-light)', 
                    marginBottom: '1.25rem',
                    display: 'flex',
                    gap: '1.5rem',
                    alignItems: 'center',
                    flexWrap: 'wrap'
                  }}>
                    <span style={{ fontWeight: '500' }}>✍️ By {article.authorId?.name || 'Unknown'}</span>
                    <span style={{ fontWeight: '500' }}>📅 {new Date(article.date).toLocaleDateString()}</span>
                    {article.category && (
                      <span style={{ 
                        background: getCategoryColor(article.category),
                        color: 'white',
                        padding: '0.375rem 0.75rem',
                        borderRadius: '16px',
                        fontSize: '0.8rem',
                        textTransform: 'capitalize',
                        fontWeight: '600'
                      }}>
                        {article.category}
                      </span>
                    )}
                  </div>
                  <p style={{ 
                    color: 'var(--clubbee-navy-primary)', 
                    lineHeight: '1.7',
                    marginBottom: '1.5rem',
                    fontSize: '1.05rem',
                    background: 'var(--clubbee-cream)',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: '1px solid var(--clubbee-gold-light)'
                  }}>
                    {article.content}
                  </p>
                  
                  {/* Article Image */}
                  {article.imageUrl && (
                    <div style={{ marginBottom: '1.5rem' }}>
                      <img 
                        src={article.imageUrl}
                        alt={article.title}
                        style={{
                          width: '100%',
                          maxHeight: '400px',
                          objectFit: 'cover',
                          borderRadius: '12px',
                          border: '2px solid var(--clubbee-gold-light)',
                          boxShadow: 'var(--shadow-md)'
                        }}
                      />
                    </div>
                  )}
                  <button 
                    className="btn-honey-outline"
                    style={{ fontSize: '0.9rem', padding: '0.75rem 1.25rem' }}
                  >
                    Read more →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {news.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '4rem',
            background: 'white',
            borderRadius: '16px',
            border: '2px solid var(--clubbee-gold-light)',
            boxShadow: 'var(--shadow-md)'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📰</div>
            <h3 style={{ 
              fontSize: '1.5rem', 
              marginBottom: '0.5rem',
              color: 'var(--clubbee-navy-primary)',
              fontWeight: 'bold'
            }}>
              No news yet
            </h3>
            <p style={{ color: 'var(--clubbee-navy-light)', fontSize: '1.1rem' }}>
              Be the first to share an announcement with the community!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default News;