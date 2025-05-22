import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import { toast } from 'react-toastify';

const UpdateListingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    location: '',
    price: '',
    description: '',
    guests: '',
    bedrooms: '',
    amenities: '',
    images: '',
  });

  useEffect(() => {
    api.get(`/api/listings/${id}`)
      .then(res => {
        const data = res.data;
        setForm({
          title: data.title,
          location: data.location,
          price: data.price,
          description: data.description,
          guests: data.guests,
          bedrooms: data.bedrooms,
          amenities: data.amenities.join(', '),
          images: data.images.join(', '),
        });
      })
      .catch(err => {
        console.error('Error fetching listing:', err);
        toast.error('Failed to load listing');
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    api.put(`/api/listings/${id}`, {
      ...form,
      amenities: form.amenities.split(',').map(a => a.trim()),
      images: form.images.split(',').map(i => i.trim()),
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        toast.success('✅ Listing updated!');
        navigate('/');
      })
      .catch(err => {
        console.error('Update error:', err);
        toast.error('❌ Failed to update listing');
      });
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2>Update Listing</h2>
      <form onSubmit={handleUpdate}>
        {['title', 'location', 'price', 'description', 'guests', 'bedrooms', 'amenities', 'images'].map((field) => (
          <div key={field} style={{ marginBottom: '10px' }}>
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
            <input
              type="text"
              name={field}
              value={form[field]}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px' }}
              required
            />
          </div>
        ))}
        <button type="submit" style={buttonStyle}>Update</button>
      </form>
    </div>
  );
};

const buttonStyle = {
  backgroundColor: '#FF5A5F',
  color: '#fff',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '6px',
  cursor: 'pointer',
};

export default UpdateListingPage;


