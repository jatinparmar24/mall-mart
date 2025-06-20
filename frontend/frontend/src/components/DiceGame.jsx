import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DiceGame = () => {
  const [playerName, setPlayerName] = useState("");
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [round, setRound] = useState(1);
  const [turn, setTurn] = useState("player");
  const [playerRoll, setPlayerRoll] = useState(null);
  const [computerRoll, setComputerRoll] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const maxRounds = 5;

  const navigate = useNavigate();

  useEffect(() => {
  const user = JSON.parse(localStorage.getItem("mallmartUser"));
  let name = "";

  if (user) {
    if (typeof user.username === "string") {
      name = user.username.trim();
    } else if (Array.isArray(user.username) && typeof user.username[0] === "string") {
      name = user.username[0].trim();
    }
  }

  if (!name) name = "Unknown Player";

  setPlayerName(name);
}, []);


  const rollDice = () => Math.floor(Math.random() * 6) + 1;

  const handlePlayerRoll = () => {
    if (turn !== "player" || round > maxRounds) return;

    const roll = rollDice();
    setPlayerRoll(roll);
    setPlayerScore(prev => prev + roll);
    setTurn("computer");
    setLoading(true);

    setTimeout(() => {
      handleComputerRoll();
    }, 1200);
  };

  const handleComputerRoll = () => {
    const comp = rollDice();
    setComputerRoll(comp);
    setComputerScore(prev => prev + comp);

    setTimeout(() => {
      if (round === maxRounds) {
        declareResult();
      }
      setRound(prev => prev + 1);
      setTurn("player");
      setLoading(false);
    }, 1000);
  };

  const declareResult = async () => {
    const winner = playerScore > computerScore ? playerName : computerScore > playerScore ? "Computer" : "Draw";

    try {
      if (winner === playerName) {
        const scoreData = {
          player1: playerName,
          player2: "Computer",
          score1: playerScore,
          score2: computerScore,
          winner: playerName
        };

        console.log("Posting to backend:", scoreData);
        console.log("Types:", {
          player1: typeof playerName,
          winner: typeof playerName
        });

        await axios.post("http://localhost:8000/api/games/dice/save/", scoreData);
        setMessage("🏆 You Win! Score Saved to Leaderboard.");
      } else if (winner === "Computer") {
        setMessage("😞 You Lose! Try Again.");
      } else {
        setMessage("⚖️ It's a Draw! Play Again?");
      }
    } catch (error) {
      console.error("Failed to save score:", error.response?.data || error.message);
      setMessage("⚠️ Failed to save score. Please try again.");
    }
  };

  const resetGame = () => {
    setPlayerScore(0);
    setComputerScore(0);
    setRound(1);
    setPlayerRoll(null);
    setComputerRoll(null);
    setMessage("");
    setTurn("player");
    setLoading(false);
  };

  const getDiceImage = (roll) =>
    roll ? `/images/dice-${roll}.png` : "/images/dice-empty.png";

  return (
    <div className="dice-game-container">
      <h2>🎲 Dice Duel: You vs Computer</h2>
      <p className="round-indicator">Round: {round > maxRounds ? maxRounds : round} / {maxRounds}</p>
      <p className="turn-indicator">
        {turn === "player"
          ? "🎯 Your Turn"
          : loading
          ? "🤖 Computer is thinking..."
          : "💻 Computer's Turn"}
      </p>

      <div className="dice-players">
        <div className={`player-card ${turn === "player" && !message ? "glow" : ""}`}>
          <h3>{playerName}</h3>
          <img src={getDiceImage(playerRoll)} alt="Player Dice" className={loading ? "dim" : ""} />
          <p>Rolled: {playerRoll ?? "-"}</p>
          <p>Total Score: {playerScore}</p>
        </div>
        <div className={`player-card ${turn === "computer" && loading ? "glow" : ""}`}>
          <h3>Computer</h3>
          <img src={getDiceImage(computerRoll)} alt="Computer Dice" className={loading ? "dim" : ""} />
          <p>Rolled: {computerRoll ?? "-"}</p>
          <p>Total Score: {computerScore}</p>
        </div>
      </div>

      {!message ? (
        <button
          className="game-button"
          onClick={handlePlayerRoll}
          disabled={turn !== "player" || round > maxRounds || loading}
        >
          🎲 Roll Dice
        </button>
      ) : (
        <>
          <p className="result-message">{message}</p>
          <button className="game-button" onClick={resetGame}>🔄 Play Again</button>
        </>
      )}

      <button className="game-button" onClick={() => navigate("/gamelist")}>⬅️ Back to Games</button>
    </div>
  );
};

export default DiceGame;
