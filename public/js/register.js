// Lấy form và các phần tử cần thiết
const form = document.getElementById('register-form');
const errorMessage = document.getElementById('error-message');
const successMessage = document.getElementById('success-message');

form.addEventListener('submit', function (event) {
  event.preventDefault(); // Ngăn chặn form gửi đi

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  // Kiểm tra các lỗi đơn giản
  if (password !== confirmPassword) {
    errorMessage.textContent = 'Passwords do not match!';
    errorMessage.style.display = 'block';
    successMessage.style.display = 'none';
    return;
  }

  // Kiểm tra email đã tồn tại (giả sử bạn có một API hoặc kiểm tra qua LocalStorage)
  let users = JSON.parse(localStorage.getItem('users')) || [];
  if (users.some(user => user.email === email)) {
    errorMessage.textContent = 'Email is already registered!';
    errorMessage.style.display = 'block';
    successMessage.style.display = 'none';
    return;
  }

  // Nếu không có lỗi, đăng ký thành công
  const newUser = { username, email, password, id: Date.now() };
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));

  successMessage.textContent = 'Registration successful!';
  successMessage.style.display = 'block';
  errorMessage.style.display = 'none';

  // Chuyển hướng đến trang đăng nhập
  setTimeout(function () {
    window.location.href = '/login'; // Chuyển hướng đến trang đăng nhập sau khi thành công
  }, 2000);
});
