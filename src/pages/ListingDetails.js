import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import { toast } from 'react-toastify';

const ListingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

  useEffect(() => {
    api.get(`/api/listings/${id}`)
      .then(res => setListing(res.data))
      .catch(err => {
        console.error('Failed to fetch listing:', err);
        toast.error('Listing not found');
      });
  }, [id]);

  const nights = checkIn && checkOut
    ? Math.max((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24), 0)
    : 0;

  const totalCost = nights * (listing?.price || 0);

  const handleReservation = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    api.post('/api/reservations', {
      listing: listing._id,
      checkIn,
      checkOut,
      guests,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        toast.success('✅ Reservation confirmed!');
        setCheckIn('');
        setCheckOut('');
        setGuests(1);
      })
      .catch((err) => {
        console.error('Reservation error:', err);
        toast.error('❌ Failed to reserve. Please try again.');
      });
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;

    const token = localStorage.getItem('token');

    try {
      await api.delete(`/api/listings/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      toast.success('🗑️ Listing deleted');
      navigate('/');
    } catch (err) {
      toast.error('❌ Failed to delete listing');
      console.error(err);
    }
  };

  if (!listing) return <p>Loading listing details...</p>;

  return (
    <div style={pageStyle}>
      <button onClick={() => navigate(-1)} style={backButtonStyle}>
        ← Back
      </button>

      <h2>{listing.title}</h2>

      <div style={galleryStyle}>
        {listing.images.map((imgUrl, index) => (
          <img
            key={index}
            src={imgUrl}
            alt={`${listing.title} ${index + 1}`}
            style={galleryImageStyle}
          />
        ))}
      </div>

      <p><strong>Location:</strong> {listing.location}</p>
      <p><strong>Description:</strong> {listing.description}</p>
      <p><strong>Price:</strong> R{listing.price} / night</p>
      <p><strong>Guests:</strong> {listing.guests}</p>
      <p><strong>Bedrooms:</strong> {listing.bedrooms}</p>
      <p><strong>Rating:</strong> {listing.rating} ⭐ ({listing.reviews} reviews)</p>
      <p><strong>Amenities:</strong> {listing.amenities.join(', ')}</p>

      <h3 style={{ marginTop: '30px' }}>Make a Reservation</h3>
      <form onSubmit={handleReservation}>
        <div>
          <label>Check-in: </label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Check-out: </label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Guests: </label>
          <input
            type="number"
            min="1"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={reserveButtonStyle}>Reserve</button>
      </form>

      {nights > 0 && (
        <p style={{ marginTop: '10px', fontWeight: 'bold' }}>
          Total for {nights} night{nights > 1 ? 's' : ''}: R{totalCost.toFixed(2)}
        </p>
      )}

      <button onClick={handleDelete} style={deleteButtonStyle}>
        🗑️ Delete Listing
      </button>
    </div>
  );
};

const pageStyle = {
  maxWidth: '800px',
  margin: '0 auto',
  padding: '20px',
  fontFamily: 'Arial'
};

const backButtonStyle = {
  marginBottom: '20px',
  padding: '8px 16px',
  border: '1px solid #ccc',
  borderRadius: '6px',
  background: '#f5f5f5',
  cursor: 'pointer'
};

const galleryStyle = {
  display: 'flex',
  gap: '12px',
  overflowX: 'scroll',
  paddingBottom: '10px',
  marginBottom: '20px'
};

const galleryImageStyle = {
  height: '220px',
  borderRadius: '10px',
  objectFit: 'cover'
};

const reserveButtonStyle = {
  backgroundColor: '#FF5A5F',
  color: '#fff',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '6px',
  marginTop: '10px',
  cursor: 'pointer'
};

const deleteButtonStyle = {
  backgroundColor: '#ff4d4f',
  color: '#fff',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '6px',
  marginTop: '20px',
  cursor: 'pointer'
};

export default ListingDetails;






