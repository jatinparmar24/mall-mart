import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [message, setMessage] = useState('');
  const [alreadyEnrolled, setAlreadyEnrolled] = useState(false);

  useEffect(() => {
    // 1. Fetch course details
    axios.get(`http://localhost:8000/api/courses/${id}/`)
      .then(res => setCourse(res.data))
      .catch(() => setMessage('Error loading course.'));

    // 2. Check if user already enrolled
    const user = JSON.parse(localStorage.getItem('lms_user'));
    if (user) {
      axios.get('http://localhost:8000/api/enrollments/')
        .then(res => {
          const enrolled = res.data.some(enr =>
            enr.useremail === user.useremail &&
            enr.course === course?.title
          );
          setAlreadyEnrolled(enrolled);
        });
    }
  }, [id, course?.title]);

  const handleBuy = () => {
    const user = JSON.parse(localStorage.getItem('lms_user'));

    if (!user) {
      navigate('/login');
      return;
    }

    axios.post('http://localhost:8000/api/enroll/', {
      useremail: user.useremail,
      course_id: id
    })
      .then(res => {
        setMessage(res.data.message);
        if (res.data.message === 'Enrolled successfully') {
          setAlreadyEnrolled(true);
        }
      })
      .catch(() => setMessage('Something went wrong.'));
  };

  if (!course) return <div className="course-detail">Loading...</div>;

  return (
    <div className="course-detail">
      <img src={course.thumbnail} alt={course.title} className="course-image" />
      <div className="course-info">
        <h1>{course.title}</h1>
        <p>{course.description}</p>
        <h3>Price: ₹{course.price}</h3>

        {course.video_link && (
          <div className="course-video">
            <iframe
              width="100%"
              height="315"
              src={course.video_link}
              title="Course Preview"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        <button className="buy-btn" onClick={handleBuy} disabled={alreadyEnrolled}>
          {alreadyEnrolled ? 'Already Purchased' : 'Buy Now'}
        </button>

        {message && <p className="buy-message">{message}</p>}
      </div>
    </div>
  );
};

export default CourseDetail;
