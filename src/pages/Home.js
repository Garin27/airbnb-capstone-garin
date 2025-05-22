import React, { useEffect, useState } from 'react';
import api from '../api'; // adjust if file is nested deeper
import ListingCard from '../components/ListingCard';

const Home = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    api.get('/api/listings')
      .then(response => setListings(response.data))
      .catch(error => console.error('Error fetching listings:', error));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Airbnb Listings</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {listings.map(listing => (
          <ListingCard key={listing._id} listing={listing} />
        ))}
      </div>
    </div>
  );
};

export default Home;


