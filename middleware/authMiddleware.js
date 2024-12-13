// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: '����� �����������' });
  }

  try {
    const decoded = jwt.verify(token, 'secret_key'); // �������� 'secret_key' �� ���� ��������� ����
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: '�������� �����' });
  }
};

module.exports = authMiddleware;
