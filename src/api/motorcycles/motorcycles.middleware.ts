import { NextFunction, Request, Response } from 'express';
import * as MotorcyclesModel from './motorcycles.model';

export async function motorcycleExist(req: Request, res: Response, next: NextFunction) {
  const { slug } = req.params;

  if (slug) {
    const motorcycle = await MotorcyclesModel.findOne(slug);
    if (motorcycle) {
      next();
    } else {
      res.status(404);
      next(`product with slug: ${slug}, does not exist`);
    }
  } else {
    const motorcycles = await MotorcyclesModel.findAll();
    if (motorcycles) {
      next();
    } else {
      res.status(404);
      next('there are no motocycles added');
    }
  }
}
