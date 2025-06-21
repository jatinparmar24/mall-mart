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
              <img src="/hero_shopping.jpg" alt="Shopping" />
              <span>Shopping</span>
            </div>
            <div className="hero-box">
              <img src="/hero_movie.jpg" alt="Movies" />
              <span>Movies</span>
            </div>
            <div className="hero-box">
              <img src="/games_hero.jpg" alt="Games" />
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
