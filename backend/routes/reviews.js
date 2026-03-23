const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Product = require('../models/Product');
const User = require('../models/User');
const { sendReviewEmail } = require('../utils/emailService');
const auth = require('../middleware/auth');

// GET /api/reviews/:productId — fetch all reviews for a product
router.get('/:productId', async (req, res) => {
    try {
        const reviews = await Review.find({ productId: req.params.productId })
            .sort({ createdAt: -1 })
            .limit(50);

        // Compute rating summary
        const total = reviews.length;
        const avg = total > 0
            ? (reviews.reduce((s, r) => s + r.rating, 0) / total).toFixed(1)
            : 0;

        const dist = [5, 4, 3, 2, 1].map(star => ({
            star,
            count: reviews.filter(r => r.rating === star).length,
            pct: total > 0 ? Math.round((reviews.filter(r => r.rating === star).length / total) * 100) : 0
        }));

        res.json({ reviews, avg: parseFloat(avg), total, dist });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// POST /api/reviews/:productId — submit a review (requires login)
router.post('/:productId', auth, async (req, res) => {
    try {
        const { rating, title, comment } = req.body;

        if (!rating || rating < 1 || rating > 5)
            return res.status(400).json({ message: 'Rating must be between 1 and 5.' });
        if (!title || !title.trim())
            return res.status(400).json({ message: 'Review title is required.' });
        if (!comment || !comment.trim())
            return res.status(400).json({ message: 'Review comment is required.' });

        const userId = req.userId; // From auth middleware
        if (!userId) return res.status(401).json({ message: 'Invalid User' });

        const user = await User.findById(userId);
        const nameOfReviewer = user ? user.name : "Anonymous";

        // Check for existing review
        const existing = await Review.findOne({
            productId: req.params.productId,
            userId: userId
        });
        if (existing)
            return res.status(400).json({ message: 'You have already reviewed this product.' });

        const review = await Review.create({
            productId: req.params.productId,
            userId: userId,
            userName: nameOfReviewer,
            rating: Number(rating),
            title: title.trim(),
            comment: comment.trim(),
            verified: true  // assume verified if user is logged in
        });

        // Send Email notification to Admin
        try {
            const product = await Product.findById(req.params.productId);
            const productName = product ? product.name : "Product";
            await sendReviewEmail(nameOfReviewer, Number(rating), title.trim(), comment.trim(), productName);
        } catch (emailErr) {
            console.error('Failed to send review email notification:', emailErr);
        }

        res.status(201).json({ message: 'Review submitted!', review });
    } catch (err) {
        if (err.code === 11000)
            return res.status(400).json({ message: 'You have already reviewed this product.' });
        res.status(500).json({ message: 'Server error' });
    }
});

// POST /api/reviews/:productId/helpful/:reviewId — mark review helpful
router.post('/:productId/helpful/:reviewId', async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(
            req.params.reviewId,
            { $inc: { helpful: 1 } },
            { new: true }
        );
        if (!review) return res.status(404).json({ message: 'Review not found' });
        res.json({ helpful: review.helpful });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
