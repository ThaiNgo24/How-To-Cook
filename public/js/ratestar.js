document.addEventListener('DOMContentLoaded', function () {
    const stars = document.querySelectorAll('.stars span');
    const ratingValue = document.getElementById('rating-value');
    const userId = localStorage.getItem('userId'); // Lấy trạng thái đăng nhập

    // Lấy tên món ăn từ thuộc tính data-dish-name
    const dishName = document.querySelector('h1').getAttribute('data-dish-name'); // Lấy tên món ăn

    // Kiểm tra nếu đã có đánh giá trước đó cho món ăn này
    const savedRating = localStorage.getItem(`${dishName}-rating`);
    if (savedRating) {
        setRatingDisplay(savedRating);
    }

    // Xử lý sự kiện hover, click, và mouseleave
    stars.forEach((star, index) => {
        star.addEventListener('mouseover', () => {
            updateStarColors(index);
        });

        star.addEventListener('click', (event) => {
            event.preventDefault();

            // Nếu chưa đăng nhập, chặn đánh giá
            if (!userId) {
                alert('You must log in to rate!');
                return;
            }

            const rating = index + 1; // Giá trị đánh giá
            saveRating(rating); // Lưu đánh giá vào localStorage cho món ăn này
            setRatingDisplay(rating); // Cập nhật hiển thị

            // Gửi đánh giá lên server
            fetch('/submit-rating', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: userId, dishName: dishName, rating: rating }), // Gửi tên món ăn và đánh giá
            })
                .then(response => response.json())
                .then(data => {
                    alert('Thank you for rating!');
                })
                .catch((error) => {
                    console.error('Error:', error);
                    alert('Failed to submit rating.');
                });
        });

        star.addEventListener('mouseleave', () => {
            resetStarColors();
        });
    });

    /**
     * Cập nhật màu sắc các sao khi hover
     * @param {number} index - Vị trí sao được hover
     */
    function updateStarColors(index) {
        stars.forEach((s, i) => {
            s.style.color = i <= index ? '#ffc107' : '#ccc';
        });
    }

    /**
     * Đặt lại màu sắc các sao theo đánh giá đã lưu
     */
    function resetStarColors() {
        const currentRating = localStorage.getItem(`${dishName}-rating`) || 0;
        stars.forEach((s, i) => {
            s.style.color = i < currentRating ? '#ffc107' : '#ccc';
        });
    }

    /**
     * Lưu đánh giá của người dùng vào localStorage cho món ăn này
     * @param {number} rating - Số sao đã đánh giá
     */
    function saveRating(rating) {
        localStorage.setItem(`${dishName}-rating`, rating);
    }

    /**
     * Cập nhật giao diện hiển thị số sao và thông báo đánh giá
     * @param {number} rating - Số sao đã đánh giá
     */
    function setRatingDisplay(rating) {
        stars.forEach((s, i) => {
            s.classList.toggle('active', i < rating);
        });
        ratingValue.textContent = `You rated: ${rating}/5`;
    }
});
