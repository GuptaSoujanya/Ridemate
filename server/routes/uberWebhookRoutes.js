const express = require('express');
const router = express.Router();

// Webhook endpoint to listen for receipt events
router.post('/webhook', (req, res) => {
    const event = req.body;

    console.log('Webhook event received:', event);

    // Handle specific event types
    if (event.event_type === 'business_trips.receipt_ready') {
        // Process the receipt event
        console.log('Receipt ready for trip:', event.resource_id);
    }

    res.status(200).send('Webhook received');
});

module.exports = router;