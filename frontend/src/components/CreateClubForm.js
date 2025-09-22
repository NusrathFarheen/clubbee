import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const CreateClubForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      if (!user) {
        throw new Error('You must be logged in to create a club');
      }
      
      const token = await user.getIdToken();
      const response = await fetch('/api/clubs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to create club');
      }
      
      setSuccess(true);
      // Reset form after successful submission
      setFormData({
        name: '',
        category: '',
        description: ''
      });
      
      // Redirect to clubs page after a short delay
      setTimeout(() => {
        navigate('/clubs');
      }, 2000);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    'Academic',
    'Arts',
    'Cultural',
    'Gaming',
    'Health & Wellness',
    'Media',
    'Professional',
    'Service',
    'Social',
    'Sports',
    'Technology',
    'Other'
  ];

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1.5rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Create New Club</h2>
      
      {success && (
        <div style={{ 
          backgroundColor: '#10B981', 
          color: 'white', 
          padding: '1rem', 
          borderRadius: '4px',
          marginBottom: '1.5rem'
        }}>
          Club created successfully! Redirecting to clubs page...
        </div>
      )}
      
      {error && (
        <div style={{ 
          backgroundColor: '#EF4444', 
          color: 'white', 
          padding: '1rem', 
          borderRadius: '4px',
          marginBottom: '1.5rem'
        }}>
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            Club Name*
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #D1D5DB',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
            placeholder="Enter club name"
          />
        </div>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            Category*
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #D1D5DB',
              borderRadius: '4px',
              fontSize: '1rem',
              backgroundColor: 'white'
            }}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            Description*
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #D1D5DB',
              borderRadius: '4px',
              fontSize: '1rem',
              resize: 'vertical'
            }}
            placeholder="Describe your club's purpose, activities, and goals"
          ></textarea>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <button
            type="button"
            onClick={() => navigate('/clubs')}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '4px',
              border: '1px solid #D1D5DB',
              backgroundColor: 'white',
              color: '#374151',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '4px',
              border: 'none',
              backgroundColor: '#2563eb',
              color: 'white',
              fontSize: '1rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Creating...' : 'Create Club'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateClubForm;