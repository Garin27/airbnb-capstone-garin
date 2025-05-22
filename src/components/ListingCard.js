// src/components/ListingCard.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

const ListingCard = ({ listing }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/listing/${listing._id}`);
  };

  return (
    <div
      onClick={handleClick}
      style={cardStyle}
    >
      <img
        src={listing.images[0]}
        alt={listing.title}
        style={{ width: '100%', height: '250px', objectFit: 'cover', borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}
      />

      <div style={infoWrapper}>
        <h3 style={titleStyle}>{listing.title}</h3>
        <p style={locationStyle}>{listing.location}</p>
        <p style={detailsStyle}>
          {listing.guests} guests • {listing.bedrooms} bedrooms
        </p>
        <p style={priceStyle}>R{listing.price}/night</p>
        <p style={reviewStyle}>⭐ {listing.rating} ({listing.reviews} reviews)</p>
      </div>
    </div>
  );
};

// === Styles ===
const cardStyle = {
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  cursor: 'pointer',
  backgroundColor: '#fff',
  transition: 'transform 0.2s',
};

const infoWrapper = {
  padding: '16px',
};

const titleStyle = {
  fontSize: '18px',
  fontWeight: '600',
  margin: '0 0 4px 0',
};

const locationStyle = {
  fontSize: '14px',
  color: '#666',
  marginBottom: '4px',
};

const detailsStyle = {
  fontSize: '14px',
  color: '#555',
  marginBottom: '6px',
};

const priceStyle = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#000',
};

const reviewStyle = {
  fontSize: '14px',
  color: '#333',
  marginTop: '4px',
};

export default ListingCard;
