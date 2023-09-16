import { NextFunction, Request, Response } from 'express';
import * as LeadsModel from './leads.model';

export async function leadExist(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  if (id) {
    const lead = await LeadsModel.findOne(id);
    if (lead) {
      next();
    } else {
      res.status(404);
      next(`lead with id: ${id}, does not exist`);
    }
  } else {
    const leads = await LeadsModel.findAll();
    if (leads.length) {
      next();
    } else {
      res.status(404);
      next('there are no leads added');
    }
  }
}
