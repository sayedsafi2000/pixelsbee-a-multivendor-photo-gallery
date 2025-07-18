import pool from '../config/db.js';

export const findUserByEmail = async (email) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

export const createUser = async (user) => {
  const { name, email, password, role, profile_pic_url } = user;
  const [result] = await pool.query(
    'INSERT INTO users (name, email, password, role, profile_pic_url) VALUES (?, ?, ?, ?, ?)',
    [name, email, password, role || 'user', profile_pic_url || null]
  );
  return { id: result.insertId, ...user };
};

export const getUserById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
};

export const updateUserStatus = async (id, status) => {
  await pool.query('UPDATE users SET status = ? WHERE id = ?', [status, id]);
};

export const listVendors = async () => {
  const [rows] = await pool.query("SELECT * FROM users WHERE role = 'vendor'");
  return rows;
}; 