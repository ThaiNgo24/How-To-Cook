# Sử dụng Node.js phiên bản 18 làm image nền
FROM node:18

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép package.json và package-lock.json vào thư mục làm việc /app
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn từ thư mục public/js và views vào container
COPY public/ ./public
COPY views/ ./views

# Sao chép toàn bộ mã nguồn còn lại vào thư mục làm việc /app
COPY server.js ./
COPY models/ ./models
COPY routes/ ./routes

# Mở cổng 3000 để ứng dụng có thể nhận request
EXPOSE 3000

# Lệnh chạy ứng dụng
CMD ["node", "server.js"]
