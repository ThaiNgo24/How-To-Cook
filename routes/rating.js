const express = require('express');
const Rating = require('../models/Rating');
const router = express.Router();

// Endpoint để gửi đánh giá
router.post('/submit-rating', async (req, res) => {
    const { rating, userId, itemId } = req.body;

    // Kiểm tra xem có thiếu thông tin không
    if (!rating || !userId || !itemId) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    try {
        // Tạo một đối tượng Rating mới và lưu vào MongoDB
        const newRating = new Rating({ rating, userId, itemId });
        await newRating.save();

        res.status(200).json({ success: true, message: 'Rating submitted successfully' });
    } catch (error) {
        console.error('Error submitting rating:', error);
        res.status(500).json({ success: false, message: 'Error submitting rating' });
    }
});

module.exports = router;
