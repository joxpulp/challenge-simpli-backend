import { Router } from 'express';
import * as MotorcyclesController from './motorcycles.controller';
import { cacheMiddleware, validateRequest } from '../../middlewares';
import { Product } from '../../utils/types/product.types';
import { QueryParams } from '../../utils/types/query.types';
import { Params } from '../../utils/types/params.types';
import { motorcycleExist } from './motorcycles.middleware';

const router = Router();

router.get('/list/:slug?', validateRequest({ query: QueryParams, params: Params }), cacheMiddleware, motorcycleExist, MotorcyclesController.getMotorcycles);
router.post('/add', validateRequest({ body: Product }), MotorcyclesController.postMotorcycles);

export default router;
