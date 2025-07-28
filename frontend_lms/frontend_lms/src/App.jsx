import React from 'react';
import './App.css'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Courses from './components/Courses';
import AdminPanel from './components/AdminPanel';
import CourseDetail from './components/CourseDetail'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="signup" element={<SignUp />} /> 
          <Route path="login" element={<Login />} /> 
          <Route path="courses" element={<Courses />} />
          <Route path="adminpanel" element={<AdminPanel />} />
          <Route path="courses/:id" element={<CourseDetail />} /> 
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
