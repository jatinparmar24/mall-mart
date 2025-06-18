import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const AdminAddMovie = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    language: "",
    duration: "",
    show_time: "",
    poster_url: "",
    trailer_url: "",
  });

  const [message, setMessage] = useState("");
  const [bookings, setBookings] = useState([]);
  const [searchEmail, setSearchEmail] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/bookings/");
      setBookings(res.data);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/movies/", formData);
      setMessage("🎬 Movie added successfully!");
      setFormData({
        title: "",
        genre: "",
        language: "",
        duration: "",
        show_time: "",
        poster_url: "",
        trailer_url: "",
      });
    } catch (err) {
      console.error("Error:", err);
      setMessage("❌ Failed to add movie. Please try again.");
    }
  };

  const filteredBookings = bookings.filter((booking) =>
    booking.email.toLowerCase().includes(searchEmail.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="admin-movie-form-container">
        <button
          onClick={() => navigate("/movies")}
          style={{
            marginBottom: "1rem",
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

      <h2>Add New Movie</h2>
      <form onSubmit={handleSubmit} className="admin-movie-form">
        {["title", "genre", "language", "duration", "show_time", "poster_url", "trailer_url"].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            value={formData[field]}
            onChange={handleChange}
            placeholder={field.replace("_", " ").toUpperCase()}
            required
          />
        ))}
        <button type="submit">Add Movie</button>
      </form>
      {message && <p className="form-message">{message}</p>}

      <div className="booking-list-section">
        <h3>🎟️ Movie Ticket Bookings</h3>
        
        <input
          type="text"
          placeholder="Search by Email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          style={{
            padding: "8px 12px",
            marginBottom: "1rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            width: "100%",
            maxWidth: "300px"
          }}
        />

        {currentBookings.length > 0 ? (
          <>
            <div className="booking-table-wrapper">
              <table className="booking-table">
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Movie Title</th>
                    <th>Show Time</th>
                    <th>Seats</th>
                    <th>Row</th>
                    <th>Language</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {currentBookings.map((booking, index) => (
                    <tr key={index}>
                      <td>{booking.email}</td>
                      <td>{booking.movie_title}</td>
                      <td>{booking.show_time}</td>
                      <td>{booking.seat_count}</td>
                      <td>{booking.row_type}</td>
                      <td>{booking.language}</td>
                      <td>₹{booking.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: "1rem", display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "6px",
                    background: currentPage === i + 1 ? "#00c853" : "#ccc",
                    border: "none",
                    color: "#fff",
                    cursor: "pointer"
                  }}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </>
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminAddMovie;
