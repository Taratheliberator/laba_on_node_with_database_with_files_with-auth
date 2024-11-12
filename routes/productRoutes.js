

// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

// Маршруты для продуктов
router.get('/products', productController.getAllProducts);
router.post('/products', productController.createProduct);

// Маршрут для загрузки изображений
router.post('/products/upload', upload.single('image'), productController.uploadProductImage);

module.exports = router;
