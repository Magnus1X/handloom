import express from 'express';
import { getProfile, updateProfile, addAddress, updateAddress, deleteAddress, getAddresses } from '../controllers/profile.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', authenticateToken, getProfile);
router.put('/', authenticateToken, updateProfile);
router.get('/addresses', authenticateToken, getAddresses);
router.post('/addresses', authenticateToken, addAddress);
router.put('/addresses/:addressId', authenticateToken, updateAddress);
router.delete('/addresses/:addressId', authenticateToken, deleteAddress);

export default router;