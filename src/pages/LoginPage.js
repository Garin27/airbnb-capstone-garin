import React, { useState } from 'react';
import api from '../api'; // 👈 imported centralized axios instance
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post('/api/auth/login', {
        email,
        password,
      });

      const { token, user } = res.data;

      login(user, token); // Save user & token
      toast.success('🎉 Logged in successfully!');
      navigate('/my-reservations');
    } catch (err) {
      console.error('Login failed:', err);
      toast.error('❌ Login failed. Check credentials.');
    }
  };

  return (
    <div style={containerStyle}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={formStyle}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Login</button>
      </form>
    </div>
  );
};

// --- Styles ---
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
  backgroundColor: '#FF5A5F',
  color: '#fff',
  padding: '0.75rem',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
};

export default LoginPage;





