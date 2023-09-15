import { Router } from 'express';
import * as LeadsController from './leads.controller';
import { validateRequest } from '../../middlewares';
import { Lead } from '../../utils/types/lead.types';

const router = Router();

router.get('/list', LeadsController.getLeads);
router.post('/add', validateRequest({ body: Lead }), LeadsController.postLeads);

export default router;
