document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Kiểm tra tài khoản và mật khẩu (giả sử bạn sử dụng localStorage hoặc API để xác thực)
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        // Lưu ID người dùng vào localStorage (giả sử bạn lưu id người dùng khi đăng nhập thành công)
        localStorage.setItem('userId', user.id);

        // Hiển thị thông báo thành công
        document.getElementById('success-message').textContent = 'Login successful!';
        document.getElementById('success-message').style.display = 'block';

        // Chuyển hướng người dùng về trang chính
        window.location.href = '/views/pages/page1.html';  // Hoặc chuyển hướng về trang bạn muốn
    } else {
        // Hiển thị thông báo lỗi nếu đăng nhập không thành công
        document.getElementById('error-message').textContent = 'Invalid email or password';
        document.getElementById('error-message').style.display = 'block';
    }
});
