import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import { getVendors, approveVendor, blockVendor, getAllProducts } from '../controllers/adminController.js';

const router = express.Router();

router.use(authenticate, authorizeRoles('admin'));

router.get('/vendors', getVendors);
router.put('/vendors/:id/approve', approveVendor);
router.put('/vendors/:id/block', blockVendor);
router.get('/products', getAllProducts);

export default router; 