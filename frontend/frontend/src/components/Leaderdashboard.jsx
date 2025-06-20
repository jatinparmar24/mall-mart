import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ITEMS_PER_PAGE = 7;

const LeaderDashboard = () => {
  const [data, setData] = useState({ dice: [], tictactoe: [], guess: [] });
  const [pages, setPages] = useState({ dice: 1, tictactoe: 1, guess: 1 });
  const [userProfile, setUserProfile] = useState({ total_wins: 0, spin_unlocked: false });
  const [spinResult, setSpinResult] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);

  const rewards = ["Bonus 100 Points!", "Try Again", "Mystery Gift 🎁", "1 Free Win!", "No Prize 😅"];

  useEffect(() => {
    axios.get('http://localhost:8000/api/leaderboard/')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("mallmartUser"));
    if (user) {
      axios.get(`http://localhost:8000/api/user-profile/${user.username}/`)
        .then(res => setUserProfile(res.data))
        .catch(err => console.error(err));
    }
  }, []);

  const handleSpin = () => {
    const user = JSON.parse(localStorage.getItem("mallmartUser"));
    setIsSpinning(true);
    setSpinResult("");

    const random = Math.floor(Math.random() * rewards.length);
    const prize = rewards[random];

    setTimeout(() => {
      setSpinResult(prize);
      setIsSpinning(false);

      axios.post(`http://localhost:8000/api/lock-spin/${user.username}/`)
        .then(() => {
          return axios.get(`http://localhost:8000/api/user-profile/${user.username}/`);
        })
        .then(res => setUserProfile(res.data))
        .catch(err => console.error(err));
    }, 2000); // 2 seconds matches the animation duration
  };

  const paginate = (array, page) => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return array.slice(start, start + ITEMS_PER_PAGE);
  };

  const renderRows = (entries, type) =>
    paginate(entries, pages[type]).map((entry, i) => {
      const globalIndex = (pages[type] - 1) * ITEMS_PER_PAGE + i + 1;
      const highlightClass = globalIndex === 1 ? 'gold' : globalIndex === 2 ? 'silver' : globalIndex === 3 ? 'bronze' : '';
      return (
        <tr key={i} className={`leader-dashboard-${highlightClass}`}>
          <td>{globalIndex}</td>
          {type === 'dice' && (
            <>
              <td>{entry.player1}</td><td>{entry.score1}</td>
              <td>{entry.player2}</td><td>{entry.score2}</td>
              <td>{entry.winner}</td><td>{new Date(entry.date).toLocaleDateString()}</td>
            </>
          )}
          {type === 'tictactoe' && (
            <>
              <td>{entry.player}</td><td>{entry.result}</td><td>{new Date(entry.date).toLocaleDateString()}</td>
            </>
          )}
          {type === 'guess' && (
            <>
              <td>{entry.player}</td><td>{entry.result}</td><td>{new Date(entry.date).toLocaleDateString()}</td>
            </>
          )}
        </tr>
      );
    });

  const totalPages = (type) => {
    const list = data?.[type] || [];
    return Math.ceil(list.length / ITEMS_PER_PAGE);
  };

  const renderPagination = (type) => (
    <div className="leader-dashboard-pagination">
      {Array.from({ length: totalPages(type) }, (_, i) => (
        <button
          key={i}
          className={pages[type] === i + 1 ? 'leader-dashboard-active' : ''}
          onClick={() => setPages(prev => ({ ...prev, [type]: i + 1 }))}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );

  return (
    <div className="leader-dashboard">
      <h1>🏆 Leader Dashboard</h1>

      <section>
        <h2>🎲 Dice Duel</h2>
        <table className="leader-dashboard-table">
          <thead>
            <tr>
              <th>#</th><th>Player 1</th><th>Score</th><th>Player 2</th><th>Score</th><th>Winner</th><th>Date</th>
            </tr>
          </thead>
          <tbody>{renderRows(data.dice, 'dice')}</tbody>
        </table>
        {renderPagination('dice')}
      </section>

      <section>
        <h2>⭕ Tic Tac Toe</h2>
        <table className="leader-dashboard-table">
          <thead><tr><th>#</th><th>Player</th><th>Result</th><th>Date</th></tr></thead>
          <tbody>{renderRows(data.tictactoe, 'tictactoe')}</tbody>
        </table>
        {renderPagination('tictactoe')}
      </section>

      <section>
        <h2>🔢 Guess the Number</h2>
        <table className="leader-dashboard-table">
          <thead><tr><th>#</th><th>Player</th><th>Result</th><th>Date</th></tr></thead>
          <tbody>{renderRows(data.guess, 'guess')}</tbody>
        </table>
        {renderPagination('guess')}
      </section>

      {userProfile.total_wins >= 5 && userProfile.spin_unlocked && (
        <div className="leader-dashboard-wheel">
          <h3>🎉 You've unlocked the Wheel of Fortune!</h3>
          <div className={`leader-dashboard-wheel-graphic ${isSpinning ? 'wheel-spinning' : ''}`}>🎡</div>
          <button onClick={handleSpin} disabled={isSpinning}>🎯 Spin Now</button>
          {spinResult && <p className="leader-dashboard-spin-result">You won: {spinResult}</p>}
        </div>
      )}
    </div>
  );
};

export default LeaderDashboard;
