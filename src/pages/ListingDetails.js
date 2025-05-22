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
      .catch(() => toast.error('Listing not found'));
  }, [id]);

  const nights = checkIn && checkOut
    ? Math.max((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24), 0)
    : 0;

  const totalCost = nights * (listing?.price || 0);

  const handleReservation = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await api.post('/api/reservations', {
        listing: listing._id,
        checkIn,
        checkOut,
        guests,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success('✅ Reservation confirmed!');
      setCheckIn('');
      setCheckOut('');
      setGuests(1);
    } catch (err) {
      console.error('Reservation error:', err);
      toast.error('❌ Failed to reserve. Please try again.');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this listing?')) return;
    const token = localStorage.getItem('token');
    try {
      await api.delete(`/api/listings/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('🗑️ Listing deleted');
      navigate('/');
    } catch (err) {
      toast.error('❌ Failed to delete listing');
    }
  };

  if (!listing) return <p>Loading...</p>;

  return (
    <div style={container}>
      {/* Image Gallery */}
      <div style={galleryWrapper}>
        <div style={mainImage}>
          <img src={listing.images[0]} alt={listing.title} style={galleryImage} />
        </div>
        <div style={sideImages}>
          {listing.images.slice(1).map((img, i) => (
            <img key={i} src={img} alt={`Gallery ${i + 1}`} style={sideImage} />
          ))}
        </div>
      </div>

      {/* Info + Sidebar */}
      <div style={contentWrapper}>
        <div style={mainContent}>
          <h1>{listing.title}</h1>
          <p style={muted}>{listing.location}</p>
          <p><strong>{listing.guests}</strong> guests • <strong>{listing.bedrooms}</strong> bedrooms • <strong>{listing.bathrooms || 1}</strong> bathrooms</p>
          <p style={{ marginTop: '10px' }}>{listing.description}</p>
          <p><strong>Amenities:</strong> {listing.amenities.join(', ')}</p>
          <button style={deleteButton} onClick={handleDelete}>Delete Listing</button>
        </div>

        {/* Reservation Sidebar */}
        <div style={sidebar}>
          <p style={{ fontSize: '18px', fontWeight: '600' }}>
            R{listing.price} / night
          </p>

          <form onSubmit={handleReservation} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} required style={input} />
            <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} required style={input} />
            <input type="number" value={guests} onChange={e => setGuests(e.target.value)} min="1" style={input} />
            <button type="submit" style={reserveBtn}>Reserve</button>
          </form>

          {nights > 0 && (
            <p style={{ marginTop: '10px' }}>
              Total for {nights} night{nights > 1 ? 's' : ''}: <strong>R{totalCost.toFixed(2)}</strong>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// === Styles ===
const container = {
  maxWidth: '1200px',
  margin: '40px auto',
  padding: '20px',
};

const galleryWrapper = {
  display: 'flex',
  gap: '16px',
  marginBottom: '30px',
};

const mainImage = {
  flex: 2,
};

const galleryImage = {
  width: '100%',
  height: '400px',
  objectFit: 'cover',
  borderRadius: '12px',
};

const sideImages = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

const sideImage = {
  width: '100%',
  height: '130px',
  objectFit: 'cover',
  borderRadius: '10px',
};

const contentWrapper = {
  display: 'flex',
  gap: '40px',
};

const mainContent = {
  flex: 2,
};

const sidebar = {
  flex: 1,
  border: '1px solid #eee',
  padding: '20px',
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  height: 'fit-content',
};

const muted = {
  color: '#666',
  fontSize: '14px',
  marginBottom: '10px',
};

const input = {
  padding: '10px',
  borderRadius: '6px',
  border: '1px solid #ccc',
};

const reserveBtn = {
  backgroundColor: '#FF5A5F',
  color: '#fff',
  padding: '10px',
  borderRadius: '6px',
  border: 'none',
  fontSize: '16px',
  cursor: 'pointer',
};

const deleteButton = {
  marginTop: '30px',
  backgroundColor: '#ccc',
  color: '#000',
  padding: '10px 16px',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
};

export default ListingDetails;







