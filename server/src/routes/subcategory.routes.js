import express from 'express';
import { getSubcategories, createSubcategory, updateSubcategory, deleteSubcategory } from '../controllers/subcategory.controller.js';
import { upload } from '../middleware/upload.middleware.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getSubcategories);
router.post('/', authenticateToken, upload.single('image'), createSubcategory);
router.put('/:id', authenticateToken, upload.single('image'), updateSubcategory);
router.delete('/:id', authenticateToken, deleteSubcategory);

export default router;