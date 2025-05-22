import React, { useEffect, useState } from 'react';
import api from '../api';
import ListingCard from '../components/ListingCard';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const ListingsPage = () => {
  const [listings, setListings] = useState([]);
  const location = useLocation();

  useEffect(() => {
    api.get('/api/listings')
      .then((res) => {
        setListings(res.data);
      })
      .catch((err) => {
        console.error('Error fetching listings:', err);
      });
  }, []);

  useEffect(() => {
    if (location.search.includes('created=true')) {
      toast.success('🎉 Listing created successfully!');
    }
  }, [location]);

  return (
    <div>
      <h1>Airbnb Listings</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {listings.map(listing => (
          <ListingCard key={listing._id} listing={listing} />
        ))}
      </div>
    </div>
  );
};

export default ListingsPage;
