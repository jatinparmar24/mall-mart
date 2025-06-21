import React from "react";
import { useNavigate } from "react-router-dom";

const GameSection = () => {
  const navigate = useNavigate();

  return (
    <section className="gamezone-section">
      <div className="gamezone-overlay">
        <div className="floating-icons">
          <span>🎲</span>
          <span>🧠</span>
          <span>⚡</span>
          <span>🎯</span>
        </div>

        <div className="gamezone-content">
          <h2 className="gamezone-title">🎮 Dive Into the Game Zone</h2>
          <p className="gamezone-description">
            From strategy to speed—challenge your reflexes, solve puzzles, and have endless fun! Experience the thrill of gaming right here at Mall Mart.
          </p>
          <ul className="feature-list">
            <li>🕹️ Quick to play, fun to master</li>
            <li>⚡ Boost your brain & speed</li>
            <li>🏆 Compete & score high</li>
          </ul>
          <div className="gamezone-cards">
            <div className="game-card">
              <img src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png" alt="Tic Tac Toe" />
              <h3>Tic Tac Toe</h3>
              <p>Classic Xs and Os. Outsmart your opponent!</p>
            </div>
            <div className="game-card">
              <img src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png" alt="Dice Game" />
              <h3>Dice Roll Duel</h3>
              <p>Roll the dice and beat your opponent to score!</p>
            </div>
            <div className="game-card">
              <img src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png" alt="Guess the Number" />
              <h3>Guess the Number</h3>
              <p>Can you guess the secret number in limited tries?</p>
            </div>
          </div>
          <button className="explore-games-btn" onClick={() => navigate("/gamelist")}>
            🎲 Explore All Games
          </button>
        </div>
      </div>
    </section>
  );
};

export default GameSection;
