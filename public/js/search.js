document.addEventListener('DOMContentLoaded', function() {
  const searchBox = document.querySelector('.search-box');
  const searchResults = document.getElementById('search-results');
  const searchInput = document.getElementById('search-input');
  
  // Lắng nghe sự kiện click trên toàn bộ trang
  document.addEventListener('click', function(event) {
    if (!searchBox.contains(event.target)) {
      searchResults.style.display = 'none';  // Ẩn kết quả tìm kiếm
    }
  });

  // Hàm tìm kiếm
  function searchFood(event) {
    const inputSearch = searchInput.value;
    const resultsDiv = searchResults;

    // Giả lập kết quả tìm kiếm
    const foodResults = [
      //Hokkaido
      { name: 'Ishikari Nabe', ImageBitmap: '/images/images1/Ishikari_Nabe.jpg', url: '/views/recipes/recipes1/ishikari_nabe.html' },
      { name: 'Jingisukan', ImageBitmap: '/images/images1/jingisukan.jpg', url: '/views/recipes/recipes1/jingisukan.html' },
      { name: 'Chan Chan Yaki', ImageBitmap: '/images/images1/chanchanyaki.jpg', url: '/views/recipes/recipes1/chan_chan_yaki.html' },
      { name: 'Imo Mochi', ImageBitmap: '/images/images1/imomochi.jpg', url: '/views/recipes/recipes1/imo_mochi.html' },
      { name: 'Soup Curry', ImageBitmap: '/images/images1/soup_curry.jpg', url: '/views/recipes/recipes1/soup_curry.html' },
      { name: 'Zangi', ImageBitmap: '/images/images1/zangi.jpg', url: '/views/recipes/recipes1/zangi.html' },
      { name: 'Hokkaido Milk Bread', ImageBitmap: '/images/images1/Hokkaido_Milk_Bread.jpg', url: '/views/recipes/recipes1/hokkaido_milk_bread.html' },
      { name: 'Kani Meshi', ImageBitmap: '/images/images1/kani_meshi.jpg', url: '/views/recipes/recipes1/kani_meshi.html' },
      { name: 'Hokkaido Cream Stew', ImageBitmap: '/images/images1/hokkaido_cream_stew.jpg', url: '/views/recipes/recipes1/hokkaido_cream_stew.html' },
      //Tohoku
      { name: 'Kiritanpo Nabe', ImageBitmap: '/images/images1/Kiritanpo_Nabe.jpg', url: '/views/recipes/recipes1/kiritanpo_nabe.html' },
      { name: 'Gyutan Yaki', ImageBitmap: '/images/images1/Gyutan_Yaki.jpg', url: '/views/recipes/recipes1/gyutan_yaki.html' },
      { name: 'Hittsumi Jiru', ImageBitmap: '/images/images1/Hittsumi_Jiru.jpg', url: '/views/recipes/recipes1/hittsumi_jiru.html' },
      { name: 'Ichigo-ni', ImageBitmap: '/images/images1/Ichigo_ni.jpg', url: '/views/recipes/recipes1/Ichigo_ni.html' },
      { name: 'Wanko Soba', ImageBitmap: '/images/images1/Wanko_Soba.jpg', url: '/views/recipes/recipes1/Wanko_Soba.html' },
      { name: 'Senbei Jiru', ImageBitmap: '/images/images1/Senbei_Jiru.webp', url: '/views/recipes/recipes1/Senbei_Jiru.html' },
      { name: 'Harako Meshi', ImageBitmap: '/images/images1/Harako_Meshi.jpg', url: '/views/recipes/recipes1/Harako_Meshi.html' },
      { name: 'Shiso Maki', ImageBitmap: '/images/images1/Shiso_Maki.jpg', url: '/views/recipes/recipes1/Shiso_Maki.html' },
      //Kanto
      { name: 'Sukiyaki', ImageBitmap: '/images/images1/Sukiyaki.jpg', url: '/views/recipes/recipes1/Sukiyaki.html' },
      { name: 'Monjayaki', ImageBitmap: '/images/images1/Monjayaki.jpg', url: '/views/recipes/recipes1/monjayaki.html' },
      { name: 'Chanko Nabe', ImageBitmap: '/images/images1/Chanko_Nabe.jpg', url: '/views/recipes/recipes1/Chanko_Nabe.html' },
      { name: 'Hiyashi Chuka', ImageBitmap: '/images/images1/Hiyashi_Chuka.jpg', url: '/views/recipes/recipes1/Hiyashi_Chuka.html' },
      { name: 'Fukagawa Meshi', ImageBitmap: '/images/images1/Fukagawa_Meshi.jpg', url: '/views/recipes/recipes1/Fukagawa_Meshi.html' },
      { name: 'Namero', ImageBitmap: '/images/images1/Namero.jpg', url: '/views/recipes/recipes1/Namero.html' },
      { name: 'Anko Nabe', ImageBitmap: '/images/images1/Anko_Nabe.jpeg', url: '/views/recipes/recipes1/Anko_Nabe.html' },
      { name: 'Kashira Yaki', ImageBitmap: '/images/images1/Kashira_Yaki.jpg', url: '/views/recipes/recipes1/Kashira_Yaki.html' },
      //Chubu
      { name: 'Hoto', ImageBitmap: '/images/images2/Hoto.jpg', url: '/views/recipes/recipes2/hoto.html' },
      { name: 'Miso Katsu', ImageBitmap: '/images/images2/miso_katsu.jpg', url: '/views/recipes/recipes2/miso_katsu.html' },
      { name: 'Hitsumabushi', ImageBitmap: '/images/images2/Hitsumabushi.jpg', url: '/views/recipes/recipes2/hitsumabushi.html' },
      { name: 'Ebi Senbei', ImageBitmap: '/public/images/images2/Ebi_Senbei.webp', url: '/views/recipes/recipes2/Ebi_Senbei.html' },
      { name: 'Tekone Sushi', ImageBitmap: '/images/images2/tekone_sushi.jpg', url: '/views/recipes/recipes2/tekone_sushi.html' },
      { name: 'Toyama Black Ramen', ImageBitmap: '/images/images2/toyama_black_ramen.jpg', url: '/views/recipes/recipes2/toyama_black_ramen.html' },
      { name: 'Gohei Mochi', ImageBitmap: '/images/images2/gohei_mochi.jpg', url: '/views/recipes/recipes2/gohei_mochi.html' },
      { name: 'Noppe Jiru', ImageBitmap: '/images/images2/noppe_jiru.jpg', url: '/views/recipes/recipes2/noppe_jiru.html' },
      //Kansai
      { name: 'Takoyaki', ImageBitmap: '/images/images2/takoyaki.jpg', url: '/views/recipes/recipes2/takoyaki.html' },
      { name: 'Okonomiyaki', ImageBitmap: '/images/images2/okonomiyaki.jpg', url: '/views/recipes/recipes2/okonomiyaki.html' },
      { name: 'Kitsune Udon', ImageBitmap: '/images/images2/kitsune_udon.jpg', url: '/views/recipes/recipes2/kitsune_udon.html' },
      { name: 'Yudofu', ImageBitmap: '/images/images2/yudofu.jpg', url: '/views/recipes/recipes2/yudofu.html' },
      { name: 'Sabazushi', ImageBitmap: '/images/images2/sabazushi.jpg', url: '/views/recipes/recipes2/sabazushi.html' },
      { name: 'Kushikatsu', ImageBitmap: '/images/images2/kushikatsu.jpg', url: '/views/recipes/recipes2/kushikatsu.html' },
      { name: 'Hoba Miso', ImageBitmap: '/images/images2/hoba_miso.jpg', url: '/views/recipes/recipes2/hoba_miso.html' },
      { name: 'Oden', ImageBitmap: '/images/images2/oden.jpg', url: '/views/recipes/recipes2/oden.html' },
      //Chugoku
      { name: 'Okonomiyaki Hiroshima', ImageBitmap: '/images/images2/Okonomiyaki Hiroshima.jpg', url: '/views/recipes/recipes2/okonomiyaki_hiroshima.html' },
      { name: 'Nizakana', ImageBitmap: '/images/images2/nizakana.jpg', url: '/views/recipes/recipes2/nizakana.html' },
      { name: 'Kaki Furai', ImageBitmap: '/images/images2/Kaki Furai.jpg', url: '/views/recipes/recipes2/kaki_furai.html' },
      { name: 'Matsuba Gani Shabu', ImageBitmap: '/images/images2/matsuba_gani_shabu.jpg', url: '/views/recipes/recipes2/matsuba_gani_shabu.html' },
      { name: 'Izumo Soba', ImageBitmap: '/public/images/images2/izumo_soba.jpg', url: '/views/recipes/recipes2/izumo_soba.html' },
      { name: 'Sunomono', ImageBitmap: '/images/images2/sunomono.jpg', url: '/views/recipes/recipes2/kibinago_no_sunomono.html' },
      { name: 'Horumon Udon', ImageBitmap: '/images/images2/horumon_udon.jpg', url: '/views/recipes/recipes2/horumon_udon.html' },
      { name: 'Bara Sushi', ImageBitmap: '/images/images2/bara_sushi.jpg', url: '/views/recipes/recipes2/bara_sushi.html' },
      //Shikoku
      { name: 'Katsuo no Tataki', ImageBitmap: '/images/images3/Katsuo_no_Tataki.jpg', url: '/views/recipes/recipes3/Katsuo_no_Tataki.html' },
      { name: 'Sanuki Udon', ImageBitmap: '/images/images3/Sanuki_Udon.jpg', url: '/views/recipes/recipes3/Sanuki_Udon.html' },
      { name: 'Tai Meshi', ImageBitmap: '/images/images3/Tai_Meshi.jpg', url: '/views/recipes/recipes3/Tai_Meshi.html' },
      { name: 'Sudachi Soba', ImageBitmap: '/images/images3/Sudachi_Soba.jpg', url: '/views/recipes/recipes3/Sudachi_Soba.html' },
      { name: 'Iya Soba', ImageBitmap: '/images/images3/Iya_Soba.jpg', url: '/views/recipes/recipes3/Iya_Soba.html' },
      { name: 'Naruto Kintoki Sweet Potato', ImageBitmap: '/images/images3/Naruto_Kintoki_Sweet_Potato.jpg', url: '/views/recipes/recipes3/Naruto_Kintoki_Sweet_Potato.html' },
      { name: 'Shimanto Eel', ImageBitmap: '/public/images/images3/Shimanto_Eel.png', url: '/views/recipes/recipes3/Shimanto_Eel.html' },
      { name: 'Uwajima Taimeshi', ImageBitmap: '/public/images/images3/Uwajima_Taimeshi.png', url: '/views/recipes/recipes3/Uwajima_Taimeshi.html' },
      //Kyushu
      { name: 'Hakata Ramen', ImageBitmap: '/images/images3/Hakata_Ramen.jpg', url: '/views/recipes/recipes3/Hakata_Ramen.html' },
      { name: 'Motsunabe', ImageBitmap: '/images/images3/Motsunabe.jpg', url: '/views/recipes/recipes3/Motsunabe.html' },
      { name: 'Karashi Mentaiko', ImageBitmap: '/images/images3/Karashi_Mentaiko.jpg', url: '/views/recipes/recipes3/Karashi_Mentaiko.html' },
      { name: 'Nagasaki Champon', ImageBitmap: '/images/images3/Nagasaki_Champon.jpg', url: '/views/recipes/recipes3/Nagasaki_Champon.html' },
      { name: 'Tonkatsu', ImageBitmap: '/images/images3/Tonkatsu.jpg', url: '/views/recipes/recipes3/Tonkatsu.html' },
      { name: 'Chicken Nanban', ImageBitmap: '/images/images3/Chicken_Nanban.jpg', url: '/views/recipes/recipes3/Chicken_Nanban.html' },
      { name: 'Saga Beef', ImageBitmap: '/public/images/images3/Saga_Beef.jpeg', url: '/views/recipes/recipes3/Saga_Beef.html' },
      { name: 'Basashi', ImageBitmap: '/images/images3/Basashi.jpg', url: '/views/recipes/recipes3/Basashi.html' },
      //Onikawa
      { name: 'Goya Champuru', ImageBitmap: '/images/images3/Goya_Champuru.jpg', url: '/views/recipes/recipes3/Goya_Champuru.html' },
      { name: 'Okinawa Soba', ImageBitmap: '/images/images3/Okinawa_Soba.jpg', url: '/views/recipes/recipes3/Okinawa_Soba.html' },
      { name: 'Rafute', ImageBitmap: '/images/images3/Rafute.jpg', url: '/views/recipes/recipes3/Rafute.html' },
      { name: 'Taco Rice', ImageBitmap: '/images/images3/Taco_Rice.jpg', url: '/views/recipes/recipes3/Taco_Rice.html' },
      { name: 'Sata Andagi', ImageBitmap: '/images/images3/Sata_Andagi.jpg', url: '/views/recipes/recipes3/Sata_Andagi.html' },
      { name: 'Umibudo', ImageBitmap: '/images/images3/Umibudo.jpg', url: '/views/recipes/recipes3/Umibudo.html' },
      { name: 'Shima Tofu', ImageBitmap: '/images/images3/Shima_Tofu.jpg', url: '/views/recipes/recipes3/Shima_Tofu.html' },
      { name: 'Mimiga', ImageBitmap: '/images/images3/Mimiga.jpg', url: '/views/recipes/recipes3/Mimiga.html' },
    ];

    // Lọc kết quả theo từ khóa tìm kiếm
    const filteredResults = foodResults.filter(food => food.name.toLowerCase().includes(inputSearch.toLowerCase()));
    console.log(inputSearch);

// Hiển thị kết quả (giới hạn tối đa 4 kết quả)
resultsDiv.innerHTML = '';
if (filteredResults.length > 0) {
  const limitedResults = filteredResults.slice(0, 5); // Chỉ lấy tối đa 4 kết quả
  limitedResults.forEach(food => {
    const foodDiv = document.createElement('div');
    const imageHTML = food.ImageBitmap ? `<img src="${food.ImageBitmap} " alt="${food.name}" width="40" height="35">` : '';
    foodDiv.innerHTML = `<a href="${food.url}" class="search-result-item">
                          <h3>${food.name}</h3>
                          ${imageHTML}
                         </a>`;
    resultsDiv.appendChild(foodDiv);
  });
  resultsDiv.style.display = 'block'; // Hiển thị kết quả tìm kiếm
} else {
  resultsDiv.innerHTML = '<p style="color: #8b0000;">No result</p>';
  resultsDiv.style.display = 'block'; // Hiển thị thông báo không có kết quả
}

  }

  // Gán sự kiện cho nút tìm kiếm
  document.querySelector('.search-button').addEventListener('click', searchFood);

  // Hiển thị kết quả tìm kiếm khi người dùng gõ
  searchInput.addEventListener('input', function() {
    if (searchInput.value.length > 0) {
      searchResults.style.display = 'block'; // Hiển thị kết quả tìm kiếm khi bắt đầu nhập
    } else {
      searchResults.style.display = 'none'; // Ẩn kết quả tìm kiếm nếu không có văn bản
    }
  });

  // Lắng nghe sự kiện Enter khi người dùng nhấn phím Enter
  searchInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') { // Nếu nhấn phím Enter
      searchFood();  // Gọi hàm tìm kiếm
      event.preventDefault(); // Ngăn không cho form được submit (nếu có)
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  // Lấy nút Login/Logout
  const loginLogoutBtn = document.getElementById('login-logout-btn');
  if (!loginLogoutBtn) {
      console.error('Login/Logout button not found on this page.');
      return;
  }

  // Lấy thông tin userId từ localStorage
  const userId = localStorage.getItem('userId');

  // Cập nhật trạng thái nút khi tải trang
  updateLoginLogoutButton(loginLogoutBtn, userId);

  // Gắn sự kiện click cho nút
  loginLogoutBtn.addEventListener('click', function () {
      if (userId) {
          // Xử lý đăng xuất
          localStorage.removeItem('userId');
          window.location.href = '/register'; // Chuyển hướng đến trang login
      } else {
          // Chuyển đến trang login
          window.location.href = '/login';
      }
  });
});

/**
* Hàm cập nhật trạng thái nút Login/Logout
* @param {HTMLElement} button - Phần tử nút Login/Logout
* @param {string|null} userId - ID người dùng từ localStorage
*/
function updateLoginLogoutButton(button, userId) {
  if (userId) {
      button.textContent = "Logout";
  } else {
      button.textContent = "Login";
  }
}



