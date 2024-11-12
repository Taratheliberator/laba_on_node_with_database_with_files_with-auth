// controllers/productController.js
const Product = require('../models/Product');
const Category = require('../models/Category');
const path = require('path');

// Получение всех продуктов
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({ include: Category });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

// Создание нового продукта
exports.createProduct = async (req, res) => {
  const { name, price, categoryId } = req.body;

  if (!name || !price || !categoryId) {
    return res.status(400).json({ error: 'Необходимо указать название, цену и категорию товара' });
  }

  try {
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ error: 'Категория не найдена' });
    }

    const newProduct = await Product.create({ name, price, categoryId });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

// Загрузка изображения для продукта
exports.uploadProductImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Файл не был загружен' });
  }

  // Возвращаем путь к загруженному файлу
  res.status(200).json({ imagePath: `/uploads/${req.file.filename}` });
};

