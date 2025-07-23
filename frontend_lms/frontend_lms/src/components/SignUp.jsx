import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    useremail: '',
    usercontact: '',
    userpass: '',
    confirmPass: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (pass) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8}$/;
    return regex.test(pass);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const { username, useremail, usercontact, userpass, confirmPass } = formData;

    if (!validatePassword(userpass)) {
      setError('Password must be exactly 8 characters with uppercase, lowercase, digit, and special symbol.');
      return;
    }

    if (userpass !== confirmPass) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:8000/signup/', {
        username,
        useremail,
        usercontact,
        userpass,
      });

      if (response.status === 201) {
        navigate('/login');
      }
    } catch (err) {
      setError('Signup failed: Email or contact may already exist.');
    }

    setLoading(false);
  };

  return (
    <div className="signup-wrapper">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

        {['username', 'useremail', 'usercontact'].map((field, i) => (
          <div key={i} className="input-group">
            <input
              type={field === 'usercontact' ? 'number' : 'text'}
              required
              value={formData[field]}
              onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
            />
            <label>{field === 'username' ? 'Full Name' : field === 'useremail' ? 'Email' : 'Contact Number'}</label>
          </div>
        ))}

        <div className="input-group">
          <input
            type="password"
            required
            value={formData.userpass}
            onChange={(e) => setFormData({ ...formData, userpass: e.target.value })}
          />
          <label>Password</label>
        </div>

        <div className="input-group">
          <input
            type="password"
            required
            value={formData.confirmPass}
            onChange={(e) => setFormData({ ...formData, confirmPass: e.target.value })}
          />
          <label>Confirm Password</label>
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default Signup;
