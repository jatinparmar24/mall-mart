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

    try {
      const res = await axios.post('http://localhost:8000/login/', {
        useremail,
        userpass
      });

      if (res.status === 200) {
        localStorage.setItem('loggedInUser', useremail);
        setMessage('Login successful');
        navigate('/');
      }
    } catch (err) {
      setMessage('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={useremail}
          onChange={(e) => setUseremail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={userpass}
          onChange={(e) => setUserpass(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default Login;
