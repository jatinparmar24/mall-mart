import React, { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Layout = () => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

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
      <div className="navbar">
        <div className="navbar-container">
          <div className="navbar-left">
            <div className="logo">Mall Mart</div>
          </div>

          <button className="hamburger" onClick={toggleMenu}>
            {menuOpen ? '✖' : '☰'}
          </button>

          <div className={`navbar-center ${menuOpen ? "active" : ""}`}>
            <nav className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/items">Shop</Link>
              <Link to="/movies">Movies</Link>
              <Link to="/gamelist">Games</Link>
            </nav>
          </div>

          <div className={`navbar-right ${menuOpen ? "active" : ""}`}>
            {isLoggedIn ? (
              <div className="nav-auth">
                <Link to="/cart" className="cart-link">
                  🛒
                  {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                </Link>
                <span className="user-name">Hi, {user.username}</span>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
              </div>
            ) : (
              <div className="nav-auth">
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </div>




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
    <h4>Contact</h4>
    <ul>
      <li>
        <a href="mailto:support@mallmart.com" className="glow-link">📧 MallMart@mallmart.com</a>
      </li>
      <li>
        <a href="tel:+911234567890" className="glow-link">📱 +91-1234567890</a>
      </li>
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
  © {new Date().getFullYear()} Mall Mart. All rights reserved.
</div>

</footer>

    </>
  );
};

export default Layout;
