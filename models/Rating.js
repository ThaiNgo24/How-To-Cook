const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    rating: { type: Number, required: true, min: 1, max: 5 },
    userId: { type: String, required: true }, 
    timestamp: { type: Date, default: Date.now }
});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
