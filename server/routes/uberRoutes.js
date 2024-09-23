const express = require('express');
const axios = require('axios');
const qs = require('qs');
const router = express.Router();
require('dotenv').config();

let uberAccessToken = null; // Store the token in memory
let tokenExpiresAt = null; // Store token expiration

// Function to get Uber access token
const getUberAccessToken = async () => {
  try {
    const response = await axios.post(
      'https://login.uber.com/oauth/v2/token',
      qs.stringify({
        client_id: 'aAPv571IbZ9sS8E5pX4-VFAhkm-ANqMd', // Replace with your actual Client ID
        client_secret: '_ftdL3zZqQoB0hgHDTHEkQITXqXO4gKa0KuJkGM8', // Replace with your actual Client Secret
        grant_type: 'client_credentials',
        scope: 'partner.trips	', 
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const { access_token, expires_in } = response.data;
    uberAccessToken = access_token;
    tokenExpiresAt = Date.now() + expires_in * 1000; // Token expiration in ms

    console.log('OAuth token obtained:', uberAccessToken);
    return uberAccessToken;
  } catch (error) {
    console.error('Error fetching OAuth token:', error.response?.data || error.message);
    throw new Error('Unable to fetch Uber access token');
  }
};

// Middleware to ensure Uber access token
const ensureUberAccessToken = async (req, res, next) => {
  if (!uberAccessToken || Date.now() >= tokenExpiresAt) {
    try {
      await getUberAccessToken();
    } catch (error) {
      return res.status(500).json({ message: 'Failed to get Uber access token' });
    }
  }
  next();
};

// Uber API Proxy Route to fetch rides
router.get('/rides', ensureUberAccessToken, async (req, res) => {
  const { latitude, longitude } = req.query;

  try {
    const response = await axios.get('https://api.uber.com/v1.2/products', {
      headers: {
        Authorization: `Bearer ${uberAccessToken}`,
      },
      params: {
        latitude,  // Use latitude from request query
        longitude, // Use longitude from request query
      },
    });

    res.json(response.data); // Send the Uber API response back to the client
  } catch (error) {
    console.error('Error fetching Uber API data:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      message: 'Error fetching Uber API data',
    });
  }
});

module.exports = router;
