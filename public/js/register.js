const form = document.getElementById('register-form');
const errorMessage = document.getElementById('error-message');
const successMessage = document.getElementById('success-message');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        errorMessage.textContent = 'Passwords do not match!';
        errorMessage.style.display = 'block';
        successMessage.style.display = 'none';
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(user => user.email === email)) {
        errorMessage.textContent = 'Email is already registered!';
        errorMessage.style.display = 'block';
        successMessage.style.display = 'none';
        return;
    }

    // Lấy phần trước ký tự @ từ email làm username
    const username = email.split('@')[0];
    const newUser = { username, email, password, id: Date.now() };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    successMessage.textContent = 'Registration successful!';
    successMessage.style.display = 'block';
    errorMessage.style.display = 'none';

    setTimeout(function () {
        window.location.href = '/login';
    }, 2000);
});
