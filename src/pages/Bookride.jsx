import React from 'react';
import '../styles/BookRide.css';
import RideListing from '../components/RideListing';


const BookRide = () => {
  const availableRides = [
    { destination: 'Medicaps', driver: 'Alice', date: '2024-09-20', price: 8 },
    { destination: 'Campus', driver: 'Bob', date: '2024-09-21', price: 5 },
  ];

  return (
    <div className="book-ride">
      <h2>Available Rides</h2>
      <div className="ride-list">
        {availableRides.map((ride, index) => (
          <RideListing ride={ride} key={index} />
        ))}
      </div>
    </div>
  );
};

export default BookRide;
