 import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p>&copy; {new Date().getFullYear()} The Daily Scalp • Built by Garin Hoole</p>
      <div>
        <a href="https://www.instagram.com/garin_hoole" target="_blank" rel="noreferrer" style={linkStyle}>
          Instagram
        </a>
        {' | '}
        <a href="mailto:garin27@icloud.com" style={linkStyle}>Contact</a>
      </div>
    </footer>
  );
};

const footerStyle = {
  marginTop: '40px',
  padding: '20px',
  textAlign: 'center',
  backgroundColor: '#f5f5f5',
  color: '#444',
  fontSize: '14px',
  borderTop: '1px solid #ddd'
};

const linkStyle = {
  color: '#555',
  textDecoration: 'none'
};

export default Footer;
