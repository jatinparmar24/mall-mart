import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem('loggedInUser');
    if (email) setUserEmail(email);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setUserEmail('');
    navigate('/');
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
      {/* === NAVBAR === */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="navbar"
      >
        <div className="navbar-container">
          {/* Left - Logo */}
          <div className="navbar-left">
            <Link to="/" className="navbar-logo">EduMaster</Link>
          </div>

          {/* Hamburger Toggle */}
          <button
            className="navbar-toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation"
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>

          {/* Center - Navigation Links */}
          <div className={`navbar-center ${isOpen ? 'open' : ''}`}>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/courses">Courses</Link>
            <Link to="/contact">Contact</Link>
          </div>

          {/* Right - Auth Section */}
          <div className="navbar-right">
            {!userEmail ? (
              <>
                <Link to="/signup" className="auth-btn">Sign Up</Link>
                <Link to="/login" className="auth-btn">Login</Link>
              </>
            ) : (
              <div className="user-dropdown">
                <button className="auth-btn user-btn" onClick={toggleDropdown}>
                  {userEmail.split('@')[0]} ▼
                </button>
                {showDropdown && (
                  <div className="dropdown-menu">
                    <p><strong>User:</strong> {userEmail.split('@')[0]}</p>
                    <p><strong>Email:</strong> {userEmail}</p>
                    <button onClick={handleLogout} className="dropdown-logout">Logout</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.nav>

      {/* === OUTLET === */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* === FOOTER === */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <h2>EduMaster</h2>
            <p>Empowering learning, one click at a time.</p>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/courses">Courses</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Contact</h4>
            <p>Email: support@edumaster.com</p>
            <p>Phone: +91 986523214</p>
            <p>Address: New Delhi, India</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} EduMaster. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
