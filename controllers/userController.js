const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Регистрация пользователя
exports.register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Укажите email и пароль' });
  }

  try {
    const newUser = await User.create({ email, password });

    // Генерация токена активации
    const activationToken = jwt.sign({ id: newUser.id }, 'secret_key', { expiresIn: '1d' });

    // Отправка email с активационной ссылкой
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'Taratheliberator@gmail.com', // Ваш email
        pass: 'pfjy tcaa mhjw lwpf',       // Пароль приложения
      },
    });

    const activationLink = `http://localhost:3000/activate/${activationToken}`;
    await transporter.sendMail({
      from: 'Taratheliberator@gmail.com',
      to: email,
      subject: 'Активация аккаунта',
      text: `Пройдите по ссылке для активации: ${activationLink}`,
    });

    res.status(201).json({ message: 'Пользователь зарегистрирован. Проверьте email для активации.' });
  } catch (error) {
    console.error('Ошибка при регистрации:', error); // Для отладки
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

// Активация аккаунта
exports.activate = async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, 'secret_key');
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    user.isActivated = true;
    await user.save();

    res.status(200).json({ message: 'Аккаунт активирован' });
  } catch (error) {
    console.error('Ошибка активации:', error); // Для отладки
    res.status(400).json({ error: 'Неверный или истёкший токен' });
  }
};
