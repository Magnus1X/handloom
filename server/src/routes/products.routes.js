import express from 'express';
import { getProducts, getProduct, getCategoriesList, createProduct, updateProduct, deleteProduct } from '../controllers/products.controller.js';
import { upload, validateImages } from '../middleware/upload.middleware.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/categories', getCategoriesList);
router.get('/:id', getProduct);
router.post('/', authenticateToken, upload.array('images', 4), validateImages, createProduct);
router.put('/:id', authenticateToken, upload.array('images', 4), updateProduct);
router.delete('/:id', authenticateToken, deleteProduct);

export default router;