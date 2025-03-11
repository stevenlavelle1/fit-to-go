import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", user);
      if (response.data.message) {
        alert(response.data.message); // Show login message from backend
      }
      // Store token in localStorage or sessionStorage
      localStorage.setItem("token", response.data.token); // Save token for future requests
      localStorage.setItem("userId", response.data.userId); // Save user ID if needed
      console.log("Login successful, token:", response.data.token); // Optionally, redirect to homepage

      // Navigate to the homepage after successful login
      navigate("/"); // Adjust this if your homepage route is different
    } catch (error) {
      alert(error.response?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
