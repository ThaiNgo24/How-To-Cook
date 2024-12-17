const userId = localStorage.getItem('userId'); 
const username = localStorage.getItem('username'); 

if (!userId || !username) {
    japaneseAlert('You need to log in to comment!');
    window.location.href = '/login'; 
}

const commentButton = document.getElementById('comment-button'); 
const commentInput = document.getElementById('comment-text'); 
const commentsContainer = document.getElementById('comments-container'); 

function submitComment() {
    const comment = commentInput.value;

    if (!comment.trim()) {
        japaneseAlert('Please enter a comment!');
        return;
    }

    fetch('/api/comments/submit-comment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment, userId, username })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                addCommentToUI({ comment, username, createdAt: new Date().toISOString() });
                commentInput.value = ''; 
            } else {
                japaneseAlert('Failed to submit comment.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            japaneseAlert('Failed to submit comment.');
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

// Tải bình luận khi trang được load
window.onload = loadComments;

commentButton.addEventListener('click', submitComment);

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


