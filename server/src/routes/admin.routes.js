import express from 'express';
import { createProduct, updateProduct, deleteProduct } from '../controllers/products.controller.js';
import { upload, validateImages } from '../middleware/upload.middleware.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/products', authenticateToken, upload.array('images', 4), validateImages, createProduct);
router.put('/products/:id', authenticateToken, upload.array('images', 4), updateProduct);
router.delete('/products/:id', authenticateToken, deleteProduct);

export default router;