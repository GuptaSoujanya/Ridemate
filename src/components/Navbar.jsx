import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = ({ user, setUser }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false); // Dropdown visibility
  const [navbarTransparent, setNavbarTransparent] = useState(true); // Transparency state
  const location = useLocation(); // Get current location

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Make the navbar transparent only on the Home page
    if (location.pathname === '/') {
      setNavbarTransparent(true);
    } else {
      setNavbarTransparent(false);
    }
  }, [setUser, location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null); // Reset the user state
  };

  return (
    <nav className={`navbar ${navbarTransparent ? 'transparent' : 'solid'}`}>
      <div className="logo">
        <NavLink exact to="/">
          RideMate
        </NavLink>
      </div>

      <div className="nav-links">
        <NavLink exact to="/" activeClassName="active-link">
          Home
        </NavLink>
        <NavLink to="/book-ride" activeClassName="active-link">
          Book a Ride
        </NavLink>
        <NavLink to="/payments" activeClassName="active-link">
          Payments
        </NavLink>
        <NavLink to="/profile" activeClassName="active-link">
          Profile
        </NavLink>
      </div>

      {/* If the user is logged in, show the user's name and dropdown */}
      {user ? (
        <div className="user-menu">
          <button onClick={() => setDropdownVisible(!dropdownVisible)}>
            {user.name}
          </button>
          {dropdownVisible && (
            <div className="dropdown">
              <NavLink to="/profile">Profile</NavLink>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      ) : (
        <div className="auth-links">
          <NavLink to="/signup" activeClassName="active-link">
            Sign Up
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
