import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [cooldownDays, setCooldownDays] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const email = localStorage.getItem('useremail');
    if (email) setUserEmail(email);
  }, []);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/courses/${id}/`);
        setCourse(res.data);
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };
    fetchCourse();
  }, [id]);

  useEffect(() => {
    const checkEnrollment = async () => {
      if (!userEmail || !id) return;
      try {
        const res = await axios.get('http://localhost:8000/api/enrollments');
        const userEnrollments = res.data.filter(
          (e) => e.user.useremail === userEmail && e.course.id === parseInt(id)
        );

        if (userEnrollments.length > 0) {
          const latest = userEnrollments.sort(
            (a, b) => new Date(b.enrolled_at) - new Date(a.enrolled_at)
          )[0];
          const enrolledAt = new Date(latest.enrolled_at);
          const now = new Date();
          const diffDays = Math.floor((now - enrolledAt) / (1000 * 60 * 60 * 24));

          if (diffDays < 10) {
            setIsEnrolled(true);
            setCooldownDays(10 - diffDays);
          }
        }
      } catch (error) {
        console.error('Error checking enrollment:', error);
      }
    };

    checkEnrollment();
  }, [userEmail, id]);

  const handleEnroll = async () => {
    try {
      const res = await axios.post('http://localhost:8000/api/enroll/', {
        useremail: userEmail,
        course_id: id,
      });
      setMessage(res.data.message);
      if (res.data.message.includes("Enrolled successfully")) {
        setIsEnrolled(true);
        setCooldownDays(10);
      }
    } catch (error) {
      setMessage('Error enrolling in course');
      console.error(error);
    }
  };

  if (!course) return <div>Loading...</div>;

  return (
    <motion.div className="course-detail-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="course-detail-card">
        <img src={course.thumbnail} alt={course.title} className="course-detail-thumbnail" />
        <h2 className="course-detail-title">{course.title}</h2>
        <p className="course-detail-description">{course.description}</p>
        <p className="course-detail-price">₹{course.price}</p>
        <div className="course-detail-action">
          {isEnrolled ? (
            <p className="enroll-info">Already enrolled. You can re-enroll in {cooldownDays} day(s).</p>
          ) : (
            <button className="enroll-btn" onClick={handleEnroll}>Enroll Now</button>
          )}
          {message && <p className="enroll-message">{message}</p>}
        </div>
      </div>
    </motion.div>
  );
};

export default CourseDetail;
