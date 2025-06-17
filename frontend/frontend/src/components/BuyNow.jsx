import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const BuyNow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state?.item;

  useEffect(() => {
    if (!item) {
      alert("No item selected. Redirecting to items...");
      navigate("/items");
    }
  }, [item, navigate]);

  const handleConfirmPurchase = async () => {
    const user = localStorage.getItem("username"); // Replace with auth context if available

    if (!user) {
      alert("You must be logged in to make a purchase.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/purchases/", {
        user: user,
        item: item.name,
        price: item.price
      });


      alert("Purchase successful!");
      navigate("/items");
    } catch (error) {
      console.error("Purchase Error:", error);
      alert("Purchase failed. Please try again.");
    }
  };

  if (!item) return null;

  return (
    <div className="buy-now-page">
      <h1>🧾 Confirm Your Purchase</h1>
      <img
        src={item.img || "https://via.placeholder.com/300x200?text=No+Image"}
        alt={item.name}
        style={{ maxWidth: "300px", borderRadius: "8px", margin: "10px 0" }}
      />
      <h2>{item.name}</h2>
      <p><strong>Price:</strong> ₹{item.price}</p>
      <button onClick={handleConfirmPurchase}>Confirm Purchase</button>
    </div>
  );
};

export default BuyNow;
