import React from 'react';
import { Link } from 'react-router-dom';

const ListingCard = ({ listing }) => {
  return (
    <Link to={`/listing/${listing._id}`} style={linkStyle}>
      <div style={cardStyle}>
        <img src={listing.images[0]} alt={listing.title} style={imgStyle} />
        <h3>{listing.title}</h3>
        <p>{listing.location}</p>
        <p><strong>R{listing.price}</strong> per night</p>
      </div>
    </Link>
  );
};

const cardStyle = {
  border: '1px solid #e3e3e3',
  borderRadius: '12px',
  width: '260px',
  padding: '10px',
  margin: '10px',
  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  fontFamily: 'Arial, sans-serif',
  backgroundColor: '#fff',
  cursor: 'pointer',
  textAlign: 'left',
};

const imgStyle = {
  width: '100%',
  height: '160px',
  objectFit: 'cover',
  borderRadius: '8px'
};

const linkStyle = {
  textDecoration: 'none',
  color: 'inherit'
};

export default ListingCard;

