import { NextFunction, Request, Response } from 'express';
import * as LeadsModel from './leads.model';
import { Lead, LeadFromDB } from '../../utils/types/lead.types';

export async function getLeads(req: Request<object, LeadFromDB[], Lead, object>, res: Response<LeadFromDB[]>, next: NextFunction) {
  try {
    const leads = await LeadsModel.findAll();
    res.json(leads);
  } catch (error) {
    next(error);
  }
}

export async function postLeads(req: Request<object, LeadFromDB, Lead, object>, res: Response<LeadFromDB>, next: NextFunction) {
  try {
    const leadAdded = await LeadsModel.insertOne(req.body);
    res.status(201).json(leadAdded);
  } catch (error) {
    next(error);
  }
}
