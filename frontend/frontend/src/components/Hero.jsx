import React from 'react';
import { motion } from 'framer-motion';


const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-overlay">
        <div className="hero-content">
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            Welcome to Mall Mart
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.6 }}
          >
            Your one-stop destination for shopping, movies, games, and more — all in one virtual mall!
          </motion.p>

          <motion.div
            className="hero-tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 1.2 }}
          >
            Explore now and experience entertainment like never before.
          </motion.div>

          <div className="hero-gallery">
            {['Shopping', 'Movies', 'Games', 'Offers'].map((label, index) => (
              <motion.div
                key={label}
                className="hero-box"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2 + 0.3 * index, duration: 0.6 }}
                whileHover={{ scale: 1.1 }}
              >
                <img
                  src={
                    label === 'Shopping'
                      ? 'https://cdn-icons-png.flaticon.com/512/263/263115.png'
                      : label === 'Movies'
                      ? 'https://cdn-icons-png.flaticon.com/512/833/833314.png'
                      : label === 'Games'
                      ? 'https://cdn-icons-png.flaticon.com/512/1055/1055687.png'
                      : 'https://cdn-icons-png.flaticon.com/512/5951/5951396.png'
                  }
                  alt={label}
                />
                <span>{label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Hero Rotating Disc with Four Animated Pieces */}
        <div className="hero-visual-disc">
          <div className="disc">
            {["Shopping", "Movies", "Games", "Offers"].map((label, index) => (
              <motion.div
                key={label}
                className={`disc-piece piece-${index}`}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 12 + index * 2, ease: 'linear' }}
              >
                <div className="disc-item">
                  <img
                    src={
                      index === 0
                        ? 'https://cdn-icons-png.flaticon.com/512/263/263115.png'
                        : index === 1
                        ? 'https://cdn-icons-png.flaticon.com/512/833/833314.png'
                        : index === 2
                        ? 'https://cdn-icons-png.flaticon.com/512/1055/1055687.png'
                        : 'https://cdn-icons-png.flaticon.com/512/5951/5951396.png'
                    }
                    alt={label}
                  />
                  <p>{label}</p>
                </div>
              </motion.div>
            ))}
            <motion.div
              className="orbiting-item"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
            >
              <div className="orbit-inner">
                <img src="/logo192.png" alt="Mall Mart Icon" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
