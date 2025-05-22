// src/components/ListingCard.js

import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const ListingCard = ({ listing }) => {
  if (!listing) return null;

  const {
    _id,
    title,
    location,
    price,
    rating,
    reviews,
    guests,
    bedrooms,
    amenities,
    images
  } = listing;

  return (
    <Link to={`/listing/${_id}`} style={cardWrapper}>
      <div style={card}>
        <img src={images[0]} alt={title} style={imageStyle} />
        <div style={infoStyle}>
          <h3 style={titleStyle}>{title}</h3>
          <p style={locationStyle}>{location}</p>
          <p style={detailsStyle}>{guests} guests • {bedrooms} bedrooms</p>
          <p style={priceStyle}>R{price}/night</p>
          <p style={amenitiesStyle}>Amenities: {amenities?.slice(0, 3).join(', ')}</p>
          <div style={ratingStyle}>
            <FaStar color="#f5a623" size={14} />
            <span style={{ marginLeft: '4px' }}>{rating} ({reviews} reviews)</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

const cardWrapper = {
  textDecoration: 'none',
  color: 'inherit'
};

const card = {
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid #eee',
  borderRadius: '12px',
  overflow: 'hidden',
  backgroundColor: '#fff',
  boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
  transition: 'transform 0.2s ease',
  cursor: 'pointer',
};

const imageStyle = {
  width: '100%',
  height: '200px',
  objectFit: 'cover',
};

const infoStyle = {
  padding: '16px',
};

const titleStyle = {
  fontSize: '18px',
  fontWeight: '600',
  marginBottom: '6px',
};

const locationStyle = {
  fontSize: '14px',
  color: '#555',
  marginBottom: '4px',
};

const detailsStyle = {
  fontSize: '13px',
  color: '#777',
  marginBottom: '6px',
};

const priceStyle = {
  fontWeight: '600',
  marginBottom: '6px',
};

const amenitiesStyle = {
  fontSize: '13px',
  color: '#555',
  marginBottom: '6px',
};

const ratingStyle = {
  display: 'flex',
  alignItems: 'center',
  fontSize: '13px',
  color: '#444'
};

export default ListingCard;
