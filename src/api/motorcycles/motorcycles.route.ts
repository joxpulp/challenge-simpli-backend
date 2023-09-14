import { Router } from 'express';
import * as MotorcyclesController from './motorcycles.controller';
import { validateRequest } from '../../middlewares';
import { Product } from '../../utils/types/product.types';
import { QueryParams } from '../../utils/types/query.types';

const router = Router();

router.get('/list', validateRequest({ query: QueryParams }), MotorcyclesController.getMotorcycles);
router.post('/add', validateRequest({ body: Product }), MotorcyclesController.postMotorcycles);

export default router;
