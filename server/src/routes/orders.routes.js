import express from 'express';
import { createOrder, getUserOrders, getOrder } from '../controllers/orders.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(authenticate);

router.post('/', createOrder);
router.get('/', getUserOrders);
router.get('/:id', getOrder);

export default router;