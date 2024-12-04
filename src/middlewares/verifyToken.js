import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import { env } from '../utils/env.js';  // Для доступу до секретного ключа

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Отримуємо токен з заголовка Authorization

  if (!token) {
    return next(createHttpError(401, 'Access token is missing'));
  }

  jwt.verify(token, env('JWT_SECRET'), (err, decoded) => {
    if (err) {
      return next(createHttpError(401, 'Invalid or expired token'));
    }

    req.user = decoded; // Додаємо decoded дані користувача до запиту
    next();
  });
};

export default verifyToken;
