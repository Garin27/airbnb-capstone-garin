// src/pages/MyReservations.js

import React, { useEffect, useState } from 'react';
import api from '../api';
import { toast } from 'react-toastify';

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    api.get('/api/reservations', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setReservations(res.data))
      .catch(err => {
        console.error('Failed to fetch reservations:', err);
        setError('You must be logged in to view your reservations.');
      });
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm('Cancel this reservation?')) return;

    const token = localStorage.getItem('token');

    try {
      await api.delete(`/api/reservations/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReservations(prev => prev.filter(res => res._id !== id));
      toast.info('Reservation cancelled.');
    } catch (err) {
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
    <div style={pageContainer}>
      <h2 style={title}>My Reservations</h2>
      {reservations.map((res) => (
        <div key={res._id} style={cardStyle}>
          <h3 style={cardTitle}>{res.listing?.title || 'Listing'}</h3>
          <p style={cardSub}>{res.listing?.location}</p>
          <p><strong>Check-in:</strong> {new Date(res.checkIn).toLocaleDateString()}</p>
          <p><strong>Check-out:</strong> {new Date(res.checkOut).toLocaleDateString()}</p>
          <p><strong>Guests:</strong> {res.guests}</p>
          <p>
            <strong>Total:</strong>{' '}
            R
            {(
              ((new Date(res.checkOut) - new Date(res.checkIn)) / (1000 * 60 * 60 * 24)) *
              (res.listing?.price || 0)
            ).toFixed(2)}
          </p>
          <button onClick={() => handleCancel(res._id)} style={cancelButton}>
            Cancel Reservation
          </button>
        </div>
      ))}
    </div>
  );
};

// === Styles ===
const pageContainer = {
  maxWidth: '900px',
  margin: '0 auto',
  padding: '40px 20px',
};

const title = {
  fontSize: '28px',
  fontWeight: '600',
  marginBottom: '30px',
  color: '#333',
};

const cardStyle = {
  backgroundColor: '#fff',
  borderRadius: '12px',
  padding: '20px',
  marginBottom: '20px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
};

const cardTitle = {
  fontSize: '18px',
  fontWeight: '600',
  marginBottom: '4px',
};

const cardSub = {
  fontSize: '14px',
  color: '#666',
  marginBottom: '10px',
};

const cancelButton = {
  marginTop: '15px',
  backgroundColor: '#ccc',
  color: '#000',
  padding: '8px 14px',
  borderRadius: '6px',
  border: 'none',
  cursor: 'pointer',
};

export default MyReservations;



