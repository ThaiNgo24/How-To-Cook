const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const mongoose = require('mongoose');
const cors = require('cors');
const ratingRouter = require('./routes/rating');
const commentRouter = require('./routes/comment');
const Comment = require('./models/Comment');
const router = express.Router();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const User = require('./models/User'); 
const Rating = require('./models/Rating'); 
require('dotenv').config();

const app = express();
app.use(cookieParser());  // Để sử dụng cookie
app.use(express.json());  // Để parse các dữ liệu dạng JSON
app.use(express.urlencoded({ extended: true })); // Để parse các dữ liệu form

app.use(cors());  // Cho phép tất cả các nguồn (hoặc cấu hình theo yêu cầu)
const uri = "mongodb+srv://Thaingo:Thai24062005@cluster0.j83xa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect('mongodb+srv://Thaingo:Thai24062005@cluster0.j83xa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB')).catch(err => console.error(err));


// Cấu hình Express để phục vụ favicon
app.use(favicon(path.join(__dirname, 'public', 'icon', 'japan4.png')));

// Cấu hình Express để phục vụ các tệp tĩnh (CSS, JS, hình ảnh)
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/views', express.static(path.join(__dirname, 'views')));
app.use('/pages', express.static(path.join(__dirname, 'pages')));
app.use('/users', express.static(path.join(__dirname, 'users')));
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));
app.use('/models', express.static(path.join(__dirname, 'models')));
app.use('/routes', express.static(path.join(__dirname, 'routes')));

// Các route cho các trang HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'pages', 'main_page.html'));
});

app.get('/page1', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'pages', 'page1.html'));
});

app.get('/credits', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'pages', 'credits.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'pages', 'contact.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/views/Users/register.html');
});
  
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/views/Users/login.html');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.use('/api/ratings', ratingRouter);

app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    // Lấy phần trước @ từ email làm username
    const username = email.split('@')[0];

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already registered!' });
        }

        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        res.status(500).json({ message: 'Error during registration', error: error.message });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Tạo token JWT và trả về thông tin username và id
        const token = jwt.sign({ userId: user._id, username: user.username }, 'your_secret_key', { expiresIn: '1h' });
        res.json({ message: 'Login successful', token, username: user.username, userId: user._id });
    } catch (error) {
        res.status(500).json({ message: 'Error during login', error: error.message });
    }
});

// Middleware xác thực JWT
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, 'your_secret_key', (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.userId = decoded.userId;
        next();
    });
};

// Route gửi đánh giá, chỉ cho phép người dùng đánh giá một lần
app.post('/submit-rating', async (req, res) => {
    const { rating, userId, dishName } = req.body;

    try {
        const existingRating = await Rating.findOne({ userId, dishName });
        if (existingRating) {
            return res.status(400).json({ message: 'You have already rated this dish' });
        }

        const newRating = new Rating({
            rating: rating,
            userId: userId,
            dishName: dishName,
            timestamp: new Date()
        });

        await newRating.save();
        res.status(200).json({ message: 'Rating submitted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to submit rating', error: error.message });
    }
});

// Sử dụng route comment
app.use('/api/comments', commentRouter);

// Route nhận bình luận và lưu vào MongoDB
router.post('/submit-comment', async (req, res) => {
    const { comment, userId, username } = req.body;

    if (!comment || !userId || !username) {
        console.error('Invalid input: ', { comment, userId, username });
        return res.status(400).json({ success: false, message: 'Comment or userId or username is missing' });
    }

    try {
        const newComment = new Comment({ comment, userId, username });
        await newComment.save();
        res.status(200).json({ success: true, message: 'Comment has been submitted' });
    } catch (error) {
        console.error('Error saving comment:', error);
        res.status(500).json({ success: false, message: 'Error saving comment' });
    }
});

// Route lấy tất cả bình luận
router.get('/get-comments', async (req, res) => {
    try {
        const comments = await Comment.find().sort({ createdAt: -1 }); // Sắp xếp theo thời gian
        res.status(200).json({ success: true, comments });
    } catch (error) {
        console.error('Error loading comments:', error);
        res.status(500).json({ success: false, message: 'Error loading comments' });
    }
});

module.exports = router;

// Sử dụng cookie-parser để xử lý cookies
app.use(cookieParser());

// Cấu hình các middleware khác như body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/comments/get-comments', async (req, res) => {
    try {
        const comments = await Comment.find().sort({ createdAt: -1 }); // Lấy tất cả bình luận, sắp xếp giảm dần theo thời gian
        res.json({ success: true, comments });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: 'Failed to load comments' });
    }
});

app.post('/api/comments/submit-comment', async (req, res) => {
    const { comment, userId, username } = req.body;

    if (!comment || !userId || !username) {
        return res.json({ success: false, message: 'Invalid input' });
    }

    try {
        const newComment = new Comment({ comment, userId, username });
        await newComment.save();
        res.json({ success: true, message: 'Comment saved successfully' });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: 'Failed to save comment' });
    }
});

app.post('/delete-rating', async (req, res) => {
    const { userId, dishName } = req.body;

    console.log(`Request received to delete rating for userId: ${userId} and dishName: ${dishName}`);

    try {
        const existingRating = await Rating.findOne({ userId, dishName });
        if (!existingRating) {
            console.log(`No rating found for userId: ${userId} and dishName: ${dishName}`);
            return res.status(404).json({ message: 'No rating found to remove.' });
        }

        const deletedRating = await Rating.findOneAndDelete({ userId, dishName });
        console.log(`Rating removed for userId: ${userId} and dishName: ${dishName}`);
        return res.status(200).json({ message: 'Rating removed successfully' });
    } catch (error) {
        console.error('Error removing rating:', error);
        return res.status(500).json({ message: 'Failed to remove rating', error: error.message });
    }
});

app.post('/add-rating', async (req, res) => {
    const { userId, dishName, rating } = req.body;

    try {
        // Kiểm tra xem người dùng đã đánh giá món ăn này chưa
        const existingRating = await Rating.findOne({ userId, dishName });
        if (existingRating) {
            return res.status(400).json({ message: 'You have already rated this dish.' });
        }

        // Thêm đánh giá mới
        const newRating = new Rating({ userId, dishName, rating });
        await newRating.save();
        return res.status(200).json({ message: 'Rating added successfully.' });
    } catch (error) {
        console.error('Error adding rating:', error);
        return res.status(500).json({ message: 'Failed to add rating', error: error.message });
    }
});

// Lắng nghe cổng 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

