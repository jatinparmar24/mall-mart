import React from 'react';
import { useNavigate } from 'react-router-dom';


const movies = [
  {
    title: "Deadpool 3",
    genre: "Comedy | Action",
    duration: "2h 15m",
    language: "English",
    time: "7:30 PM",
    image: "https://i.imgur.com/PkGZ6cz.jpg"
  },
  {
    title: "Inside Out 2",
    genre: "Animation | Family",
    duration: "1h 50m",
    language: "English",
    time: "5:00 PM",
    image: "https://i.imgur.com/kAr0DEr.jpg"
  },
  {
    title: "Kalki 2898 AD",
    genre: "Sci-Fi | Action",
    duration: "2h 50m",
    language: "Hindi",
    time: "9:00 PM",
    image: "https://i.imgur.com/M2zICfi.jpg"
  },
];

const MovieSection = () => {
  const navigate = useNavigate();

  return (
    <section className="movie-theater-section">
      <h2 className="section-title">🎬 Now Showing</h2>
      <div className="movie-theater-grid">
        {movies.map((movie, index) => (
          <div className="movie-theater-card" key={index}>
            <img src={movie.image} alt={movie.title} className="movie-poster" />
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <p className="genre">{movie.genre}</p>
              <p className="meta">🕘 {movie.duration} | 🎞️ {movie.language}</p>
              <span className="badge">🎟️ {movie.time}</span>
            </div>
          </div>
        ))}
      </div>
      <button className="theater-btn" onClick={() => navigate('/movies')}>Explore All Movies</button>
    </section>
  );
};

export default MovieSection;
