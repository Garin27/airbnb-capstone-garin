// src/components/Footer.js

import React from 'react';

const Footer = () => {
  return (
    <footer style={footerContainer}>
      <div style={footerContent}>
        <p style={footerText}>
          © {new Date().getFullYear()} The Daily Scalp • Built by Garin Hoole
        </p>
        <div style={linkGroup}>
          <a href="https://www.instagram.com/garin_hoole" target="_blank" rel="noreferrer" style={footerLink}>
            Instagram
          </a>
          <span style={divider}>|</span>
          <a href="/contact" style={footerLink}>
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

// === Styles ===
const footerContainer = {
  backgroundColor: '#f7f7f7',
  padding: '20px',
  marginTop: '60px',
  borderTop: '1px solid #ddd',
};

const footerContent = {
  maxWidth: '1200px',
  margin: '0 auto',
  textAlign: 'center',
  fontSize: '14px',
  color: '#555',
};

const linkGroup = {
  marginTop: '8px',
};

const footerLink = {
  color: '#333',
  textDecoration: 'none',
  margin: '0 6px',
};

const divider = {
  margin: '0 6px',
  color: '#999',
};

const footerText = {
  marginBottom: '5px',
};

export default Footer;

