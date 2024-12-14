document.addEventListener("DOMContentLoaded", () => {
  const regions = [
    { class: 'region1', regionName: 'Hokkaido' },
    { class: 'region2', regionName: 'Tohoku' },
    { class: 'region3', regionName: 'Kanto' },
  ];

  const moveTime = 1000; 
  const pauseTime = 3000; 

  regions.forEach(region => {
    const regionElement = document.querySelector(`.${region.class}`);
    const slider = regionElement.querySelector('.slider');
    const track = slider.querySelector('.track');
    const items = track.querySelectorAll('.item'); 
    const totalItems = items.length; 

    if (totalItems <= 4) {
      console.warn(`Vùng ${region.regionName} có quá ít món ăn, không thể áp dụng công thức "tổng số món - 4".`);
      return; 
    }

    const margin = 0; 
    const itemWidth = items[0].offsetWidth + margin; 
    const stepsToMove = totalItems - 4; 

    console.log(`Số món trong ${region.regionName}: ${totalItems}. Số lần chạy: ${stepsToMove}`);

    const containerWidth = itemWidth * 4; 
    slider.style.width = `${containerWidth}px`; 

    let currentStep = 0; // Biến theo dõi bước hiện tại
    let moveCount = 0; // Biến đếm số lần di chuyển slider

    // Hàm cập nhật slider
    function updateSlider() {
      const offset = -currentStep * itemWidth; // Khoảng cách trượt (bao gồm cả margin)
      track.style.transition = `transform ${moveTime / 1000}s ease-in-out`;
      track.style.transform = `translateX(${offset}px)`;
    }

    // Hàm reset slider về món đầu
    function resetSlider() {
      track.style.transition = "transform 1s ease-in-out"; // Thêm thời gian cho hiệu ứng lướt
      track.style.transform = "translateX(0px)"; // Quay về món đầu tiên

      // Reset lại các giá trị biến
      currentStep = 0;
      moveCount = 0;
    }

    // Hàm tự động chạy slider
    function autoPlaySlider() {
      const intervalID = setInterval(() => {
        if (moveCount < stepsToMove) {
          currentStep++;
          moveCount++;
          updateSlider(); 
        } else {
          clearInterval(intervalID); 
          setTimeout(() => {
            resetSlider(); 
            setTimeout(autoPlaySlider, pauseTime); 
          }, pauseTime);
        }
      }, moveTime + pauseTime); 
    }

    autoPlaySlider();
  });
});
