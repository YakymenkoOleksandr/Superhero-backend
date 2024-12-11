import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import { env } from '../utils/env.js';

const verifyToken = (req, res, next) => {
  console.log('Authorization Header:', req.header('Authorization'));

  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    console.error('Access token is missing');
    return next(createHttpError(401, 'Access token is missing'));
  }

  console.log('Extracted Token:', token);

  jwt.verify(token, env('JWT_SECRET'), (err, decoded) => {
    if (err) {
      console.error('Token verification error:', err.message);
      return next(createHttpError(401, 'Invalid or expired token'));
    }

    console.log('Decoded Token:', decoded);
    req.user = decoded;
    next();
  });
};

export default verifyToken;
