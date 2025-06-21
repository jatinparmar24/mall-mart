import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const movies = [
  {
    title: "Deadpool 3",
    genre: "Comedy | Action",
    duration: "2h 15m",
    language: "English",
    time: "7:30 PM",
    image: "/deadpool.jpg"
  },
  {
    title: "R R R",
    genre: "Action",
    duration: "3h 20m",
    language: "Hindi",
    time: "5:00 PM",
    image: "/rrr.jpg"
  },
  {
    title: "Kalki 2898 AD",
    genre: "Sci-Fi | Action",
    duration: "2h 50m",
    language: "Hindi",
    time: "9:00 PM",
    image: "/kalki.jpg"
  },
];

const MovieSection = () => {
  const navigate = useNavigate();

  return (
    <section className="movie-theater-section">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        🎬 Now Showing
      </motion.h2>

      <motion.div
        className="movie-theater-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.3 }}
      >
        {movies.map((movie, index) => (
          <motion.div
            className="movie-theater-card"
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <img src={movie.image} alt={movie.title} className="movie-poster" />
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <p className="genre">{movie.genre}</p>
              <p className="meta">🕘 {movie.duration} | 🎞️ {movie.language}</p>
              <span className="badge">🎟️ {movie.time}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.button
        className="theater-btn"
        onClick={() => navigate('/movies')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        Explore All Movies
      </motion.button>
    </section>
  );
};

export default MovieSection;