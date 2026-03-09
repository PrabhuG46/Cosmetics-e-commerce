const express = require('express');
const router = express.Router();
const { sendContactEmail } = require('../utils/emailService');

// POST /api/contact — send inquiry email to studio owner
router.post('/', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !name.trim())    return res.status(400).json({ message: 'Name is required.' });
        if (!email || !email.includes('@')) return res.status(400).json({ message: 'Valid email is required.' });
        if (!message || !message.trim()) return res.status(400).json({ message: 'Message cannot be empty.' });

        const sent = await sendContactEmail(name.trim(), email.trim(), message.trim());

        if (sent) {
            res.json({ message: 'Inquiry sent! We will respond within 24 hours.' });
        } else {
            // email failed but we still acknowledge — prevents exposing infra issues
            res.json({ message: 'Inquiry received. We will respond within 24 hours.' });
        }
    } catch (error) {
        console.error('Contact route error:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

module.exports = router;
