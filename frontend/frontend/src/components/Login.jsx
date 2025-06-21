import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const redirectTo = location.state?.redirectTo || "/";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (email === "movieadmin@email.com" && password === "movie123") {
      const movieAdminData = {
        username: "Movie Admin",
        email,
        isAdmin: true,
        role: "movieadmin",
      };
      localStorage.setItem("mallmartUser", JSON.stringify(movieAdminData));
      alert("Movie admin login successful!");
      navigate(redirectTo);
      return;
    }

    if (email === "admin@email.com" && password === "admin") {
      const adminData = {
        username: "Admin",
        email,
        isAdmin: true,
        role: "shoppingadmin",
      };
      localStorage.setItem("mallmartUser", JSON.stringify(adminData));
      alert("Admin login successful!");
      navigate(redirectTo);
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/login/", { email, password });
      if (res.status === 200) {
        const { username } = res.data;
        const userData = {
          username,
          email,
          isAdmin: false,
          role: "user",
        };
        localStorage.setItem("mallmartUser", JSON.stringify(userData));
        alert("Login successful!");
        navigate(redirectTo);
      }
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>

        <div className="form-group">
          <input type="email" name="email" id="email" placeholder=" " onChange={handleChange} required />
          <label htmlFor="email">Email</label>
        </div>

        <div className="form-group">
          <input type="password" name="password" id="password" placeholder=" " onChange={handleChange} required />
          <label htmlFor="password">Password</label>
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
