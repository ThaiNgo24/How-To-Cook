const express = require('express');
const Comment = require('../models/Comment');
const router = express.Router();

// Route nhận comment và lưu vào MongoDB
router.post('/submit-comment', async (req, res) => {
    try {
        const { comment, userId, username } = req.body;

        // Kiểm tra dữ liệu
        if (!comment || !userId || !username) {
            return res.status(400).json({ success: false, message: 'Invalid data' });
        }

        // Tạo và lưu bình luận
        const newComment = new Comment({
            comment,
            userId,
            username,
            createdAt: new Date(),
        });

        await newComment.save();

        res.status(201).json({ success: true, message: 'Comment submitted successfully' });
    } catch (error) {
        console.error('Error saving comment:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
