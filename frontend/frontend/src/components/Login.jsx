import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    // Check for admin credentials directly in frontend
    if (email === "admin@email.com" && password === "admin") {
      const adminData = {
        username: "Admin",
        email,
        isAdmin: true,
      };
      localStorage.setItem("mallmartUser", JSON.stringify(adminData));
      alert("Admin login successful!");
      navigate("/Admindashboard");
      return; // Skip backend call
    }

    // Normal user login
    try {
      const res = await axios.post("http://localhost:8000/login/", { email, password });

      if (res.status === 200) {
        const { username } = res.data;

        const userData = {
          username,
          email,
          isAdmin: false,
        };

        localStorage.setItem("mallmartUser", JSON.stringify(userData));

        alert("Login successful!");
        navigate("/");
      }
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
