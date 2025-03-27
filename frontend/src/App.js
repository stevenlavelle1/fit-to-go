import React from "react";
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate, 
  // useLocation, 
  useNavigate,
  Link
} from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Homepage from "./components/Homepage";
import Upload from "./components/Upload";
import "./App.css";
import { useDispatch } from "react-redux";
import { logout } from "./redux/authSlice";

// Header component with navigation links and Sign Out button on the top right
const Header = () => {
  // const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  // Only render Header if user is signed in
  if (!token) return null;

  const handleSignOut = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/"); // Redirect to Login page
  };

  return (
    <header className="header">
      <nav className="nav-links">
        <Link to="/homepage">Home</Link>
        <Link to="/upload">Upload</Link>
      </nav>
      <div className="sign-out">
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    </header>
  );
};

// Protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  console.log("Token in ProtectedRoute:", token); 
  return token ? children : <Navigate to="/" replace />;
};

// Public routes (Login/Signup) that should not be accessible if logged in
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/homepage" replace /> : children;
};

function App() {
  return (
    <Router basename="/fit-to-go">
      <Header />
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
          <Route
            path="/homepage"
            element={
              <ProtectedRoute>
                <Homepage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                <Upload />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
