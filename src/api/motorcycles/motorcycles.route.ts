import { Router } from 'express';
import * as MotorcyclesController from './motorcycles.controller';
import { validateRequest } from '../../middlewares';
import { Product } from '../../utils/types/product.types';

const router = Router();

router.get('/list', MotorcyclesController.getMotorcycles);
router.post('/add', validateRequest({ body: Product }), MotorcyclesController.postMotorcycles);

export default router;
