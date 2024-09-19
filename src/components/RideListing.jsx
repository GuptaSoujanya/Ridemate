import React from 'react';
import '../styles/RideListing.css';

const RideListing = ({ ride }) => {
  return (
    <div className="ride-listing">
      <h3>{ride.destination}</h3>
      <p><strong>Driver:</strong> {ride.driver}</p>
      <p><strong>Date:</strong> {ride.date}</p>
      <p><strong>Price:</strong> ${ride.price}</p>
      <button className="book-button">Book Ride</button>
    </div>
  );
};

export default RideListing
