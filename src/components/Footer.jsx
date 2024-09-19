import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>© 2024 Ridemate. All rights reserved.</p>
      <ul className="footer-links">
        <li><a href="/">Privacy Policy</a></li>
        <li><a href="/">Terms of Service</a></li>
      </ul>
    </footer>
  );
};

export default Footer;
