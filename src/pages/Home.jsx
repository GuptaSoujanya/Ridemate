import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import CarPng from './Images/Car.png'
import '../styles/Home.css'; // Keep the existing styles

const Home = () => {
  const [scrollY, setScrollY] = useState(0); // Track scroll position

  // Track scroll position
  const handleScroll = () => {
    setScrollY(window.scrollY);
    updateSpeedDisplay(); // Update speed based on scroll
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Zoom effect on background while scrolling
  const backgroundZoomAnimation = useSpring({
    transform: `scale(${1 + scrollY / 500})`, // Gradually zoom in the background
    opacity: 1 - scrollY / 1000, // Optional: Reduce opacity as you scroll
  });

  // Text fade-out effect based on scroll position
  const textFadeAnimation = useSpring({
    opacity: 1 - scrollY / 300, // Gradually fade out the text
    transform: scrollY > 200 ? 'translateY(-30px)' : 'translateY(0)', // Move up slightly when scrolling
  });

  // Speed Meter Section
  const calculateSpeed = () => {
    let speed = Math.min(Math.max((scrollY / document.body.scrollHeight) * 180, 0), 180);
    return Math.round(speed);
  };

  const updateSpeedDisplay = () => {
    let speedDisplay = document.getElementById('speed');
    if (speedDisplay) {
      speedDisplay.textContent = calculateSpeed() + ' km/h';
    }
  };

  return (
    <div className="home">
      {/* Background with zoom effect */}
      <animated.div className="hero-background" style={backgroundZoomAnimation}></animated.div>

      {/* Text that fades out */}
      <animated.div className="hero-overlay" style={textFadeAnimation}>
        <h1>Welcome to RideMate</h1>
        <p>Your best companion for ride-sharing within your community.</p>
      </animated.div>

      {/* About Section */}
      <div className="about-section">
        <h2 className="about-heading">About RideMate</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              RideMate is a ride-sharing platform built to serve the college student community. We aim to
              provide safe, reliable, and affordable rides to students, verified by college credentials.
            </p>
            <p>
              With our platform, students can easily share rides with their peers, making commuting
              more efficient and enjoyable. Join the RideMate community today and experience a better
              way to travel!
            </p>
          </div>
          <div className="about-image">
            <img src={CarPng} alt="About RideMate" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
