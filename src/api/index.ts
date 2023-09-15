import { Router } from 'express';
import motorcycleRouter from './motorcycles/motorcycles.route';
import accessoryRouter from './accessories/accessories.route';

const router = Router();

router.use('/motorcycles', motorcycleRouter);
router.use('/accessories', accessoryRouter);

export default router;
