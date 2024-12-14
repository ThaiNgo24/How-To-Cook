const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const logo = document.getElementById("logo");
const contentWrapper = document.querySelector(".content-wrapper");

canvas.width = 100;
canvas.height = 268;

// Tải logo
const logoImage = new Image();
logoImage.src = logo.src;

let waterHeight = canvas.height; // Chiều cao nước ban đầu

logoImage.onload = function () {
  // Thêm lớp mờ cho nội dung trang khi bắt đầu
  contentWrapper.classList.add("blur");

  function drawWater() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.drawImage(logoImage, 0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "source-in";

    ctx.fillStyle = "black";
    ctx.fillRect(0, waterHeight, canvas.width, canvas.height - waterHeight);
    ctx.restore();

    waterHeight -= 0.75;
    if (waterHeight < 0) waterHeight = 0;

    // Bắt đầu làm rõ nền khi nước đạt khoảng 10% của chiều cao
    if (waterHeight <= canvas.height * 0.1) {
      contentWrapper.classList.remove("blur");
    }

    if (waterHeight === 0) {
      fadeOutAndRevealBackground();
    } else {
      requestAnimationFrame(drawWater);
    }
  }

  function fadeOutAndRevealBackground() {
    // Làm mờ dần canvas và logo
    canvas.classList.add("hidden");
    logo.classList.add("hidden");

    // Xóa hiệu ứng mờ của nội dung trang sau khi logo và canvas biến mất
    setTimeout(() => {
      contentWrapper.classList.remove("blur");
    }, 1000); // Sau khi canvas và logo biến mất
  }

  drawWater();
};
