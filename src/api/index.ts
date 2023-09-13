import { Router } from 'express';
import motorcycleRouter from './motorcycles/motorcycles.route';

const router = Router();

router.use('/motorcycles', motorcycleRouter);

export default router;
