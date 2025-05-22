import React, { useState } from 'react';
import api from '../api'; // adjust path if needed

const ReservationForm = ({ listingId }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    try {
      await api.post(
        '/api/reservations',
        {
          listing: listingId,
          checkIn,
          checkOut,
          guests,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess(true);
      setError('');
    } catch (err) {
      setError('Failed to reserve. Please try again.');
      setSuccess(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h3>Reserve Your Stay</h3>
      <label>Check-in Date:</label>
      <input
        type="date"
        value={checkIn}
        onChange={(e) => setCheckIn(e.target.value)}
        required
      />
      <label>Check-out Date:</label>
      <input
        type="date"
        value={checkOut}
        onChange={(e) => setCheckOut(e.target.value)}
        required
      />
      <label>Guests:</label>
      <input
        type="number"
        min="1"
        value={guests}
        onChange={(e) => setGuests(e.target.value)}
        required
      />
      <button type="submit" style={buttonStyle}>Reserve</button>
      {success && <p style={{ color: 'green' }}>Reservation successful!</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  maxWidth: '400px',
  marginTop: '30px',
};

const buttonStyle = {
  backgroundColor: '#ff5a5f',
  border: 'none',
  color: '#fff',
  padding: '10px 15px',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default ReservationForm;


