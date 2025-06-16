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
        username,
        email,
        contact,
        age,
        password,
        confirmPassword,
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
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="text" name="contact" placeholder="Contact" onChange={handleChange} required />
        <input type="number" name="age" placeholder="Age" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
