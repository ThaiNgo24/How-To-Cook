// Lấy các phần tử
const menu = document.querySelector('.menu');
const submenu = menu.querySelector('.submenu');

// Khi nhấp vào menu-button
menu.querySelector('.menu-button').addEventListener('click', function (e) {
    // Tránh trường hợp click vào submenu làm đóng lại menu
    e.stopPropagation();

    const isVisible = submenu.style.display === 'block';
    if (isVisible) {
        submenu.style.opacity = '0';
        submenu.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            submenu.style.display = 'none';
        }, 300); // Thời gian chờ khớp với transition
    } else {
        submenu.style.display = 'block';
        setTimeout(() => {
            submenu.style.opacity = '1';
            submenu.style.transform = 'translateY(0)';
        }, 0);
    }
});

// Đóng menu khi click ngoài vùng menu
document.addEventListener('click', function (e) {
    if (!menu.contains(e.target)) {
        submenu.style.opacity = '0';
        submenu.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            submenu.style.display = 'none';
        }, 300);
    }
});
