import pool from '../config/db.js';

export const createProduct = async (product) => {
  const { vendor_id, title, description, price, category, image_url, original_url } = product;
  const [result] = await pool.query(
    'INSERT INTO products (vendor_id, title, description, price, category, image_url, original_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [vendor_id, title, description, price, category, image_url, original_url]
  );
  return { id: result.insertId, ...product };
};

export const getProductById = async (id) => {
  const [rows] = await pool.query(`
    SELECT p.*, u.name as vendor_name 
    FROM products p 
    LEFT JOIN users u ON p.vendor_id = u.id 
    WHERE p.id = ? AND p.status = 'active'
  `, [id]);
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
  const [rows] = await pool.query(`
    SELECT p.*, u.name as vendor_name 
    FROM products p 
    LEFT JOIN users u ON p.vendor_id = u.id 
    WHERE p.status = 'active'
    ORDER BY p.created_at DESC
  `);
  return rows;
};

export const searchProducts = async (query) => {
  const searchTerm = `%${query}%`;
  const [rows] = await pool.query(`
    SELECT p.*, u.name as vendor_name 
    FROM products p 
    LEFT JOIN users u ON p.vendor_id = u.id 
    WHERE (p.title LIKE ? OR p.description LIKE ?) AND p.status = 'active'
    ORDER BY p.created_at DESC
  `, [searchTerm, searchTerm]);
  return rows;
};

export const getAllCategories = async () => {
  const [rows] = await pool.query(`
    SELECT DISTINCT category 
    FROM products 
    WHERE category IS NOT NULL AND category != '' AND status = 'active'
    ORDER BY category ASC
  `);
  return rows.map(row => row.category);
}; 