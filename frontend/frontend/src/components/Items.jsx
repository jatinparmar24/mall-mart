import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Items = () => {
  const navigate = useNavigate();

  const ADMIN_EMAIL = "admin@email.com";

  const categories = [
    { name: "Electronics", desc: "Smartphones, Laptops, and more", offer: "Up to 40% Off", img: "/electronic_item.jpg" },
    { name: "Clothes", desc: "Fashion for all", offer: "Flat 50% Off", img: "/clothes_item.jpg" },
    { name: "Accessories", desc: "Bags, watches, jewelry", offer: "Buy 1 Get 1", img: "/acc_items.jpeg" },
    { name: "Fruits", desc: "Fresh and organic", offer: "Fresh Picks", img: "/fruits_item.jpg" },
    { name: "Hardware", desc: "Tools and more", offer: "Up to 25% Off", img: "/hardware_item.jpg" },
    { name: "Shoes", desc: "Comfort & Style", offer: "Mega Sale", img: "/shoes_item.jpg" },
    { name: "Cosmetics", desc: "Top brands for glow", offer: "Beauty Bonanza", img: "/cosmetics_item.jpg" },
    { name: "Books", desc: "Best reads", offer: "Flat 30% Off", img: "/books_item.jpg" },
    { name: "Toys", desc: "Fun for all ages", offer: "Toy Carnival", img: "/toys_item.jpg" },
    { name: "Stationery", desc: "School & Office", offer: "Up to 50% Off", img: "/stationary_item.jpg" }
  ];

  const handleShop = (category) => {
    navigate(`/items/${category.toLowerCase()}`);
  };

  const goToAdminDashboard = () => {
    const user = JSON.parse(localStorage.getItem("mallmartUser"));
    if (user && user.email === ADMIN_EMAIL) {
      navigate("/Admindashboard");
    } else {
      alert("Access denied. Please login as admin.");
      navigate("/login");
    }
  };

  return (
    <div className="items-page">
      <div className="items-header">
        <h1>🛍️ Shop by Category</h1>
        <button className="admin-btn" onClick={goToAdminDashboard}>
          Admin Dashboard
        </button>
      </div>

      <div className="category-grid">
        {categories.map((item, idx) => (
          <motion.div
            className="category-card"
            key={idx}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <img
              src={item.img}
              alt={item.name}
              onError={(e) => (e.target.src = "https://via.placeholder.com/300x200?text=No+Image")}
            />
            <h2>{item.name}</h2>
            <p>{item.desc}</p>
            <span className="offer">{item.offer}</span>
            <button onClick={() => handleShop(item.name)}>Shop Now</button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Items;
