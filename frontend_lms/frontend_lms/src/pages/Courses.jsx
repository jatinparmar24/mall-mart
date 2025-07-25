// pages/Courses.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import './Courses.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const BASE_URL = 'http://localhost:8000';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 4;

  useEffect(() => {
    axios.get(`${BASE_URL}/all-courses/`)
      .then(res => {
        if (Array.isArray(res.data)) {
          setCourses(res.data);
        } else {
          setCourses([]);
        }
      })
      .catch(err => console.error('Failed to fetch courses:', err));
  }, []);

  const filteredCourses = courses
    .filter(course =>
      course.title.toLowerCase().includes(search.toLowerCase())
    )
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
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };

  const handlePageChange = page => setCurrentPage(page);

  return (
    <div className="courses-page">
      <motion.div
        className="slider-wrapper"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Slider {...sliderSettings}>
          {courses.map(course => (
            <motion.div
              key={course.id}
              className="slider-item"
              whileHover={{ scale: 1.03 }}
            >
              <img
                src={`${BASE_URL}${course.thumbnail}`}
                alt={course.title}
              />
              <div className="slider-info">
                <h3>{course.title}</h3>
                <p>{course.description.slice(0, 100)}...</p>
              </div>
            </motion.div>
          ))}
        </Slider>
      </motion.div>

      <div className="course-section">
        <h2 className="courses-heading">Explore Our Courses</h2>

        <div className="filters">
          <input
            type="text"
            placeholder="Search by course title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
            <option value="">Sort by price</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>

        <div className="course-grid">
          {currentCourses.map(course => (
            <motion.div
              className="course-card"
              key={course.id}
              whileHover={{ scale: 1.03 }}
            >
              <img
                src={`${BASE_URL}${course.thumbnail}`}
                alt={course.title}
              />
              <h3>{course.title}</h3>
              <p>{course.description.slice(0, 80)}...</p>
              <span className="price">₹{course.price}</span>
              <button disabled>Enroll</button>
            </motion.div>
          ))}
        </div>

        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={currentPage === i + 1 ? 'active' : ''}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
