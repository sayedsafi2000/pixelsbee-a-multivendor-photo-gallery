import express from 'express';
import authRoutes from './authRoutes.js';
import productRoutes from './productRoutes.js';
import adminRoutes from './adminRoutes.js';
import vendorRoutes from './vendorRoutes.js';
import userRoutes from './userRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/admin', adminRoutes);
router.use('/vendor', vendorRoutes);
router.use('/user', userRoutes);

export default router; 