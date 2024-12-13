const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// ����������� ������������
exports.register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: '������� email � ������' });
  }

  try {
    const newUser = await User.create({ email, password });

    // ��������� ������ ���������
    const activationToken = jwt.sign({ id: newUser.id }, 'secret_key', { expiresIn: '1d' });

    // �������� email � ������������� �������
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'Taratheliberator@gmail.com', // ��� email
        pass: 'pfjy tcaa mhjw lwpf',       // ������ ����������
      },
    });

    const activationLink = `http://localhost:3000/activate/${activationToken}`;
    await transporter.sendMail({
      from: 'Taratheliberator@gmail.com',
      to: email,
      subject: '��������� ��������',
      text: `�������� �� ������ ��� ���������: ${activationLink}`,
    });

    res.status(201).json({ message: '������������ ���������������. ��������� email ��� ���������.' });
  } catch (error) {
    console.error('������ ��� �����������:', error); // ��� �������
    res.status(500).json({ error: '������ �������' });
  }
};

// ��������� ��������
exports.activate = async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, 'secret_key');
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(404).json({ error: '������������ �� ������' });
    }

    user.isActivated = true;
    await user.save();

    res.status(200).json({ message: '������� �����������' });
  } catch (error) {
    console.error('������ ���������:', error); // ��� �������
    res.status(400).json({ error: '�������� ��� ������� �����' });
  }
};
