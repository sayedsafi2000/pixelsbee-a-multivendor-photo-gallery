import pool from '../config/db.js';

export const createOrder = async ({ user_id, product_id, vendor_id, price, status = 'paid' }) => {
  const [result] = await pool.query(
    'INSERT INTO orders (user_id, product_id, vendor_id, price, status) VALUES (?, ?, ?, ?, ?)',
    [user_id, product_id, vendor_id, price, status]
  );
  return { id: result.insertId, user_id, product_id, vendor_id, price, status };
};

export const getOrderStats = async () => {
  const [totalSales] = await pool.query('SELECT COUNT(*) as count FROM orders WHERE status = "paid"');
  const [totalRevenue] = await pool.query('SELECT SUM(price) as revenue FROM orders WHERE status = "paid"');
  const [salesByMonth] = await pool.query(`
    SELECT DATE_FORMAT(created_at, '%Y-%m') as month, COUNT(*) as sales, SUM(price) as revenue
    FROM orders WHERE status = "paid"
    GROUP BY month ORDER BY month DESC LIMIT 12
  `);
  const [topProducts] = await pool.query(`
    SELECT p.title, COUNT(*) as sales, SUM(o.price) as revenue
    FROM orders o
    JOIN products p ON o.product_id = p.id
    WHERE o.status = "paid"
    GROUP BY o.product_id
    ORDER BY sales DESC
    LIMIT 5
  `);
  return {
    totalSales: totalSales[0]?.count || 0,
    totalRevenue: totalRevenue[0]?.revenue || 0,
    salesByMonth,
    topProducts
  };
};