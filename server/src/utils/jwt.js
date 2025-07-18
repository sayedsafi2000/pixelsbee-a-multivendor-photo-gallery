import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const signToken = (payload, expiresIn = '7d') => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
}; 