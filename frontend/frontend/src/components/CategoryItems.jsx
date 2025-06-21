import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const categoryData = {
  electronics: [
    { name: "Smartphone", price: "₹29,999", image: "/phone.jpg" },
    { name: "Laptop", price: "₹59,999", image: "/laptop_cv.jpg" },
  ],
  clothes: [
    { name: "T-Shirt", price: "₹799", image: "/phone.jpg" },
    { name: "Jeans", price: "₹1,499", image: "/jeans.jpg" },
  ],
  accessories: [
    { name: "Watch", price: "₹2,999", image: "/phone.jpg" },
    { name: "Handbag", price: "₹3,499", image: "/phone.jpg" },
  ],
  fruits: [
    { name: "Apples", price: "₹199", image: "/phone.jpg" },
    { name: "Bananas", price: "₹49", image: "/phone.jpg" },
  ],
  hardware: [
    { name: "Drill Machine", price: "₹2,499", image: "/phone.jpg" },
    { name: "Hammer", price: "₹299", image: "/phone.jpg" },
  ],
  shoes: [
    { name: "Running Shoes", price: "₹1,999", image: "/phone.jpg" },
    { name: "Sandals", price: "₹999", image: "/phone.jpg" },
  ],
  cosmetics: [
    { name: "Lipstick", price: "₹599", image: "/phone.jpg" },
    { name: "Foundation", price: "₹899", image: "/phone.jpg" },
  ],
  books: [
    { name: "Novel", price: "₹399", image: "/phone.jpg" },
    { name: "Science Book", price: "₹499", image: "/phone.jpg" },
  ],
  toys: [
    { name: "Remote Car", price: "₹1,199", image: "/phone.jpg" },
    { name: "Action Figure", price: "₹799", image: "/phone.jpg" },
  ],
  stationery: [
    { name: "Notebook Pack", price: "₹199", image: "/phone.jpg" },
    { name: "Pen Set", price: "₹99", image: "/phone.jpg" },
  ]
};

const CategoryItems = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const items = categoryData[category.toLowerCase()];

  if (!items) {
    return (
      <div className="not-found">
        <h2>❌ Category "{category}" not found</h2>
        <button onClick={() => navigate("/items")}>⬅ Go Back</button>
      </div>
    );
  }

  const handleBuyNow = (item) => {
    const numericPrice = parseFloat(item.price.replace(/[₹,]/g, ""));
    if (isNaN(numericPrice)) return alert("Invalid price format.");

    navigate("/buy", {
      state: {
        item: {
          name: item.name,
          price: numericPrice,
          img: item.image || "https://via.placeholder.com/300x200?text=No+Image",
        },
      },
    });
  };

  const handleAddToCart = async (item) => {
    const userData = JSON.parse(localStorage.getItem("mallmartUser"));
    if (!userData || !userData.username) {
      return alert("Please login to add items to cart.");
    }

    const numericPrice = parseFloat(item.price.replace(/[₹,]/g, ""));
    if (isNaN(numericPrice)) return alert("Invalid price format.");

    try {
      await axios.post("http://localhost:8000/api/cart/", {
        user: userData.username,
        item: item.name,
        price: numericPrice,
        image: item.image,
      });
      alert("Item added to cart ✅");
    } catch (err) {
      alert("Failed to add to cart ❌");
      console.error(err);
    }
  };

  return (
    <motion.div
      className="category-items"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {category.toUpperCase()} 🛍️
      </motion.h1>

      <div className="items-grid">
        {items.map((item, index) => (
          <motion.div
            className="item-card"
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <img
              src={item.image || "https://via.placeholder.com/300x200?text=No+Image"}
              alt={item.name}
            />
            <h3>{item.name}</h3>
            <p>Price: {item.price}</p>
            <button onClick={() => handleBuyNow(item)}>Buy Now</button>
            <button onClick={() => handleAddToCart(item)}>Add to Cart 🛒</button>
          </motion.div>
        ))}
      </div>

      <motion.button
        className="back-btn"
        onClick={() => navigate("/items")}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        ⬅ Back to Categories
      </motion.button>
    </motion.div>
  );
};

export default CategoryItems;



