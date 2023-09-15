import { Router } from 'express';
import motorcycleRouter from './motorcycles/motorcycles.route';
import accessoryRouter from './accessories/accessories.route';
import leadRouter from './leads/leads.route';

const router = Router();

router.use('/motorcycles', motorcycleRouter);
router.use('/accessories', accessoryRouter);
router.use('/leads', leadRouter);

export default router;
