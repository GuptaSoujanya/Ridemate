import React, { useState } from 'react';
import axios from 'axios';
import '../styles/BookRide.css'; // Include your custom CSS

const BookRide = () => {
  const [city, setCity] = useState(''); // User input for city
  const [rides, setRides] = useState([]); // Store available ride options
  const [loading, setLoading] = useState(false); // To show loading state
  const [error, setError] = useState(null); // To capture and display errors

  const OPENCAGE_API_KEY = 'YOUR_OPENCAGE_API_KEY'; // Replace with your OpenCage API Key

  // Handle city input change
  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  // Geocode the city to get latitude and longitude
  const geocodeCity = async (city) => {
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city)}&key=${'debe5f2fd1644e449197d219a35f0f7e'}`
      );
      
      const { lat, lng } = response.data.results[0].geometry; // Extract the latitude and longitude
      return { latitude: lat, longitude: lng };
    } catch (error) {
      console.error('Error geocoding city:', error);
      throw new Error('Failed to get coordinates for the city.');
    }
  };

  // Handle form submission to search for rides
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city) return; // Prevent empty search

    setLoading(true);
    setError(null);

    try {
      // Get the latitude and longitude for the city
      const { latitude, longitude } = await geocodeCity(city);

      // Make API call to your backend to get available rides
      const response = await axios.get('http://localhost:5000/api/uber/rides', {
        params: {
          latitude, // Pass the dynamic latitude
          longitude, // Pass the dynamic longitude
        },
      });

      setRides(response.data.products || []); // Update state with rides data
    } catch (error) {
      console.error('Error fetching ride options:', error);
      setError('Failed to fetch ride options. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="book-ride-page">
      <h1>Book a Ride</h1>

      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={handleInputChange}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {loading && <p>Loading available rides...</p>}

      {error && <p className="error-message">{error}</p>}

      <div className="ride-options">
        {rides.length > 0 ? (
          rides.map((ride) => (
            <div key={ride.product_id} className="ride-card">
              <h3>{ride.display_name}</h3>
              <p>Capacity: {ride.capacity}</p>
              <img src={ride.image} alt={ride.display_name} className="ride-image" />
            </div>
          ))
        ) : (
          !loading && <p>No rides available for the specified location.</p>
        )}
      </div>
    </div>
  );
};

export default BookRide;
