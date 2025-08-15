import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import { 
  getVendors, 
  getAllUsers, 
  getDashboardStats,
  approveVendor, 
  blockVendor, 
  blockUser, 
  unblockUser, 
  getAllProducts 
} from '../controllers/adminController.js';

const router = express.Router();

router.use(authenticate, authorizeRoles('admin'));

// Dashboard stats
router.get('/stats', getDashboardStats);

// Vendor management
router.get('/vendors', getVendors);
router.put('/vendors/:id/approve', approveVendor);
router.put('/vendors/:id/block', blockVendor);

// User management
router.get('/users', getAllUsers);
router.put('/users/:id/block', blockUser);
router.put('/users/:id/unblock', unblockUser);

// Products
router.get('/products', getAllProducts);

export default router; 