// src/components/BuyNow.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BuyNow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { item } = location.state || {};

  const user = JSON.parse(localStorage.getItem("user"));

  if (!item || !user) {
    return <p>Invalid access. Please go back and try again.</p>;
  }

  // Ensure price is a valid number
  const price = typeof item.price === "string" ? parseFloat(item.price) : item.price || 0;
  const discount = 0.1;
  const finalPrice = price - price * discount;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("🎉 Purchase successful!");
    navigate("/items");
  };

  return (
    <div className="buy-now-container">
      <div className="buy-now-card">
        <img src={item.img} alt={item.name} />
        <h2>🛒 Buy: {item.name}</h2>
        <p><strong>User:</strong> {user.name || user.username} ({user.email})</p>
        <p><strong>Original Price:</strong> ₹{price.toFixed(2)}</p>
        <p><strong>Discount:</strong> 10%</p>
        <p><strong>Final Price:</strong> <span className="final-price">₹{finalPrice.toFixed(2)}</span></p>

        <form onSubmit={handleSubmit} className="buy-now-form">
          <input type="text" value={user.name || user.username} readOnly />
          <input type="email" value={user.email} readOnly />
          <input type="text" value={item.name} readOnly />
          <input type="text" value={`₹${finalPrice.toFixed(2)}`} readOnly />
          <button type="submit">Confirm Purchase</button>
        </form>
      </div>
    </div>
  );
};

export default BuyNow;
