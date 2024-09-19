const express = require('express');
const Payment = require('../models/Payment');
const router = express.Router();

// Create a new payment
router.post('/', async(req, res) => {
    const { user, amount } = req.body;
    try {
        const newPayment = new Payment({ user, amount });
        await newPayment.save();
        res.status(201).json(newPayment);
    } catch (error) {
        res.status(500).json({ error: 'Error creating payment' });
    }
});

module.exports = router;