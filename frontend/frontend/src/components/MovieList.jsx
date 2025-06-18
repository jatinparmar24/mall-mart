import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const MovieList = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false
  };

  useEffect(() => {
    axios.get("http://localhost:8000/api/movies/")
      .then((res) => setMovies(res.data))
      .catch((err) => console.error("Error fetching movies:", err));
  }, []);

  return (
    <div className="movie-page">
      {/* 🎞️ Slider Section */}
      <div className="movie-slider">
        <Slider {...settings}>
          {movies.map((movie, idx) => (
            <div key={idx} className="slider-card">
              <img src={movie.poster_url} alt={movie.title} />
              <div className="slider-title">{movie.title}</div>
            </div>
          ))}
        </Slider>
      </div>

      {/* 🎥 Trailer Section */}
      <div className="trailer-section">
        <h2>🎥 Watch Trailer</h2>
        <div className="video-wrapper">
          {movies.length > 0 && (
            <iframe
              src={movies[0].trailer_url}
              title="Movie Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </div>
      </div>

      {/* 🎟️ Booking Section */}
      <div className="booking-section">
        <div className="booking-header">
          <h2>🎟️ Book Your Movie</h2>
          <button
            className="add-movie-btn"
            onClick={() => {
              const user = JSON.parse(localStorage.getItem("mallmartUser"));
              if (user && user.email && user.role === "movieadmin") {
                navigate("/admin/movies/add");
              } else {
                navigate("/login", { state: { redirectTo: "/admin/movies/add" } });
              }
            }}
          >
            ➕ Add New Movie
          </button>

        </div>
        <div className="movie-grid">
          {movies.map((movie, index) => (
            <div className="movie-book-card" key={index}>
              <img src={movie.poster_url} alt={movie.title} />
              <h3>{movie.title}</h3>
              <p>{movie.genre}</p>
              <p>⏱️ {movie.duration}</p>
              <p>🎞️ {movie.language}</p>
              <p>🕘 Showtime: {movie.show_time}</p> {/* ✅ FIXED */}
              <button onClick={() => navigate(`/booking/${movie.title}`)}>Book Now</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
