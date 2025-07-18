import bcrypt from 'bcryptjs';
import { getUserById, findUserByEmail } from '../models/userModel.js';
import { listProductsByVendor } from '../models/productModel.js';
import pool from '../config/db.js';

export const getProfile = async (req, res) => {
  const user = await getUserById(req.user.id);
  res.json({ id: user.id, name: user.name, email: user.email, role: user.role, profile_pic_url: user.profile_pic_url });
};

export const updateProfile = async (req, res) => {
  const { name, email, profile_pic_url } = req.body;
  if (!name || !email) return res.status(400).json({ message: 'Name and email required' });
  // Check if email is taken by another user
  const existing = await findUserByEmail(email);
  if (existing && existing.id !== req.user.id) return res.status(409).json({ message: 'Email already in use' });
  await pool.query('UPDATE users SET name = ?, email = ?, profile_pic_url = ? WHERE id = ?', [name, email, profile_pic_url || null, req.user.id]);
  res.json({ message: 'Profile updated' });
};

export const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) return res.status(400).json({ message: 'Both passwords required' });
  const user = await getUserById(req.user.id);
  const match = await bcrypt.compare(oldPassword, user.password);
  if (!match) return res.status(401).json({ message: 'Old password incorrect' });
  const hashed = await bcrypt.hash(newPassword, 10);
  await req.db.query('UPDATE users SET password = ? WHERE id = ?', [hashed, req.user.id]);
  res.json({ message: 'Password changed' });
};

export const getMyProducts = async (req, res) => {
  const products = await listProductsByVendor(req.user.id);
  res.json(products);
}; 