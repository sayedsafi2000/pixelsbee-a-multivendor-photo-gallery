import express from 'express';
import multer from 'multer';
import { authenticate } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import { uploadImage, create, update, remove, listByVendor, listAll } from '../controllers/productController.js';

const router = express.Router();
const upload = multer();

// Public: list all products
router.get('/', listAll);

// Vendor: list own products
router.get('/my', authenticate, authorizeRoles('vendor'), listByVendor);

// Vendor: upload image to Cloudinary
router.post('/upload', authenticate, authorizeRoles('vendor'), upload.single('image'), uploadImage);

// Vendor: create product
router.post('/', authenticate, authorizeRoles('vendor'), create);

// Vendor/Admin: update product
router.put('/:id', authenticate, authorizeRoles('vendor', 'admin'), update);

// Vendor/Admin: delete product
router.delete('/:id', authenticate, authorizeRoles('vendor', 'admin'), remove);

export default router; 