import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { getUserById } from '../models/userModel.js';
import { updateProfile } from '../controllers/vendorController.js';

const router = express.Router();

router.use(authenticate);

router.get('/profile', async (req, res) => {
  const user = await getUserById(req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ id: user.id, name: user.name, email: user.email, role: user.role, profile_pic_url: user.profile_pic_url });
});

router.put('/profile', updateProfile);

export default router; 