document.addEventListener('DOMContentLoaded', function () {
    const stars = document.querySelectorAll('.stars span');
    const ratingValue = document.getElementById('rating-value');
    const userId = localStorage.getItem('userId'); // Lấy userId từ localStorage
    const username = localStorage.getItem('username'); // Lấy username từ localStorage
    const dishName = document.querySelector('h1').getAttribute('data-dish-name'); 
    const savedRating = localStorage.getItem(`${userId}-${dishName}-rating`); // Lưu đánh giá của người dùng theo userId và dishName

    if (savedRating) {
        setRatingDisplay(savedRating);
    }

    stars.forEach((star, index) => {
        star.addEventListener('mouseover', () => {
            updateStarColors(index);
        });

        star.addEventListener('click', (event) => {
            event.preventDefault();

            if (!userId) {
                japaneseAlert('You must log in to rate!');
                return;
            }

            const currentRating = parseInt(localStorage.getItem(`${userId}-${dishName}-rating`) || 0);
            const rating = index + 1;

            if (currentRating === rating) {
                saveRating(0); 
                setRatingDisplay(0); 
                deleteRating(userId, dishName); 
                return;
            }

            saveRating(rating);
            setRatingDisplay(rating);
            submitRating(rating); 
        });

        star.addEventListener('mouseleave', () => {
            resetStarColors();
        });
    });

    function updateStarColors(index) {
        stars.forEach((s, i) => {
            s.style.color = i <= index ? '#ffc107' : '#ccc';
        });
    }

    function resetStarColors() {
        const currentRating = localStorage.getItem(`${userId}-${dishName}-rating`) || 0;
        stars.forEach((s, i) => {
            s.style.color = i < currentRating ? '#ffc107' : '#ccc';
        });
    }

    function saveRating(rating) {
        localStorage.setItem(`${userId}-${dishName}-rating`, rating); // Lưu đánh giá theo userId
    }

    function setRatingDisplay(rating) {
        stars.forEach((s, i) => {
            s.classList.toggle('active', i < rating);
        });
        ratingValue.textContent = `You rated: ${rating}/5`;
    }

    function submitRating(rating) {
        fetch('/submit-rating', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: userId, dishName: dishName, rating: rating })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Rating submitted:', data);
            japaneseAlert('Thank you for rating!');
        })
        .catch((error) => {
            console.error('Error:', error);
            japaneseAlert('Failed to submit rating.');
        });
    }

    function deleteRating(userId, dishName) {
        fetch('/delete-rating', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, dishName }),
        })
        .then(response => response.json())
        .then(data => console.log(data.message))
        .catch(error => console.error('Error:', error));
    }

    function japaneseAlert(message) {
        if (document.getElementById('japanese-alert')) return;

        const overlay = document.createElement('div');
        overlay.id = 'japanese-alert';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.3s ease';
    
        const alertBox = document.createElement('div');
        alertBox.style.backgroundColor = '#f4f4f9';
        alertBox.style.padding = '20px 40px';
        alertBox.style.borderRadius = '8px';
        alertBox.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
        alertBox.style.textAlign = 'center';
        alertBox.style.fontFamily = '"Helvetica Neue", Arial, sans-serif';
        alertBox.style.color = '#333';
        alertBox.style.maxWidth = '350px';
        alertBox.style.width = '80%';
        alertBox.style.fontSize = '16px';
        alertBox.style.lineHeight = '1.5';
        alertBox.style.position = 'relative';

        alertBox.innerHTML = `<p style="font-size: 18px; font-weight: bold;">${message}</p>
                              <button id="alert-close-btn" style="background-color: #b22222; color: white; border: none; padding: 12px 24px; font-size: 14px; border-radius: 5px; cursor: pointer; outline: none;">OK</button>`;

        overlay.appendChild(alertBox);
        document.body.appendChild(overlay);

        setTimeout(() => {
            overlay.style.opacity = '1';
        }, 10);

        document.getElementById('alert-close-btn').addEventListener('click', () => {
            overlay.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(overlay);
            }, 300); 
        });
    }
});
