import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 4;
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/courses/')
      .then(res => setCourses(res.data))
      .catch(err => console.log(err));
  }, []);

  const filteredCourses = courses
    .filter(course => course.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === 'asc') return a.price - b.price;
      if (sortOrder === 'desc') return b.price - a.price;
      return 0;
    });

  const indexOfLast = currentPage * coursesPerPage;
  const indexOfFirst = indexOfLast - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className="courses-page">
      <svg className="courses-divider-top" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 150">
        <path fill="#2c5364" fillOpacity="1" d="M0,96L40,112C80,128,160,160,240,165.3C320,171,400,149,480,122.7C560,96,640,64,720,74.7C800,85,880,139,960,154.7C1040,171,1120,149,1200,138.7C1280,128,1360,128,1400,128L1440,128L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path>
      </svg>

      <h2 className="courses-heading">🔥 Trending Courses</h2>

      <div className="courses-slider">
        <Slider {...sliderSettings}>
          {courses.map((course, i) => (
            <div key={i} className="courses-slider-card">
              <motion.img
                src={course.thumbnail}
                alt={course.title}
                className="courses-slider-img"
                whileHover={{ scale: 1.02 }}
              />
              <h4 className="courses-slider-title">{course.title}</h4>
            </div>
          ))}
        </Slider>
      </div>

      <div className="courses-controls">
        <input
          type="text"
          placeholder="🔍 Search courses"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select onChange={e => setSortOrder(e.target.value)} value={sortOrder}>
          <option value="">Sort by price</option>
          <option value="asc">Low → High</option>
          <option value="desc">High → Low</option>
        </select>
      </div>

      <div className="courses-grid">
        {currentCourses.map((course, index) => (
          <motion.div
            key={index}
            className="courses-card"
            whileHover={{ scale: 1.03 }}
          >
            <img src={course.thumbnail} alt={course.title} />
            <div className="courses-card-content">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <span>₹{course.price}</span>
              <button
                className="courses-view-btn"
                onClick={() => navigate(`/courses/${course.id}`)}
              >
               View Details
              </button>

            </div>
          </motion.div>
        ))}
      </div>

      <div className="courses-pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={currentPage === i + 1 ? 'active' : ''}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Courses;
