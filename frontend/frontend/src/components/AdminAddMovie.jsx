import React, { useState } from "react";
import axios from "axios";

const AdminAddMovie = () => {
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
      setMessage("Movie added successfully!");
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
      setMessage("Failed to add movie. Please try again.");
    }
  };

  return (
    <div className="admin-movie-form-container">
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
    </div>
  );
};

export default AdminAddMovie;
