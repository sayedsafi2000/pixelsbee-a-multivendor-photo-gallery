import { createOrder, getOrderStats } from '../models/orderModel.js';

export const create = async (req, res) => {
  try {
    const { user_id, product_id, vendor_id, price } = req.body;
    const order = await createOrder({ user_id, product_id, vendor_id, price, status: 'paid' });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order', error: error.message });
  }
};

export const analytics = async (req, res) => {
  try {
    const stats = await getOrderStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch analytics', error: error.message });
  }
};