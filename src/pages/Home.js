// src/pages/Home.js

import React, { useEffect, useState } from 'react';
import api from '../api';
import ListingCard from '../components/ListingCard';

const Home = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    api.get('/api/listings')
      .then(res => setListings(res.data))
      .catch(err => console.error('Error fetching listings:', err));
  }, []);

  const handleUpdate = (id) => {
    // navigate to update page
    window.location.href = `/update-listing/${id}`;
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;
    const token = localStorage.getItem('token');
    try {
      await api.delete(`/api/listings/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setListings(listings.filter(l => l._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={pageContainer}>
      <h1 style={pageTitle}>Airbnb Listings</h1>
      <div style={gridContainer}>
        {listings.map(listing => (
          <ListingCard
            key={listing._id}
            listing={listing}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

const pageContainer = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '40px 20px',
  backgroundColor: '#f7f7f7',
};

const pageTitle = {
  fontSize: '32px',
  fontWeight: '700',
  marginBottom: '30px',
  color: '#333',
};

const gridContainer = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '20px',
};

export default Home;



