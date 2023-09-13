import { Router } from 'express';
import * as MotorcyclesController from './motorcycles.controller';

const router = Router();

router.get('/list', MotorcyclesController.getMotorcycles);
router.post('/add', MotorcyclesController.postMotorcycles);

export default router;
