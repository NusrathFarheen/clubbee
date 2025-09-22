import React from 'react';
import { useNews } from '../hooks/useApi';

const News = () => {
  const { news, loading, error } = useNews();

  if (loading) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>News & Announcements</h2>
        <p>Loading news...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>News & Announcements</h2>
        <p style={{ color: '#dc2626' }}>Error loading news: {error}</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>News & Announcements</h2>
        <button style={{ backgroundColor: '#2563eb', color: 'white', padding: '0.5rem 1rem', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>
          Post News
        </button>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {news.map(article => (
          <div key={article._id} style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>{article.title}</h3>
            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.75rem' }}>
              By {article.authorId?.name || 'Unknown'} on {new Date(article.date).toLocaleDateString()}
            </div>
            <p style={{ color: '#374151' }}>{article.content}</p>
            <button style={{ marginTop: '1rem', color: '#2563eb', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
              Read more →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;