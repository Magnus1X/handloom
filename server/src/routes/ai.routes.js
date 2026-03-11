import express from 'express';
import { getFunFact } from '../controllers/ai.controller.js';

const router = express.Router();

router.get('/fun-fact', getFunFact);

export default router;
