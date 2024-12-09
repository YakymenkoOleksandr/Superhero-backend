import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import { env } from '../utils/env.js'; // Для доступу до секретного ключа

const verifyToken = (req, res, next) => {
  console.log("Authorization Header:", req.header('Authorization')); // Лог заголовка Authorization

  const token = req.header('Authorization')?.split(' ')[1]; // Отримуємо токен з заголовка Authorization

  if (!token) {
    console.error("Access token is missing");
    return next(createHttpError(401, 'Access token is missing'));
  }

  console.log("Extracted Token:", token); // Лог отриманого токена

  jwt.verify(token, env('JWT_SECRET'), (err, decoded) => {
    if (err) {
      console.error("Token verification error:", err.message); // Лог помилки верифікації токена
      return next(createHttpError(401, 'Invalid or expired token'));
    }

    console.log("Decoded Token:", decoded); // Лог декодованих даних
    req.user = decoded; // Додаємо decoded дані користувача до запиту
    next();
  });
};

export default verifyToken;
