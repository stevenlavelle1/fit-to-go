import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
    const [user, setUser] = useState({
        username: "", // Change this from 'name' to 'username'
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/auth/signup", user);
            alert(response.data.message);
        } catch (error) {
            alert("Signup failed. Try again.");
        }
    };

    return (
        <div className="signup-container">
            <h2>Signup</h2>
            <form onSubmit={handleSubmit} className="signup-form">
                <input
                    type="text"
                    name="username" // Change this from 'name' to 'username'
                    placeholder="Username"
                    value={user.username} // Bind to 'username' in the state
                    onChange={handleChange}
                    required
                    className="signup-input"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={user.email}
                    onChange={handleChange}
                    required
                    className="signup-input"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={user.password}
                    onChange={handleChange}
                    required
                    className="signup-input"
                />
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={user.confirmPassword}
                    onChange={handleChange}
                    required
                    className="signup-input"
                />
                <button type="submit" className="signup-button">Signup</button>
            </form>
        </div>
    );
};

export default Signup;
