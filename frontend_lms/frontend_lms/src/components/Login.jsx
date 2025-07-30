import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [useremail, setUseremail] = useState('');
  const [userpass, setUserpass] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Handle admin login directly on frontend
    if (useremail === 'admin@email.com' && userpass === 'Admin@12') {
      localStorage.setItem('loggedInUser', useremail);
      setMessage('');
      navigate('/adminpanel');
      return;
    }

    // Normal user login handled by backend
    try {
      const res = await axios.post('http://localhost:8000/login/', {
        useremail,
        userpass
      });

      if (res.status === 200) {
        localStorage.setItem('loggedInUser', useremail);
        setMessage('');
        navigate('/');
      }
    } catch (err) {
      setMessage('Invalid credentials');
    }
  };

  return (
    <div className="login-wrapper">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>

        {message && <p className="error">{message}</p>}

        <div className="input-group">
          <input
            type="email"
            value={useremail}
            onChange={(e) => setUseremail(e.target.value)}
            required
            placeholder=" "
          />
          <label>Email</label>
        </div>

        <div className="input-group">
          <input
            type="password"
            value={userpass}
            onChange={(e) => setUserpass(e.target.value)}
            required
            placeholder=" "
          />
          <label>Password</label>
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
