const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

// Đăng ký người dùng
router.post('/register', async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  // Kiểm tra xem mật khẩu và xác nhận mật khẩu có khớp không
  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  // Kiểm tra xem email hoặc username có đã tồn tại trong cơ sở dữ liệu chưa
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    return res.status(400).json({ error: 'Email or Username already exists' });
  }

  // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
  const hashedPassword = await bcrypt.hash(password, 10);

  // Tạo người dùng mới
  const newUser = new User({ username, email, password: hashedPassword });
  await newUser.save();

  // Trả về thông tin người dùng (bao gồm ID)
  res.status(201).json({ success: 'Registration successful', userId: newUser._id });
});

module.exports = router;
