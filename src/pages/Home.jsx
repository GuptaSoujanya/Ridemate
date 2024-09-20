import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RideListing from '../components/RideListing';
import '../styles/Home.css';

const Home = () => {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/rides');
        setRides(response.data);
      } catch (error) {
        console.error('Error fetching rides:', error);
      }
    };

    fetchRides();
  }, []);

  return (
    <div className="home">
      <div className="hero-section">
        <h1>Welcome to RideMate</h1>
        <p>Your best companion for ride-sharing within your community.</p>
      </div>
      <div className="ride-listings">
        <h2>Available Rides</h2>
        <div className="ride-listings-container">
          {rides.map((ride, index) => (
            <RideListing ride={ride} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
