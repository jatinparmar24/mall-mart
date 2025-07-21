import React from "react";
import { motion } from "framer-motion";
import { FaBook, FaChalkboardTeacher, FaCertificate } from "react-icons/fa";


const Features = () => {
  const featureVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.3,
        duration: 0.6,
        type: "spring",
        stiffness: 80,
      },
    }),
  };

  return (
    <section id="features-section">
      <motion.h2
        className="features-heading"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Features We Provide
      </motion.h2>

      <motion.p
        className="features-subtext"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        viewport={{ once: true }}
      >
        Our platform offers essential tools to boost your learning experience:
        from expert-led classes to certifications that validate your skills.
      </motion.p>

      <div className="features-grid">
        {[
          {
            icon: <FaBook size={40} />,
            title: "Learn Flexibly",
            desc: "Access interactive modules anytime, anywhere.",
          },
          {
            icon: <FaChalkboardTeacher size={40} />,
            title: "Expert Guidance",
            desc: "Courses led by top instructors in the field.",
          },
          {
            icon: <FaCertificate size={40} />,
            title: "Get Certified",
            desc: "Earn accredited certificates after completion.",
          },
        ].map((feature, i) => (
          <motion.div
            className="feature-card"
            key={i}
            custom={i}
            initial="hidden"
            whileInView="visible"
            variants={featureVariants}
            viewport={{ once: true }}
          >
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="features-bottom-text"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        viewport={{ once: true }}
      >
        <p>
          Join thousands of learners who are mastering new skills and boosting
          their careers with us.
        </p>
      </motion.div>

      {/* Background circle */}
      <div className="circle-decoration"></div>
    </section>
  );
};

export default Features;
