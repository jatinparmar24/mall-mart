import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const rowPrices = {
  Gold: 300,
  Silver: 200,
  Diamond: 500
};

const BookingPage = () => {
  const navigate = useNavigate();
  const { movieTitle } = useParams();
  const [formData, setFormData] = useState({
    email: '',
    seatCount: 1,
    show_time: '',
    language: '',
    rowType: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  const timeOptions = ['12:00 AM', '3:00 PM', '6:00 PM', '9:00 PM'];
  const languageOptions = ['Hindi', 'English', 'Tamil', 'Telugu'];
  const rowOptions = ['Gold', 'Silver', 'Diamond'];

  // ✅ Set user email from localStorage on load
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("mallmartUser"));
    if (user?.email) {
      setFormData((prev) => ({ ...prev, email: user.email }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };

    if (name === 'seatCount' || name === 'rowType') {
      const count = parseInt(updatedFormData.seatCount) || 0;
      const price = rowPrices[updatedFormData.rowType] || 0;
      setTotalAmount(count * price);
    }

    setFormData(updatedFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      email: formData.email,
      seat_count: parseInt(formData.seatCount),
      row_type: formData.rowType,
      amount: totalAmount,
      show_time: formData.show_time,
      language: formData.language,
      movie_title: movieTitle,
    };

    try {
      await axios.post('http://localhost:8000/api/bookings/', bookingData);
      setSubmitted(true);
    } catch (error) {
      alert(error.response?.data?.error || 'Booking failed');
    }
  };

  return (

    <>
    <div style={{ position: "absolute", top: "150px", left: "30px" }}>
      <button
        onClick={() => navigate("/movies")}
        style={{
          padding: "8px 16px",
          borderRadius: "6px",
          background: "#1976d2",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}
      >
        ← Back to Movie Section
      </button>
    </div>

    
    <div className="booking-wrapper">
      <div className="booking-container">
        <h2>🎬 Book Tickets for: <span>{movieTitle}</span></h2>

        <form className="booking-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
            required
          />

          <select name="seatCount" onChange={handleChange} required>
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} Seat(s)
              </option>
            ))}
          </select>

          <select name="rowType" onChange={handleChange} required>
            <option value="">Select Row</option>
            {rowOptions.map((row) => (
              <option key={row} value={row}>
                {row} - ₹{rowPrices[row]}
              </option>
            ))}
          </select>

          <select name="show_time" onChange={handleChange} required>
            <option value="">🕘 Select Show Time</option>
            {timeOptions.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>

          <select name="language" onChange={handleChange} required>
            <option value="">🌐 Select Language</option>
            {languageOptions.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>

          {formData.seatCount && formData.rowType && (
            <p style={{ margin: '10px 0', fontWeight: 'bold' }}>
              💰 Total Payable: ₹{totalAmount}
            </p>
          )}

          <button type="submit">✅ Confirm Booking</button>
        </form>

        {submitted && (
          <div className="booking-summary">
            <p className="success-msg">🎉 Booking Confirmed Successfully!</p>
            <h3>📋 Booking Summary</h3>
            <p><strong>Movie:</strong> {movieTitle}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Seats:</strong> {formData.seatCount} in {formData.rowType}</p>
            <p><strong>Show Time:</strong> {formData.show_time}</p>
            <p><strong>Language:</strong> {formData.language}</p>
            <p><strong>Total Amount:</strong> ₹{totalAmount}</p>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default BookingPage;
