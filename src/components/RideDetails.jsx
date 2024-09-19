import React from 'react';
import '../styles/RideDetails.css';

const RideDetails = () => {
  return (
    <div className="ride-details">
      <h2>Ride Details</h2>
      <p><strong>Destination:</strong> City Center</p>
      <p><strong>Driver:</strong> Jane Smith</p>
      <p><strong>Date:</strong> 2024-09-18</p>
      <p><strong>Price:</strong> $10</p>
      <button className="confirm-button">Confirm Booking</button>
    </div>
  );
};

export default RideDetails;
