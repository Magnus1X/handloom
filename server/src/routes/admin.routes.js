import express from 'express';
import { createProduct, updateProduct, deleteProduct } from '../controllers/products.controller.js';
import { getAllOrders, updateOrderStatus } from '../controllers/orders.controller.js';
import { upload, validateImages } from '../middleware/upload.middleware.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/products', authenticateToken, upload.array('images', 4), validateImages, createProduct);
router.put('/products/:id', authenticateToken, upload.array('images', 4), updateProduct);
router.delete('/products/:id', authenticateToken, deleteProduct);

router.get('/orders', authenticateToken, getAllOrders);
router.put('/orders/:id/status', authenticateToken, updateOrderStatus);

export default router;