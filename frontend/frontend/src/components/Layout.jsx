import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <header className="navbar">
        <div className="logo">Mall Mart</div>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/movies">Movies</Link>
          <Link to="/games">Games</Link>
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
