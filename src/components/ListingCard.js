import React from 'react';
import { Link } from 'react-router-dom';

const ListingCard = ({ listing, onUpdate, onDelete }) => {
  return (
    <div style={cardContainer}>
      <img
        src={listing.images[0]}
        alt={listing.title}
        style={imageStyle}
      />

      <div style={infoContainer}>
        <h3 style={titleStyle}>{listing.title}</h3>
        <p style={locationStyle}>{listing.location}</p>
        <p style={detailText}>
          {listing.guests} guests • {listing.bedrooms} bedrooms • {listing.bathrooms || 1} bathrooms
        </p>
        <p style={detailText}>Amenities: {listing.amenities.join(', ')}</p>
        <p style={priceStyle}>R{listing.price}/night</p>
        <p style={reviewStyle}>⭐ {listing.rating} ({listing.reviews} reviews)</p>

        <div style={buttonRow}>
          {onUpdate && (
            <button style={updateButton} onClick={() => onUpdate(listing._id)}>Update</button>
          )}
          {onDelete && (
            <button style={deleteButton} onClick={() => onDelete(listing._id)}>Delete</button>
          )}
        </div>
      </div>
    </div>
  );
};

// === Styles ===
const cardContainer = {
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  padding: '20px',
  marginBottom: '20px',
  borderRadius: '12px',
  backgroundColor: '#fff',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
};

const imageStyle = {
  width: '200px',
  height: '150px',
  objectFit: 'cover',
  borderRadius: '10px',
};

const infoContainer = {
  flex: 1,
};

const titleStyle = {
  fontSize: '20px',
  fontWeight: '600',
  margin: '0 0 5px',
};

const locationStyle = {
  fontSize: '14px',
  color: '#666',
  marginBottom: '5px',
};

const detailText = {
  fontSize: '14px',
  color: '#333',
  margin: '2px 0',
};

const priceStyle = {
  marginTop: '10px',
  fontWeight: 'bold',
  fontSize: '16px',
};

const reviewStyle = {
  color: '#555',
  fontSize: '14px',
  marginBottom: '10px',
};

const buttonRow = {
  display: 'flex',
  gap: '10px',
};

const updateButton = {
  backgroundColor: '#3366ff',
  color: '#fff',
  border: 'none',
  padding: '8px 16px',
  borderRadius: '6px',
  cursor: 'pointer',
};

const deleteButton = {
  backgroundColor: '#ff4d4f',
  color: '#fff',
  border: 'none',
  padding: '8px 16px',
  borderRadius: '6px',
  cursor: 'pointer',
};

export default ListingCard;