import pool from '../config/db.js';

export const createProduct = async (product) => {
  const { vendor_id, title, description, price, image_url } = product;
  const [result] = await pool.query(
    'INSERT INTO products (vendor_id, title, description, price, image_url) VALUES (?, ?, ?, ?, ?)',
    [vendor_id, title, description, price, image_url]
  );
  return { id: result.insertId, ...product };
};

export const getProductById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
  return rows[0];
};

export const updateProduct = async (id, updates) => {
  const fields = [];
  const values = [];
  for (const key in updates) {
    fields.push(`${key} = ?`);
    values.push(updates[key]);
  }
  values.push(id);
  await pool.query(`UPDATE products SET ${fields.join(', ')} WHERE id = ?`, values);
};

export const deleteProduct = async (id) => {
  await pool.query('DELETE FROM products WHERE id = ?', [id]);
};

export const listProductsByVendor = async (vendor_id) => {
  const [rows] = await pool.query('SELECT * FROM products WHERE vendor_id = ?', [vendor_id]);
  return rows;
};

export const listAllProducts = async () => {
  const [rows] = await pool.query('SELECT * FROM products');
  return rows;
}; 