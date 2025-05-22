import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav style={navStyle}>
      <h2 style={logoStyle}>🏠 Airbnb Clone</h2>
      <div style={linkContainer}>
        <Link to="/" style={linkStyle}>Home</Link>
        {user ? (
          <>
            <Link to="/my-reservations" style={linkStyle}>My Reservations</Link>
            <button onClick={logout} style={buttonStyle}>Logout</button>
          </>
        ) : (
          <Link to="/login" style={linkStyle}>Login</Link>
        )}
        <Link to="/register" style={linkStyle}>Register</Link>
        {user && <Link to="/create-listing" style={linkStyle}>Create Listing</Link>}


      </div>
    </nav>
  );
};

// --- Styles ---
const navStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 24px',
  backgroundColor: '#fef6f1',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  fontFamily: 'Arial, sans-serif',
};

const logoStyle = {
  margin: 0,
  fontSize: '20px',
  fontWeight: 'bold',
  color: '#333',
};

const linkContainer = {
  display: 'flex',
  gap: '16px',
  alignItems: 'center',
};

const linkStyle = {
  textDecoration: 'none',
  color: '#333',
  fontWeight: '500',
};

const buttonStyle = {
  padding: '6px 12px',
  backgroundColor: '#FF5A5F',
  border: 'none',
  borderRadius: '6px',
  color: 'white',
  cursor: 'pointer',
  fontWeight: 'bold'
};

export default Navbar;


