// src/pages/CreateListingPage.js

import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateListingPage = () => {
  const navigate = useNavigate();
  const [listing, setListing] = useState({
    title: '',
    location: '',
    price: '',
    guests: 1,
    bedrooms: 1,
    rating: 5,
    reviews: 0,
    images: [''],
    amenities: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setListing(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e, index) => {
    const newImages = [...listing.images];
    newImages[index] = e.target.value;
    setListing(prev => ({ ...prev, images: newImages }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await api.post('/api/listings', {
        ...listing,
        amenities: listing.amenities.split(',').map(a => a.trim())
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success('✅ Listing created!');
      navigate('/?created=true');
    } catch (err) {
      console.error(err);
      toast.error('❌ Failed to create listing.');
    }
  };

  return (
    <div style={pageContainer}>
      <div style={formCard}>
        <h2 style={formTitle}>Create Listing</h2>
        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={formGrid}>
            <input name="title" placeholder="Title" value={listing.title} onChange={handleChange} style={inputStyle} required />
            <input name="location" placeholder="Location" value={listing.location} onChange={handleChange} style={inputStyle} required />
            <input name="price" type="number" placeholder="Price" value={listing.price} onChange={handleChange} style={inputStyle} required />
            <input name="guests" type="number" placeholder="Guests" value={listing.guests} onChange={handleChange} style={inputStyle} />
            <input name="bedrooms" type="number" placeholder="Bedrooms" value={listing.bedrooms} onChange={handleChange} style={inputStyle} />
            <input name="rating" type="number" step="0.1" placeholder="Rating" value={listing.rating} onChange={handleChange} style={inputStyle} />
            <input name="reviews" type="number" placeholder="Reviews" value={listing.reviews} onChange={handleChange} style={inputStyle} />
            <input value={listing.images[0]} onChange={(e) => handleImageChange(e, 0)} placeholder="Image URL" style={inputStyle} required />
            <input name="amenities" placeholder="Amenities (comma-separated)" value={listing.amenities} onChange={handleChange} style={inputStyle} />
          </div>
          <textarea name="description" placeholder="Description" value={listing.description} onChange={handleChange} required style={textareaStyle} />
          <button type="submit" style={submitButton}>Create Listing</button>
        </form>
      </div>
    </div>
  );
};

// === Styles ===
const pageContainer = {
  maxWidth: '800px',
  margin: '40px auto',
  padding: '20px',
};

const formCard = {
  backgroundColor: '#fff',
  borderRadius: '12px',
  padding: '30px',
  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
};

const formTitle = {
  fontSize: '24px',
  marginBottom: '20px',
  fontWeight: '600',
  textAlign: 'center',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

const formGrid = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '16px',
};

const inputStyle = {
  padding: '12px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '14px',
};

const textareaStyle = {
  padding: '12px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  minHeight: '100px',
  fontSize: '14px',
  resize: 'vertical',
};

const submitButton = {
  backgroundColor: '#FF5A5F',
  color: '#fff',
  padding: '12px',
  fontSize: '16px',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
};

export default CreateListingPage;
