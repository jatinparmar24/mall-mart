import React, { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Layout = () => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  const user = JSON.parse(localStorage.getItem("mallmartUser"));
  const isLoggedIn = !!user;

  const handleLogout = () => {
    localStorage.removeItem("mallmartUser");
    navigate("/login");
  };

  useEffect(() => {
  const fetchCartCount = async () => {
    if (user?.username) {
      try {
        const res = await axios.get(`http://localhost:8000/api/cart/?user=${user.username}`);
        setCartCount(res.data.length);
      } catch (err) {
        console.error("Failed to fetch cart count:", err);
      }
    }
  };
  fetchCartCount();
}, [user]);


  return (
    <>
      <header className="navbar">
        <div className="logo">Mall Mart</div>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/items">Shop</Link>
          <Link to="/movies">Movies</Link>
          <Link to="/gamelist">Games</Link>

          {isLoggedIn ? (
            <>
              <Link to="/cart">
                Cart 🛒
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </Link>
              <span className="user-name">Hi, {user.username}</span>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </>
          )}
        </nav>
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="footer-column">
          <h4>Mall Mart</h4>
          <ul>
            <li>About Us</li>
            <li>Careers</li>
            <li>Press</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Customer Service</h4>
          <ul>
            <li>Contact Us</li>
            <li>Returns</li>
            <li>FAQs</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Departments</h4>
          <ul>
            <li>Shopping</li>
            <li>Movies</li>
            <li>Games</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Follow Us</h4>
          <ul>
            <li>Instagram</li>
            <li>Facebook</li>
            <li>Twitter</li>
          </ul>
        </div>

        <div className="footer-bottom">
          © 2025 Mall Mart. All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default Layout;
