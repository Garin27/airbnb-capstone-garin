// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://airbnb-backend-garin-4aad2864e6ba.herokuapp.com',
});

export default api;
