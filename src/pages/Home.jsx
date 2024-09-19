import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RideListing from '../components/RideListing';
import '../styles/Home.css';

const Home = () => {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const response = await axios.get('/api/rides');
        setRides(response.data);
      } catch (error) {
        console.error('Error fetching rides:', error);
      }
    };

    fetchRides();
  }, []);

  return (
    <div className="home">
      <h2>Available Rides</h2>
      <div className="ride-listings">
        {rides.map((ride, index) => (
          <RideListing ride={ride} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Home;
