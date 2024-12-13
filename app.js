// app.js
const express = require('express');
const sequelize = require('./config/database');
const multer = require('multer');
const path = require('path');

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express(); // ��������� app � ������
const PORT = 3000;

// ��������� �������� ������
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // ����� ��� �������� ������
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // ��� ����� � ���������� ���������
  },
});

const upload = multer({ storage });

// ������� ����������� ������
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ������������� JSON
app.use(express.json());

// ����������� ���������
app.use(userRoutes);
app.use(productRoutes);
app.use(categoryRoutes);

// ������������� � ����� ������ � ������ �������
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`������ ������� �� http://localhost:${PORT}`);
  });
}).catch(error => {
  console.error('������ ����������� � ���� ������:', error);
});
