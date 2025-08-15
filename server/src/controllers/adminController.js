import { listVendors, updateUserStatus, getUserById, getAllUsers as getAllUsersModel, getUserStats } from '../models/userModel.js';
import { listAllProducts } from '../models/productModel.js';

// Get all vendors with their status
export const getVendors = async (req, res) => {
  try {
    const vendors = await listVendors();
    res.json(vendors);
  } catch (error) {
    console.error('Error fetching vendors:', error);
    res.status(500).json({ message: 'Error fetching vendors' });
  }
};

// Get all users (for admin management)
export const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersModel();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
};

// Get admin dashboard stats
export const getDashboardStats = async (req, res) => {
  try {
    const stats = await getUserStats();
    res.json(stats);
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ message: 'Error fetching dashboard stats' });
  }
};

// Approve vendor
export const approveVendor = async (req, res) => {
  try {
    const { id } = req.params;
    const vendor = await getUserById(id);
    if (!vendor || vendor.role !== 'vendor') {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    await updateUserStatus(id, 'approved');
    res.json({ message: 'Vendor approved successfully' });
  } catch (error) {
    console.error('Error approving vendor:', error);
    res.status(500).json({ message: 'Error approving vendor' });
  }
};

// Block vendor
export const blockVendor = async (req, res) => {
  try {
    const { id } = req.params;
    const vendor = await getUserById(id);
    if (!vendor || vendor.role !== 'vendor') {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    await updateUserStatus(id, 'blocked');
    res.json({ message: 'Vendor blocked successfully' });
  } catch (error) {
    console.error('Error blocking vendor:', error);
    res.status(500).json({ message: 'Error blocking vendor' });
  }
};

// Block any user
export const blockUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.role === 'admin') {
      return res.status(403).json({ message: 'Cannot block admin users' });
    }
    await updateUserStatus(id, 'blocked');
    res.json({ message: 'User blocked successfully' });
  } catch (error) {
    console.error('Error blocking user:', error);
    res.status(500).json({ message: 'Error blocking user' });
  }
};

// Unblock user
export const unblockUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await updateUserStatus(id, 'approved');
    res.json({ message: 'User unblocked successfully' });
  } catch (error) {
    console.error('Error unblocking user:', error);
    res.status(500).json({ message: 'Error unblocking user' });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await listAllProducts();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
}; 