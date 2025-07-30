import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    price: '',
    thumbnail: '',
    video_link: ''
  });

  const [message, setMessage] = useState('');
  const [enrollments, setEnrollments] = useState([]);

  // Fetch all enrollments on mount
  useEffect(() => {
      axios.get('http://localhost:8000/enrollments/')
      .then(res => setEnrollments(res.data))
      .catch(err => console.log(err));
  }, []);

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit new course (as JSON)
  const handleAddCourse = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8000/admin/add-course/', courseData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setMessage('✅ Course added successfully!');
      setCourseData({
        title: '',
        description: '',
        price: '',
        thumbnail: '',
        video_link: ''
      });
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      setMessage('❌ Failed to add course');
    }
  };

  return (
    <div className="admin-panel">
      <h2>🛠 Admin Panel</h2>

      <div className="form-section">
        <h3>Add New Course</h3>
        <form onSubmit={handleAddCourse}>
          <input
            type="text"
            name="title"
            placeholder="Course Title"
            value={courseData.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Course Description"
            value={courseData.description}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={courseData.price}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="thumbnail"
            placeholder="Thumbnail Image URL"
            value={courseData.thumbnail}
            onChange={handleChange}
            required
          />
          <input
            type="url"
            name="video_link"
            placeholder="Video Link (optional)"
            value={courseData.video_link}
            onChange={handleChange}
          />
          <button type="submit">Add Course</button>
        </form>
        <p className="message">{message}</p>
      </div>

      <div className="table-section">
        <h3>📦 Student Purchases</h3>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Course</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.map((enroll, i) => (
              <tr key={i}>
                <td>{enroll.username}</td>
                <td>{enroll.useremail}</td>
                <td>{enroll.course}</td>
                <td>{new Date(enroll.enrolled_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
