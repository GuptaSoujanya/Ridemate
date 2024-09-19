import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = ({ user, setUser }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false); // Dropdown visibility

  // Check if the user is already logged in when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null); // Reset the user state
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">RideMate</Link>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/book-ride">Book a Ride</Link>
        <Link to="/payments">Payments</Link>
        <Link to="/profile">Profile</Link>
      </div>

      {/* If the user is logged in, show the user's name and dropdown */}
      {user ? (
        <div className="user-menu">
          <button onClick={() => setDropdownVisible(!dropdownVisible)}>
            {user.name}
          </button>
          {dropdownVisible && (
            <div className="dropdown">
              <Link to="/profile">Profile</Link>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      ) : (
        <div className="auth-links">
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
