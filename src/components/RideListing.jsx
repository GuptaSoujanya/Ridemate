
import React from 'react';
import '../styles/RideListing.css';

const RideListing = ({ ride }) => {
  return (
    <div className="ride-card">
      <div className="ride-card-content">
        <h3>{ride.destination}</h3>
        <p>Driver: {ride.driver}</p>
        <p>Seats Available: {ride.seats}</p>
        <button>Book Now</button>
      </div>
    </div>
  );
};

export default RideListing;

