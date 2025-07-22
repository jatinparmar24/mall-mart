import { motion } from "framer-motion";

const SectionThree = () => {
  return (
    <section className="section-three">
      {/* Background SVG */}
      <svg className="section-three-bg" viewBox="0 0 100 100" preserveAspectRatio="none">
        <circle cx="20" cy="30" r="40" fill="rgba(255,255,255,0.05)" />
        <circle cx="80" cy="70" r="60" fill="rgba(255,255,255,0.04)" />
      </svg>

      {/* Title */}
      <motion.h2
        className="section-three-title"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        What Learners Say
      </motion.h2>

      {/* Subheading */}
      <motion.p
        className="section-three-sub"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Hear from those who’ve grown with us and see why our courses stand out.
      </motion.p>

      {/* Testimonial Cards */}
      <div className="testimonials-wrapper">
        <motion.div className="testimonial-card" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
          <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="teacher1" />
          <h3>Priya Sharma</h3>
          <p>
            “The content is practical and easy to follow. I've already implemented what I learned in my projects.”
          </p>
        </motion.div>

        <motion.div className="testimonial-card" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
          <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="teacher2" />
          <h3>Rahul Verma</h3>
          <p>
            “Excellent instructors and well-designed courses. The platform makes learning truly engaging.”
          </p>
        </motion.div>

        <motion.div className="testimonial-card" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
          <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="teacher3" />
          <h3>Neha Joshi</h3>
          <p>
            “Thanks to the certification path, I was able to boost my resume and land a great internship.”
          </p>
        </motion.div>
      </div>

      {/* Closing Line */}
      <motion.p
        className="section-three-end"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        Start your journey with us today. Learn, grow, and achieve your goals—one step at a time.
      </motion.p>
    </section>
  );
};

export default SectionThree;
