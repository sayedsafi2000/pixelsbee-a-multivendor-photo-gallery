import bcrypt from 'bcryptjs';
import { findUserByEmail, createUser } from '../models/userModel.js';
import { signToken } from '../utils/jwt.js';

export const register = async (req, res) => {
  const { name, email, password, profile_pic_url } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  const existing = await findUserByEmail(email);
  if (existing) {
    return res.status(409).json({ message: 'Email already registered' });
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = await createUser({ name, email, password: hashed, role: 'vendor', profile_pic_url });
  // Vendors start as pending approval
  return res.status(201).json({ message: 'Registration successful, pending admin approval' });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  if (user.status !== 'approved') {
    return res.status(403).json({ message: 'Account not approved by admin' });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = signToken({ id: user.id, role: user.role });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role, profile_pic_url: user.profile_pic_url } });
}; 