import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    contact: "",
    age: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isValidContact = (contact) => {
    return /^\d{10}$/.test(contact) && !/^(\d)\1{9}$/.test(contact);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, contact, age, password, confirmPassword } = formData;

    if (!email.includes("@")) return alert("Invalid email");
    if (!isValidContact(contact)) return alert("Contact must be 10 digits and not all same");
    if (parseInt(age) <= 18) return alert("Age must be greater than 18");
    if (password !== confirmPassword) return alert("Passwords do not match");

    try {
      const res = await axios.post("http://localhost:8000/signup/", {
        username, email, contact, age, password, confirmPassword,
      });

      if (res.status === 201) {
        alert("Signup successful!");
        navigate("/login");
      }
    } catch (err) {
      alert("Signup failed: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>Sign Up</h2>

        <div className="form-group">
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} placeholder=" " required />
          <label htmlFor="username">Username</label>
        </div>

        <div className="form-group">
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder=" " required />
          <label htmlFor="email">Email</label>
        </div>

        <div className="form-group">
          <input type="text" id="contact" name="contact" value={formData.contact} onChange={handleChange} placeholder=" " required />
          <label htmlFor="contact">Contact</label>
        </div>

        <div className="form-group">
          <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} placeholder=" " required />
          <label htmlFor="age">Age</label>
        </div>

        <div className="form-group">
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder=" " required />
          <label htmlFor="password">Password</label>
        </div>

        <div className="form-group">
          <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder=" " required />
          <label htmlFor="confirmPassword">Confirm Password</label>
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
