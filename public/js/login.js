document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        // Lưu thông tin người dùng vào localStorage để quản lý phiên đăng nhập
        localStorage.setItem('userId', user.id);
        localStorage.setItem('username', user.username);
        localStorage.setItem('userEmail', user.email);

        document.getElementById('success-message').textContent = 'Login successful!';
        document.getElementById('success-message').style.display = 'block';

        window.location.href = '/views/pages/page1.html';  
    } else {
        document.getElementById('error-message').textContent = 'Invalid email or password';
        document.getElementById('error-message').style.display = 'block';
    }
});
