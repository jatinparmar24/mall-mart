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

  // Razorpay script loader
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Failed to load Razorpay. Please check your connection.");
      return;
    }

    const userData = JSON.parse(localStorage.getItem("mallmartUser"));
    if (!userData || !userData.username) {
      alert("You must be logged in to make a purchase.");
      return;
    }

    const amountInPaise = Number(item.price) * 100;

    const options = {
      key: "rzp_test_pr99iascS1WRtU", // Replace with your actual Razorpay key
      amount: amountInPaise,
      currency: "INR",
      name: "Mall Mart",
      description: `Purchase of ${item.name}`,
      image: "https://yourlogo.url/logo.png", // optional
      handler: async function (response) {
        try {
          // Save to backend only after successful payment
          await axios.post("http://localhost:8000/api/purchases/", {
            user: userData.username,
            item: item.name,
            price: Number(item.price),
          });

          alert("✅ Payment Successful!");
          navigate("/items");
        } catch (err) {
          console.error("Error saving purchase:", err.response?.data || err.message);
          alert("Payment succeeded but saving failed.");
        }
      },
      prefill: {
        name: userData.username,
        email: userData.email || "test@example.com",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
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
      <button onClick={handlePayment}>💳 Pay with Razorpay</button>
    </div>
  );
};

export default BuyNow;
