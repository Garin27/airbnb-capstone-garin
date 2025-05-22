import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      await api.post('/api/auth/register', formData);
      setMessage('✅ Registration successful!');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setMessage('❌ Email already exists or error occurred.');
    }
  };

  return (
    <div style={containerStyle}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

const containerStyle = {
  maxWidth: '400px',
  margin: '0 auto',
  padding: '2rem',
  fontFamily: 'Arial',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
};

const inputStyle = {
  padding: '0.75rem',
  borderRadius: '6px',
  border: '1px solid #ccc',
};

const buttonStyle = {
  padding: '0.75rem',
  backgroundColor: '#FF5A5F',
  border: 'none',
  color: 'white',
  borderRadius: '6px',
  fontSize: '16px',
  cursor: 'pointer',
};

export default RegisterPage;


