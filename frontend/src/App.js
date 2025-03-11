import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Homepage from "./components/Homepage";
import Upload from "./components/Upload";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Welcome to the Workout App - Fit to Go</h1>
        
        {/* Add links to navigate between Login and Signup */}
        <nav className="nav-links">
          <Link to="/signup">Signup</Link> | <Link to="/">Login</Link> | <Link to="/upload">Upload</Link> | <Link to="/homepage">Home</Link>
        </nav>
        <Routes>
          {/* Define routes for Signup and Login */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/upload" element={<Upload />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;