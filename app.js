// app.js
const express = require('express');
const sequelize = require('./config/database');
const multer = require('multer');
const path = require('path');

const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();
const PORT = 3000;

// Настройка загрузки файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Папка для загрузки файлов
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Имя файла с уникальным суффиксом
  },
});

const upload = multer({ storage });

// Раздача статических файлов
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Использование роутов и JSON
app.use(express.json());
app.use(productRoutes);
app.use(categoryRoutes);

// Синхронизация с базой данных и запуск сервера
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
  });
}).catch(error => {
  console.error('Ошибка подключения к базе данных:', error);
});
