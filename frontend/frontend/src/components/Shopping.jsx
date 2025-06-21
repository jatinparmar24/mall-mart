import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Shopping = () => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate("/items");
  };

  return (
    <section className="shopping-section">
      <div className="shopping-bg-overlay">
        <div className="shopping-content">
          <motion.h1
            className="shopping-title"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, amount: 0.4 }}
          >
            Shop the Mall Mart Way
          </motion.h1>

          <motion.p
            className="shopping-description"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            viewport={{ once: true, amount: 0.4 }}
          >
            Browse through electronics, fashion, groceries, cosmetics & more — curated just for you.
          </motion.p>

          <motion.div
            className="shopping-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ staggerChildren: 0.3 }}
          >
            {[ 
              {
                img: "https://cdn-icons-png.flaticon.com/512/1048/1048953.png",
                title: "Latest Gadgets",
                desc: "Top-notch electronics to match your modern lifestyle."
              },
              {
                img: "https://cdn-icons-png.flaticon.com/512/892/892458.png",
                title: "Stylish Clothing",
                desc: "Trendy outfits for every season and occasion."
              },
              {
                img: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png",
                title: "Accessories",
                desc: "Watches, bags, jewelry and more to enhance your look."
              },
              {
                img: "https://cdn-icons-png.flaticon.com/512/1046/1046857.png",
                title: "Fresh Groceries",
                desc: "Everything from fruits to daily essentials — delivered."
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="shopping-card"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <img src={item.img} alt={item.title} />
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="shopping-bottom-text"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <p>
              <strong>Click below</strong> to explore all 10+ categories and shop your favorites.
            </p>
          </motion.div>

          <motion.button
            className="explore-btn"
            onClick={handleExplore}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Start Exploring Categories →
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Shopping;