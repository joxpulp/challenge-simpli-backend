import { Router } from 'express';
import * as AccessoriesController from './accessories.controller';
import { cacheMiddleware, validateRequest } from '../../middlewares';
import { Product } from '../../utils/types/product.types';
import { QueryParams } from '../../utils/types/query.types';
import { Params } from '../../utils/types/params.types';
import { accessoryExist } from './accessories.middleware';

const router = Router();

router.get('/list/:slug?', validateRequest({ query: QueryParams, params: Params }), cacheMiddleware, accessoryExist, AccessoriesController.getAccessories);
router.post('/add', validateRequest({ body: Product }), AccessoriesController.postAccessories);

export default router;
