import React, { useEffect, useState } from 'react';
import api from '../api';
import { toast } from 'react-toastify';

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    api.get('/api/reservations', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => setReservations(res.data))
      .catch(err => {
        console.error('Failed to fetch reservations:', err);
        setError('You must be logged in to view your reservations.');
      });
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this reservation?')) return;

    const token = localStorage.getItem('token');

    try {
      await api.delete(`/api/reservations/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReservations(reservations.filter(res => res._id !== id));
      toast.info('Reservation cancelled.');
    } catch (err) {
      console.error('Failed to cancel reservation:', err);
      toast.error('❌ Could not cancel reservation.');
    }
  };

  if (error) {
    return <p style={{ padding: '20px', color: 'red' }}>{error}</p>;
  }

  if (reservations.length === 0) {
    return <p style={{ padding: '20px' }}>No reservations found.</p>;
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px', fontFamily: 'Arial' }}>
      <h2>My Reservations</h2>
      {reservations.map((res) => (
        <div key={res._id} style={cardStyle}>
          <h3>{res.listing?.title || 'Unknown Listing'}</h3>
          <p><strong>Location:</strong> {res.listing?.location}</p>
          <p><strong>Check-in:</strong> {new Date(res.checkIn).toLocaleDateString()}</p>
          <p><strong>Check-out:</strong> {new Date(res.checkOut).toLocaleDateString()}</p>
          <p><strong>Guests:</strong> {res.guests}</p>
          <p><strong>Total:</strong> R{((new Date(res.checkOut) - new Date(res.checkIn)) / (1000 * 60 * 60 * 24)) * res.listing.price}</p>
          <button
            onClick={() => handleCancel(res._id)}
            style={cancelButtonStyle}
          >
            Cancel Reservation
          </button>
        </div>
      ))}
    </div>
  );
};

const cardStyle = {
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '15px',
  marginBottom: '20px',
  backgroundColor: '#f9f9f9',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
};

const cancelButtonStyle = {
  marginTop: '10px',
  backgroundColor: '#ccc',
  border: 'none',
  padding: '8px 12px',
  borderRadius: '6px',
  cursor: 'pointer',
};

export default MyReservations;


