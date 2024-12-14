const commentButton = document.querySelector('comment-button'); 
const commentInput = document.getElementById('comment-text'); 
const commentsContainer = document.getElementById('comments-container'); 

const userId = 'user1'; // Thay thế bằng cơ chế thực tế để lấy ID người dùng
const username = 'ThaiNgo'; // Thay thế bằng tên người dùng thực tế

// Hàm gửi bình luận lên server
function submitComment() {
    const comment = commentInput.value;

    if (!comment.trim()) {
        alert('Please enter a comment!');
        return;
    }

    // Gửi comment lên server
    fetch('/api/comments/submit-comment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment: comment, userId: userId, username: username })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Thêm bình luận vào giao diện người dùng ngay lập tức
                addCommentToUI({ comment, username, createdAt: new Date().toISOString() });
                commentInput.value = ''; 
                alert('Your comment has been submitted!');
            } else {
                alert('Failed to submit comment.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to submit comment.');
        });
}

// Hàm thêm bình luận vào UI
function addCommentToUI({ comment, username, createdAt }) {
    const commentElement = document.createElement('div');
    commentElement.classList.add('comment');
    commentElement.innerHTML = `
        <strong>${username}</strong> <span>(${new Date(createdAt).toLocaleString()})</span>
        <p>${comment}</p>
    `;
    commentsContainer.appendChild(commentElement);
}

// Hàm tải các bình luận khi trang được load
function loadComments() {
    fetch('/api/comments/get-comments')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                commentsContainer.innerHTML = '';
                data.comments.forEach(comment => {
                    addCommentToUI(comment);
                });
            } else {
                console.log('Failed to load comments');
            }
        })
        .catch(error => {
            console.error('Error loading comments:', error);
        });
}

window.onload = loadComments;

commentButton.addEventListener('click', submitComment);


