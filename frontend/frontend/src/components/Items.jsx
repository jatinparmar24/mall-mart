import React from "react";
import { useNavigate } from "react-router-dom";

const Items = () => {
  const navigate = useNavigate();

  const ADMIN_EMAIL = "admin@email.com";
  const ADMIN_PASSWORD = "admin";

  const categories = [
    { name: "Electronics", desc: "Smartphones, Laptops, and more", offer: "Up to 40% Off", img: "https://via.placeholder.com/300x200?text=Electronics" },
    { name: "Clothes", desc: "Fashion for all", offer: "Flat 50% Off", img: "https://via.placeholder.com/300x200?text=Clothes" },
    { name: "Accessories", desc: "Bags, watches, jewelry", offer: "Buy 1 Get 1", img: "https://via.placeholder.com/300x200?text=Accessories" },
    { name: "Fruits", desc: "Fresh and organic", offer: "Fresh Picks", img: "https://via.placeholder.com/300x200?text=Fruits" },
    { name: "Hardware", desc: "Tools and more", offer: "Up to 25% Off", img: "https://via.placeholder.com/300x200?text=Hardware" },
    { name: "Shoes", desc: "Comfort & Style", offer: "Mega Sale", img: "https://via.placeholder.com/300x200?text=Shoes" },
    { name: "Cosmetics", desc: "Top brands for glow", offer: "Beauty Bonanza", img: "https://via.placeholder.com/300x200?text=Cosmetics" },
    { name: "Books", desc: "Best reads", offer: "Flat 30% Off", img: "https://via.placeholder.com/300x200?text=Books" },
    { name: "Toys", desc: "Fun for all ages", offer: "Toy Carnival", img: "https://via.placeholder.com/300x200?text=Toys" },
    { name: "Stationery", desc: "School & Office", offer: "Up to 50% Off", img: "https://via.placeholder.com/300x200?text=Stationery" }
  ];

  const handleShop = (category) => {
    navigate(`/items/${category.toLowerCase()}`);
  };

  const goToAdminDashboard = () => {
    const user = JSON.parse(localStorage.getItem("mallmartUser")); // Assuming this is how you store user info

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
          <div className="category-card" key={idx}>
            <img
              src={item.img}
              alt={`Category ${item.name}`}
              onError={(e) => e.target.src = "https://via.placeholder.com/300x200?text=No+Image"}
            />
            <h2>{item.name}</h2>
            <p>{item.desc}</p>
            <span className="offer">{item.offer}</span>
            <button onClick={() => handleShop(item.name)}>Shop Now</button>
            

          </div>
        ))}
      </div>
    </div>
  );
};

export default Items;
