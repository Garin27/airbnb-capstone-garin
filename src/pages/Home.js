// src/pages/Home.js

import React, { useEffect, useState } from 'react';
import api from '../api';
import ListingCard from '../components/ListingCard';

const featuredDestinations = [
  {
    city: 'Paris',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
  },
  {
    city: 'New York',
    country: 'USA',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
  },
  {
    city: 'Tokyo',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=80',
  },
  {
    city: 'Cape Town',
    country: 'South Africa',
    image: 'https://images.unsplash.com/photo-1545231027-637d2f6210f4?auto=format&fit=crop&w=800&q=80',
  },
  {
    city: 'Phuket',
    country: 'Thailand',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
  },
];

const Home = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    api.get('/api/listings')
      .then(res => setListings(res.data))
      .catch(err => console.error('Error fetching listings:', err));
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section style={heroSection}>
        <div style={heroContent}>
          <h1 style={heroTitle}>Not sure where to go? Perfect.</h1>
          <button style={heroButton}>I'm flexible</button>
        </div>
      </section>

      {/* Inspiration Section */}
      <section style={sectionWrapper}>
        <h2 style={sectionTitle}>Inspiration for your next trip</h2>
        <div style={destinationGrid}>
          {featuredDestinations.map((dest, index) => (
            <div key={index} style={{ ...card, backgroundImage: `url(${dest.image})` }}>
              <div style={cardOverlay}>
                <p style={cardCity}>{dest.city}</p>
                <p style={cardCountry}>{dest.country}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Listing Results */}
      <section style={sectionWrapper}>
        <h2 style={sectionTitle}>Browse All Listings</h2>
        <div style={listingGrid}>
          {listings.map(listing => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
        </div>
      </section>
    </div>
  );
};

// === Styles ===
const heroSection = {
  backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80)',

  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '400px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  position: 'relative',
};

const heroContent = {
  textAlign: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  padding: '20px 40px',
  borderRadius: '12px',
};

const heroTitle = {
  fontSize: '36px',
  fontWeight: '600',
  marginBottom: '16px',
};

const heroButton = {
  padding: '10px 20px',
  fontSize: '16px',
  border: 'none',
  borderRadius: '30px',
  backgroundColor: '#fff',
  color: '#000',
  cursor: 'pointer',
};

const sectionWrapper = {
  maxWidth: '1200px',
  margin: '40px auto',
  padding: '0 20px',
};

const sectionTitle = {
  fontSize: '24px',
  marginBottom: '20px',
};

const destinationGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
  gap: '16px',
};

const card = {
  height: '180px',
  borderRadius: '12px',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'relative',
  overflow: 'hidden',
};

const cardOverlay = {
  backgroundColor: 'rgba(0,0,0,0.4)',
  color: '#fff',
  position: 'absolute',
  bottom: 0,
  width: '100%',
  padding: '10px 12px',
};

const cardCity = {
  fontSize: '16px',
  fontWeight: '600',
};

const cardCountry = {
  fontSize: '12px',
};

const listingGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '20px',
};

export default Home;





