import { NextFunction, Request, Response } from 'express';
import * as LeadsModel from './leads.model';
import { Lead, LeadFromDB } from '../../utils/types/lead.types';
import { Params } from '../../utils/types/params.types';

export async function getLeads(req: Request<Params, LeadFromDB[] | LeadFromDB, Lead, object>, res: Response<LeadFromDB[] | LeadFromDB>) {
  const { id } = req.params;

  if (id) {
    const lead = await LeadsModel.findOne(id);
    res.json(lead as LeadFromDB);
  } else {
    const leads = await LeadsModel.findAll();
    res.json(leads);
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
