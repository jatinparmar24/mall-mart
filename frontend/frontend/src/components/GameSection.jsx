import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const GameSection = () => {
  const navigate = useNavigate();

  return (
    <section className="gamezone-section">
      <div className="gamezone-overlay">
        <motion.div
          className="floating-icons"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          <span>🎲</span>
          <span>🧠</span>
          <span>⚡</span>
          <span>🎯</span>
        </motion.div>

        <div className="gamezone-content">
          <motion.h2
            className="gamezone-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
          >
            🎮 Dive Into the Game Zone
          </motion.h2>

          <motion.p
            className="gamezone-description"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            viewport={{ once: true }}
          >
            From strategy to speed—challenge your reflexes, solve puzzles, and have endless fun! Experience the thrill of gaming right here at Mall Mart.
          </motion.p>

          <motion.ul
            className="feature-list"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            viewport={{ once: true }}
          >
            <li>🕹️ Quick to play, fun to master</li>
            <li>⚡ Boost your brain & speed</li>
            <li>🏆 Compete & score high</li>
          </motion.ul>

          <div className="gamezone-cards">
            {["Tic Tac Toe", "Dice Roll Duel", "Guess the Number"].map((title, i) => (
              <motion.div
                className="game-card"
                key={title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.2 + i * 0.2 }}
                viewport={{ once: true }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
                  alt={title}
                />
                <h3>{title}</h3>
                <p>
                  {title === "Tic Tac Toe"
                    ? "Classic Xs and Os. Outsmart your opponent!"
                    : title === "Dice Roll Duel"
                    ? "Roll the dice and beat your opponent to score!"
                    : "Can you guess the secret number in limited tries?"}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.button
            className="explore-games-btn"
            onClick={() => navigate("/gamelist")}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.8 }}
            viewport={{ once: true }}
          >
            🎲 Explore All Games
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default GameSection;
