import React from "react";
import { useNavigate } from "react-router-dom";


const Shopping = () => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate("/items");
  };

  return (
    <section className="shopping-section">
      <div className="shopping-bg-overlay">
        <div className="shopping-content">
          <h1 className="shopping-title">Welcome to Mall Mart</h1>
          <p className="shopping-description">
            Shop across a wide range of categories like electronics, fashion, groceries, cosmetics & more.
          </p>

          <div className="shopping-grid">
            <div className="shopping-card">
              <img src="https://cdn-icons-png.flaticon.com/512/1048/1048953.png" alt="Gadgets" />
              <h3>Latest Gadgets</h3>
              <p>Top-notch electronics to match your modern lifestyle.</p>
            </div>
            <div className="shopping-card">
              <img src="https://cdn-icons-png.flaticon.com/512/892/892458.png" alt="Fashion" />
              <h3>Stylish Clothing</h3>
              <p>Trendy outfits for every season and occasion.</p>
            </div>
            <div className="shopping-card">
              <img src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png" alt="Accessories" />
              <h3>Accessories</h3>
              <p>Watches, bags, jewelry and more to enhance your look.</p>
            </div>
            <div className="shopping-card">
              <img src="https://cdn-icons-png.flaticon.com/512/1046/1046857.png" alt="Groceries" />
              <h3>Fresh Groceries</h3>
              <p>Everything from fruits to daily essentials — delivered.</p>
            </div>
          </div>

          <div className="shopping-bottom-text">
            <p><strong>Click below</strong> to explore all 10+ categories and shop your favorites.</p>
          </div>

          <button className="explore-btn" onClick={handleExplore}>
            Start Exploring Categories →
          </button>
        </div>
      </div>
    </section>
  );
};

export default Shopping;
