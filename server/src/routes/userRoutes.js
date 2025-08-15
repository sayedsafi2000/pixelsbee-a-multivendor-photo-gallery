import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { getUserById, getUserStats, getVendorStats, getPlatformStats, getCart, addToCart, removeFromCart, clearCart } from '../models/userModel.js';
import { updateProfile, changePassword } from '../controllers/vendorController.js';
import { 
  getFavorites, 
  addFavorite, 
  removeFavorite, 
  checkFavorite,
  getDownloads,
  addDownload
} from '../controllers/userController.js';

const router = express.Router();

router.use(authenticate);

router.get('/profile', async (req, res) => {
  const user = await getUserById(req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ id: user.id, name: user.name, email: user.email, role: user.role, profile_pic_url: user.profile_pic_url });
});

router.put('/profile', updateProfile);

// Password change endpoint
router.post('/change-password', changePassword);

// Stats endpoints
router.get('/stats', async (req, res) => {
  try {
    const stats = await getUserStats(req.user.id);
    res.json(stats);
  } catch (error) {
    console.error('Error getting user stats:', error);
    res.status(500).json({ message: 'Failed to fetch user stats' });
  }
});

router.get('/vendor-stats', async (req, res) => {
  try {
    if (req.user.role !== 'vendor') {
      return res.status(403).json({ message: 'Access denied. Vendor role required.' });
    }
    const stats = await getVendorStats(req.user.id);
    res.json(stats);
  } catch (error) {
    console.error('Error getting vendor stats:', error);
    res.status(500).json({ message: 'Failed to fetch vendor stats' });
  }
});

router.get('/platform-stats', async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin role required.' });
    }
    const stats = await getPlatformStats();
    res.json(stats);
  } catch (error) {
    console.error('Error getting platform stats:', error);
    res.status(500).json({ message: 'Failed to fetch platform stats' });
  }
});

// Favorites routes
router.get('/favorites', getFavorites);
router.post('/favorites', addFavorite);
router.delete('/favorites/:imageId', removeFavorite);
router.get('/favorites/:imageId/check', checkFavorite);

// Downloads routes
router.get('/downloads', getDownloads);
router.post('/downloads', addDownload);

// Cart routes
router.get('/cart', async (req, res) => {
  try {
    const cart = await getCart(req.user.id);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch cart' });
  }
});

router.post('/cart/add', async (req, res) => {
  const { productId, quantity } = req.body;
  if (!productId) return res.status(400).json({ message: 'Product ID required' });
  try {
    await addToCart(req.user.id, productId, quantity || 1);
    res.json({ message: 'Added to cart' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add to cart' });
  }
});

router.post('/cart/remove', async (req, res) => {
  const { productId } = req.body;
  if (!productId) return res.status(400).json({ message: 'Product ID required' });
  try {
    await removeFromCart(req.user.id, productId);
    res.json({ message: 'Removed from cart' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove from cart' });
  }
});

router.post('/cart/clear', async (req, res) => {
  try {
    await clearCart(req.user.id);
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to clear cart' });
  }
});

export default router; 