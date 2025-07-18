import { listVendors, updateUserStatus, getUserById } from '../models/userModel.js';
import { listAllProducts } from '../models/productModel.js';

export const getVendors = async (req, res) => {
  const vendors = await listVendors();
  res.json(vendors);
};

export const approveVendor = async (req, res) => {
  const { id } = req.params;
  const vendor = await getUserById(id);
  if (!vendor || vendor.role !== 'vendor') return res.status(404).json({ message: 'Vendor not found' });
  await updateUserStatus(id, 'approved');
  res.json({ message: 'Vendor approved' });
};

export const blockVendor = async (req, res) => {
  const { id } = req.params;
  const vendor = await getUserById(id);
  if (!vendor || vendor.role !== 'vendor') return res.status(404).json({ message: 'Vendor not found' });
  await updateUserStatus(id, 'blocked');
  res.json({ message: 'Vendor blocked' });
};

export const getAllProducts = async (req, res) => {
  const products = await listAllProducts();
  res.json(products);
}; 