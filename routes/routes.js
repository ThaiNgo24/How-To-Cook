const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');

// Kết nối MongoDB
mongoose.connect('mongodb+srv://Thaingo:Thai24062005@cluster0.j83xa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB')).catch(err => console.error(err));

// Định nghĩa mô hình dữ liệu Recipe (nếu chưa có)
const recipeSchema = new mongoose.Schema({
  rating: { type: Number, required: true, min: 1, max: 5 },
  timestamp: { type: Date, default: Date.now }
});
const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Rating;

// Cấu hình để serve các tệp tĩnh (HTML, CSS, JS)
app.use(express.static('public'));

// Các route cho từng trang
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/pages/page1.html');
});

app.get('/about', (req, res) => {
  res.sendFile(__dirname + '/views/pages/about.html');
});

app.get('/contact', (req, res) => {
  res.sendFile(__dirname + '/views/pages/contact.html');
});

app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/views/users/register.html');
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/views/users/login.html');
});

app.post('/submit-rating', async (req, res) => {
  try {
      const { rating } = req.body; // Lấy rating từ body
      if (!rating || rating < 1 || rating > 5) {
          return res.status(400).json({ success: false, message: 'Invalid rating value' });
      }

      // Lưu đánh giá vào cơ sở dữ liệu
      const newRating = new Rating({ rating });
      await newRating.save();

      // Tính trung bình các đánh giá hiện tại
      const ratings = await Rating.find();
      const averageRating = (
          ratings.reduce((sum, item) => sum + item.rating, 0) / ratings.length
      ).toFixed(2);

      res.json({ success: true, averageRating });
  } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Kết nối đến MongoDB
mongoose.connect('mongodb://localhost:27017/foodApp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err));

// Sử dụng routes đăng ký
app.use('/api', authRoutes);

app.use(express.json()); // Middleware to parse JSON from the frontend

// Endpoint to receive comments
app.post('/submit-comment', (req, res) => {
  const { comment, userId } = req.body;

  if (!comment || !userId) {
      return res.status(400).json({ success: false, message: 'Comment or userId is missing' });
  }

  console.log('Received comment:', comment, 'From user:', userId);
  res.status(200).json({ success: true, message: 'Comment has been submitted' });
});

// Lắng nghe ứng dụng ở cổng 3000
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});