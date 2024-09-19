const express = require('express');
const Ride = require('../models/Ride');
const router = express.Router();

// Get all rides
router.get('/', async(req, res) => {
    try {
        const rides = await Ride.find().populate('driver');
        res.status(200).json(rides);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching rides' });
    }
});

// Create a new ride
router.post('/', async(req, res) => {
    const { driver, destination, price, date } = req.body;
    try {
        const newRide = new Ride({ driver, destination, price, date });
        await newRide.save();
        res.status(201).json(newRide);
    } catch (error) {
        res.status(500).json({ error: 'Error creating ride' });
    }
});

module.exports = router;