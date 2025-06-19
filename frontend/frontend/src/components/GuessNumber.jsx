import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const GuessNumber = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("mallmartUser"));

  const [secretNumber, setSecretNumber] = useState(null);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [attemptsLeft, setAttemptsLeft] = useState(7);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (!user) {
      alert("Please log in to play!");
      navigate("/login");
    } else {
      startNewGame();
    }
  }, []);

  const startNewGame = () => {
    setSecretNumber(Math.floor(Math.random() * 100) + 1); // 1 to 100
    setGuess("");
    setMessage("");
    setAttemptsLeft(7);
    setGameOver(false);
  };

  const handleGuess = () => {
  const numericGuess = Number(guess);
  if (!numericGuess || numericGuess < 1 || numericGuess > 100) {
    setMessage("Enter a number between 1 and 100.");
    return;
  }

  if (gameOver) return;

  const difference = Math.abs(numericGuess - secretNumber);

  if (numericGuess === secretNumber) {
    setMessage(`🎉 Correct! The number was ${secretNumber}`);
    setGameOver(true);
    saveScoreToBackend("win");
  } else {
    let hint = numericGuess > secretNumber ? "Too high 📈" : "Too low 📉";

    if (difference <= 5) {
      hint += " — but you're very close! 🔥";
    }

    setMessage(hint);
    const remaining = attemptsLeft - 1;
    setAttemptsLeft(remaining);

    if (remaining === 0) {
      setGameOver(true);
      setMessage(`❌ Out of attempts! The number was ${secretNumber}`);
      saveScoreToBackend("lose");
    }
    }

    setGuess("");
   };

  const saveScoreToBackend = async (result) => {
    try {
      await axios.post("http://127.0.0.1:8000/api/save-guess-score/", {
        player: user.username, 
        result: result,
      });
      console.log("Score saved.");
    } catch (error) {
      console.error("Failed to save score:", error);
    }
  };

  return (
    <div className="guess-section">
  <h2>🔢 Guess the Number</h2>
  <p>I'm thinking of a number between <strong>1 and 100</strong>.</p>
  <p>You have <strong>{attemptsLeft}</strong> attempts left.</p>

  <input
    type="number"
    placeholder="Enter your guess"
    value={guess}
    onChange={(e) => setGuess(e.target.value)}
    disabled={gameOver}
  />
  <button
    className="guess-button"
    onClick={handleGuess}
    disabled={gameOver}
  >
    Submit Guess
  </button>

  {message && <p className="message">{message}</p>}

  {gameOver && (
    <button className="play-again" onClick={startNewGame}>
      🔁 Play Again
    </button>
  )}

  <button className="back-button" onClick={() => navigate("/gamelist")}>
    ⬅ Back to Games
  </button>
</div>

  );
};

export default GuessNumber;
