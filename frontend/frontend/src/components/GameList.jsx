import React from "react";
import { useNavigate } from "react-router-dom";


const games = [
  {
    id: 1,
    title: "Dice Duel",
    image: "/images/dice-game.png",
    description: "Roll the dice and try your luck!",
    path: "/games/dice",
    featured: true,
    stats: "Players Today: 120+",
  },
  {
    id: 2,
    title: "Tic Tac Toe",
    image: "/images/tic-tac-toe.png",
    description: "Classic 2-player X and O challenge!",
    path: "/games/tictactoe",
    stats: "Players Today: 85+",
  },
  {
    id: 3,
    title: "Guess the Number",
    image: "/images/guess-number.png",
    description: "Try to guess the secret number in limited tries.",
    path: "/games/guess",
    stats: "Players Today: 98+",
  },
  {
    id: 4,
    title: "Quiz Competition",
    image: "/images/quiz.png",
    description: "Answer rapid fire questions and test your knowledge!",
    path: "/games/quiz",
    stats: "Players Today: 110+",
  },
];

const GamesList = () => {
  const navigate = useNavigate();

  const handlePlayGame = (gamePath) => {
    const user = JSON.parse(localStorage.getItem("mallmartUser"));
    if (!user) {
      alert("Please log in to play games!");
      navigate("/login");
    } else {
      navigate(gamePath);
    }
  };

  const handleLeaderDashboard = () => {
    const user = JSON.parse(localStorage.getItem("mallmartUser"));
    if (!user) {
      alert("Please log in to view the Leader Dashboard!");
      navigate("/login");
    } else {
      navigate("/leaderboard");
    }
  };

  return (
    <div className="games-list-container">
      <div className="games-header">
        <h1>🎮 Choose a Game to Play</h1>
        <button className="leaderboard-btn" onClick={handleLeaderDashboard}>
          🏆 Leader Dashboard
        </button>
      </div>

      <p className="games-intro">
        Dive into a world of exciting and addictive games. Compete, learn, and have fun — all in one place!
      </p>

      <div className="games-grid">
        {games.map((game) => (
          <div className="game-card" key={game.id}>
            {game.featured && <div className="featured-badge">🔥 Featured</div>}
            <img src={game.image} alt={game.title} />
            <h3>{game.title}</h3>
            <p>{game.description}</p>
            <div className="game-stats">{game.stats}</div>
            <button onClick={() => handlePlayGame(game.path)}>▶ Play</button>
          </div>
        ))}
      </div>

      <div className="games-footer-note">
        🚀 More exciting games coming soon. Stay tuned!
      </div>
    </div>
  );
};

export default GamesList;
