import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const QuizCompetition = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("mallmartUser"));

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [quizOver, setQuizOver] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      alert("Please log in to play!");
      navigate("/login");
    } else {
      fetchQuestions();
    }
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/get-quiz-questions/");
      setQuestions(res.data);
    } catch (error) {
      console.error("Failed to fetch quiz questions:", error);
      alert("Error loading questions. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!selected) {
      alert("Please select an answer!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/api/check-quiz-answer/", {
        player: user.username,
        question_id: questions[current].id,
        selected_option: selected,
      });

      if (res.data.correct) {
        setScore((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error checking answer:", error);
      alert("Failed to check answer. Please try again.");
    }

    if (current === questions.length - 1) {
      setQuizOver(true);
    } else {
      setCurrent((prev) => prev + 1);
      setSelected(null);
    }
  };

  const restartQuiz = () => {
    setScore(0);
    setCurrent(0);
    setSelected(null);
    setQuizOver(false);
    setLoading(true);
    fetchQuestions();
  };

  return (
    <div className="quiz-section">
      <h2>🧠 Quiz Competition</h2>

      {loading ? (
        <p>Loading questions...</p>
      ) : quizOver ? (
        <div className="result-box">
          <p className="score">
            ✅ Your Score: {score} / {questions.length}
          </p>
          <button onClick={restartQuiz}>🔁 Play Again</button>
          <button className="back-button" onClick={() => navigate("/gamelist")}>
            ⬅ Back to Games
          </button>
        </div>
      ) : (
        <>
          <p className="question-count">
            Question {current + 1} of {questions.length}
          </p>
          <div className="question-box">
            <h3>{questions[current].question}</h3>
            <div className="options">
              {questions[current].options.map((opt, i) => (
                <label key={i} className={`option ${selected === opt ? "selected" : ""}`}>
                  <input
                    type="radio"
                    name="option"
                    value={opt}
                    checked={selected === opt}
                    onChange={() => setSelected(opt)}
                  />
                  {opt}
                </label>
              ))}
            </div>
            <button className="submit-button" onClick={handleSubmit}>
              ✅ Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default QuizCompetition;
