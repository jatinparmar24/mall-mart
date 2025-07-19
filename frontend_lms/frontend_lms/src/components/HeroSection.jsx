import React from "react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="hero-section">
      {/* Background SVG */}
      <svg
        className="hero-wave"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="#ffffff0a"
          d="M0,64L80,90.7C160,117,320,171,480,160C640,149,800,75,960,85.3C1120,96,1280,192,1360,240L1440,288V0H0Z"
        ></path>
      </svg>

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>
          Unlock Your <span className="highlight">Potential</span>
        </h1>
        <p className="hero-subtext">
          Discover top-rated courses, expert instructors, and powerful tools to help you grow — all in one LMS platform.
        </p>

        <div className="hero-cta-buttons">
          <motion.button whileHover={{ scale: 1.05 }} className="hero-btn primary">
            Explore Courses
          </motion.button>
          <motion.button whileHover={{ scale: 1.05 }} className="hero-btn secondary">
            Become an Instructor
          </motion.button>
        </div>

        <motion.div
          className="hero-features"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: { staggerChildren: 0.2 }
            }
          }}
        >
          {[
            {
              icon: "📚",
              title: "Wide Course Library",
              desc: "Thousands of curated courses from top universities and professionals."
            },
            {
              icon: "🧠",
              title: "AI-Powered Learning",
              desc: "Personalized recommendations and smart progress tracking."
            },
            {
              icon: "💼",
              title: "Career-Oriented",
              desc: "Certifications, job-ready skills & real-world projects."
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              className="feature-card"
              whileHover={{ y: -6 }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <h3>{feature.icon} {feature.title}</h3>
              <p>{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
