import React from 'react';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-overlay">
        <div className="hero-content">
          <h1>Mall Mart</h1>
          <p className="hero-subtitle">Everything you love in one place — shopping, movies, and games!</p>

          <div className="hero-gallery">
            <div className="hero-box">
              <img src="https://images.unsplash.com/photo-1542838686-9f5cf24867c6?auto=format&fit=crop&w=800&q=80" alt="Shopping" />
              <span>Shopping</span>
            </div>
            <div className="hero-box">
              <img src="https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?auto=format&fit=crop&w=800&q=80" alt="Movies" />
              <span>Movies</span>
            </div>
            <div className="hero-box">
              <img src="https://images.unsplash.com/photo-1598550487032-fbc9c184f4c2?auto=format&fit=crop&w=800&q=80" alt="Games" />
              <span>Games</span>
            </div>
          </div>

          <div className="hero-highlights">
            <div className="highlight">
              <h2>500+</h2>
              <p>Products Available</p>
            </div>
            <div className="highlight">
              <h2>100+</h2>
              <p>Latest Movies</p>
            </div>
            <div className="highlight">
              <h2>24/7</h2>
              <p>Entertainment Access</p>
            </div>
          </div>

          <p className="hero-tagline">Bringing lifestyle, fun, and convenience right to your screen.</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
