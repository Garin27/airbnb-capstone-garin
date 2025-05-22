import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home'; // ✅ NEW HOME PAGE
import ListingsPage from './pages/ListingsPage';
import ListingDetails from './pages/ListingDetails';
import MyReservations from './pages/MyReservations';
import CreateListingPage from './pages/CreateListingPage';
import UpdateListingPage from './pages/UpdateListingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        {/* ✅ Home page updated here */}
        <Route path="/" element={<Home />} />

        <Route path="/listings" element={<ListingsPage />} />
        <Route path="/listing/:id" element={<ListingDetails />} />
        <Route path="/listing/:id/edit" element={
          <ProtectedRoute>
            <UpdateListingPage />
          </ProtectedRoute>
        } />
        <Route path="/create-listing" element={
          <ProtectedRoute>
            <CreateListingPage />
          </ProtectedRoute>
        } />
        <Route path="/my-reservations" element={
          <ProtectedRoute>
            <MyReservations />
          </ProtectedRoute>
        } />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
