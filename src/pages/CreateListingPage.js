import React, { useState } from 'react';
import api from '../api'; // adjust if this file is deeper in structure
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
      await api.post(
        '/api/listings',
        {
          ...listing,
          amenities: listing.amenities.split(',').map(a => a.trim())
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      toast.success('✅ Listing created!');
      navigate('/?created=true');
    } catch (err) {
      console.error(err);
      toast.error('❌ Failed to create listing.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2>Create New Listing</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input name="title" placeholder="Title" value={listing.title} onChange={handleChange} required />
        <input name="location" placeholder="Location" value={listing.location} onChange={handleChange} required />
        <input name="price" type="number" placeholder="Price" value={listing.price} onChange={handleChange} required />
        <input name="guests" type="number" placeholder="Guests" value={listing.guests} onChange={handleChange} />
        <input name="bedrooms" type="number" placeholder="Bedrooms" value={listing.bedrooms} onChange={handleChange} />
        <input name="rating" type="number" step="0.1" placeholder="Rating" value={listing.rating} onChange={handleChange} />
        <input name="reviews" type="number" placeholder="Reviews" value={listing.reviews} onChange={handleChange} />
        <input value={listing.images[0]} onChange={(e) => handleImageChange(e, 0)} placeholder="Image URL" required />
        <input name="amenities" placeholder="Amenities (comma-separated)" value={listing.amenities} onChange={handleChange} />
        <textarea name="description" placeholder="Description" value={listing.description} onChange={handleChange} required />
        <button type="submit" style={{ background: '#FF5A5F', color: 'white', padding: '10px', border: 'none', borderRadius: '6px' }}>
          Create Listing
        </button>
      </form>
    </div>
  );
};

export default CreateListingPage;

