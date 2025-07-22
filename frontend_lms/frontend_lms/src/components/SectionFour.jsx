import React from "react";
import { motion } from "framer-motion";


const SectionFour = () => {
  return (
    <section id="section-four" className="section-four">
      <svg className="section-four-bg" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M0,100 C30,0 70,0 100,100 Z" fill="rgba(255, 255, 255, 0.03)" />
      </svg>

      <motion.div
        className="section-four-header"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-four-title">Explore Learner Success</h2>
        <p className="section-four-desc">
          Dive into student reviews, course achievements, and our proud journey empowering learners across the globe.
        </p>
      </motion.div>

      <motion.div
        className="section-four-stats"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <div className="stat-box">
          <h3>15K+</h3>
          <p>Active Learners</p>
        </div>
        <div className="stat-box">
          <h3>200+</h3>
          <p>Expert-Led Courses</p>
        </div>
        <div className="stat-box">
          <h3>4.9/5</h3>
          <p>Average Rating</p>
        </div>
      </motion.div>

      <motion.div
        className="section-four-testimonials"
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <div className="testimonial-card">
          <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Student A" />
          <h4>Priya Verma</h4>
          <p>"The mentors were amazing, and the course content changed my career!"</p>
        </div>
        <div className="testimonial-card">
          <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Student B" />
          <h4>Rohit Singh</h4>
          <p>"I landed a job after completing their Data Science bootcamp. Highly recommended."</p>
        </div>
        <div className="testimonial-card">
          <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="Student C" />
          <h4>Arjun Mehta</h4>
          <p>"Their practical approach and real-world examples helped me so much!"</p>
        </div>
      </motion.div>

      <motion.div
        className="section-four-courses"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
      >
        <h3>Popular Courses</h3>
        <ul>
          <li>🔹 Full Stack Web Development</li>
          <li>🔹 Data Science with Python</li>
          <li>🔹 UI/UX Design Masterclass</li>
          <li>🔹 AI & Machine Learning Essentials</li>
        </ul>
      </motion.div>
    </section>
  );
};

export default SectionFour;
