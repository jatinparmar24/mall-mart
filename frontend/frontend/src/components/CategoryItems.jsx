// src/components/CategoryItems.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const categoryData = {
  electronics: [
    { name: "Smartphone", price: "₹29,999", image: "https://via.placeholder.com/300x200?text=Smartphone" },
    { name: "Laptop", price: "₹59,999", image: "https://via.placeholder.com/300x200?text=Laptop" },
  ],
  clothes: [
    { name: "T-Shirt", price: "₹799", image: "https://via.placeholder.com/300x200?text=T-Shirt" },
    { name: "Jeans", price: "₹1,499", image: "https://via.placeholder.com/300x200?text=Jeans" },
  ],
  accessories: [
    { name: "Watch", price: "₹2,999", image: "https://via.placeholder.com/300x200?text=Watch" },
    { name: "Handbag", price: "₹3,499", image: "https://via.placeholder.com/300x200?text=Handbag" },
  ],
  fruits: [
    { name: "Apples", price: "₹199", image: "https://via.placeholder.com/300x200?text=Apples" },
    { name: "Bananas", price: "₹49", image: "https://via.placeholder.com/300x200?text=Bananas" },
  ],
  hardware: [
    { name: "Drill Machine", price: "₹2,499", image: "https://via.placeholder.com/300x200?text=Drill" },
    { name: "Hammer", price: "₹299", image: "https://via.placeholder.com/300x200?text=Hammer" },
  ],
  shoes: [
    { name: "Running Shoes", price: "₹1,999", image: "https://via.placeholder.com/300x200?text=Shoes" },
    { name: "Sandals", price: "₹999", image: "https://via.placeholder.com/300x200?text=Sandals" },
  ],
  cosmetics: [
    { name: "Lipstick", price: "₹599", image: "https://via.placeholder.com/300x200?text=Lipstick" },
    { name: "Foundation", price: "₹899", image: "https://via.placeholder.com/300x200?text=Foundation" },
  ],
  books: [
    { name: "Novel", price: "₹399", image: "https://via.placeholder.com/300x200?text=Novel" },
    { name: "Science Book", price: "₹499", image: "https://via.placeholder.com/300x200?text=Science+Book" },
  ],
  toys: [
    { name: "Remote Car", price: "₹1,199", image: "https://via.placeholder.com/300x200?text=Car" },
    { name: "Action Figure", price: "₹799", image: "https://via.placeholder.com/300x200?text=Figure" },
  ],
  stationery: [
    { name: "Notebook Pack", price: "₹199", image: "https://via.placeholder.com/300x200?text=Notebooks" },
    { name: "Pen Set", price: "₹99", image: "https://via.placeholder.com/300x200?text=Pens" },
  ]
};

const CategoryItems = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const items = categoryData[category.toLowerCase()];

  if (!items) return <h2 style={{ textAlign: "center" }}>Category not found 😞</h2>;

  const handleBuyNow = (item) => {
    const numericPrice = parseFloat(item.price.replace("₹", "").replace(",", ""));
    navigate("/buy", {
      state: {
        item: {
          name: item.name,
          price: numericPrice,
          img: item.image,
        }
      }
    });
  };

  return (
    <div className="category-items">
      <h1>{category.toUpperCase()} 🛍️</h1>
      <div className="items-grid">
        {items.map((item, index) => (
          <div className="item-card" key={index}>
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>Price: {item.price}</p>
            <button onClick={() => handleBuyNow(item)}>Buy Now</button>
          </div>
        ))}
      </div>
      <button className="back-btn" onClick={() => navigate("/items")}>⬅ Back to Categories</button>
    </div>
  );
};

export default CategoryItems;
