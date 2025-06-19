import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TicTacToe = () => {
  const navigate = useNavigate();
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const user = JSON.parse(localStorage.getItem("mallmartUser"));

  useEffect(() => {
    if (!user) {
      alert("You must be logged in to play!");
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const result = checkWinner(board);
    if (result) {
      setWinner(result);
      if (result === "player") {
        saveScoreToBackend("win");
      } else {
        saveScoreToBackend("lose");
      }
    } else if (!board.includes(null)) {
      setWinner("draw");
      saveScoreToBackend("draw");
    } else if (!isPlayerTurn) {
      setTimeout(computerMove, 600);
    }
  }, [board, isPlayerTurn]);

  const handleClick = (index) => {
    if (board[index] || winner || !isPlayerTurn) return;
    const updatedBoard = [...board];
    updatedBoard[index] = "X";
    setBoard(updatedBoard);
    setIsPlayerTurn(false);
  };

  const computerMove = () => {
    const emptyIndices = board
      .map((val, idx) => (val === null ? idx : null))
      .filter((val) => val !== null);
    const randomIndex =
      emptyIndices[Math.floor(Math.random() * emptyIndices.length)];

    if (randomIndex !== undefined) {
      const updatedBoard = [...board];
      updatedBoard[randomIndex] = "O";
      setBoard(updatedBoard);
      setIsPlayerTurn(true);
    }
  };

  const checkWinner = (b) => {
    const winCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let [a, b1, c] of winCombos) {
      if (b[a] && b[a] === b[b1] && b[a] === b[c]) {
        return b[a] === "X" ? "player" : "computer";
      }
    }
    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setWinner(null);
  };

  const saveScoreToBackend = async (result) => {
  if (!user) return;
  try {
    await axios.post("http://127.0.0.1:8000/api/save-tictactoe-score/", {
      player: user.username,  // ⬅ FIXED HERE
      result: result,
    });
    console.log("Score saved.");
  } catch (error) {
    console.error("Failed to save score:", error.response?.data || error.message);
  }
};

  return (
    <div className="tic-container">
      <h2>❌ Tic Tac Toe ⭕</h2>
      <div className="board">
        {board.map((cell, idx) => (
          <div className="cell" key={idx} onClick={() => handleClick(idx)}>
            {cell}
          </div>
        ))}
      </div>
      {winner && (
        <div className="result">
          {winner === "draw"
            ? "It's a Draw!"
            : winner === "player"
            ? "You Win! 🎉"
            : "Computer Wins! 💻"}
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}
      <button className="back-button" onClick={() => navigate("/gamelist")}>
        ⬅ Back to Games
      </button>
    </div>
  );
};

export default TicTacToe;
