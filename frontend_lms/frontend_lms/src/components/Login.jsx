import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    useremail: '',
    userpass: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:8000/login/', {
        useremail: formData.useremail,
        userpass: formData.userpass

      });

      if (response.status === 200) {
        localStorage.setItem('loggedInUser', formData.useremail);
        navigate('/');
      }
    } catch (err) {
      setError('Login failed: Invalid email or password.');
    }

    setLoading(false);
  };

  return (
    <div className="login-wrapper">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <div className="input-group">
          <input
            type="email"
            name="useremail"
            required
            value={formData.useremail}
            onChange={handleChange}
          />
          <label>Email</label>
        </div>

        <div className="input-group">
          <input
            type="password"
            name="userpass"
            required
            value={formData.userpass}
            onChange={handleChange}
          />
          <label>Password</label>
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Logging In...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
