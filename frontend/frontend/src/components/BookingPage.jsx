import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookingPage = () => {
  const { movieTitle } = useParams();
  const [formData, setFormData] = useState({
    email: '',
    seat: '',
    show_time: '',
    language: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookingData = { ...formData, movie_title: movieTitle };
    try {
      await axios.post('http://localhost:8000/api/bookings/', bookingData);
      alert('🎉 Booking Confirmed!');
    } catch (error) {
      alert('Booking failed');
    }
  };

  return (
    <div className="booking-container">
      <h2>🎬 Book Tickets for: <span>{movieTitle}</span></h2>
      <form className="booking-form" onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Your Email" onChange={handleChange} required />
        <input type="text" name="seat" placeholder="Seat Number (e.g., A5)" onChange={handleChange} required />
        <input type="text" name="show_time" placeholder="Show Time (e.g., 7:30 PM)" onChange={handleChange} required />
        <input type="text" name="language" placeholder="Language (e.g., Hindi)" onChange={handleChange} required />
        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
};

export default BookingPage;
