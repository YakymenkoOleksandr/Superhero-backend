import { Router } from 'express';
import superherosRouter from './superheros.js';
import authRouter from './auth.js';

const router = Router();

router.use('/superheros', superherosRouter);
router.use('/auth', authRouter);

export default router;
