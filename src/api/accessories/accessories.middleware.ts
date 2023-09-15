import { NextFunction, Request, Response } from 'express';
import * as AccesoriesModel from './accessories.model';

export async function accessoryExist(req: Request, res: Response, next: NextFunction) {
  const { slug } = req.params;

  if (slug) {
    const accessory = await AccesoriesModel.findOne(slug);
    if (accessory) {
      next();
    } else {
      res.status(404);
      next(`product with slug: ${slug}, does not exist`);
    }
  } else {
    const accessories = await AccesoriesModel.findAll();
    if (accessories.products.length) {
      next();
    } else {
      res.status(404);
      next('there are no accessories added');
    }
  }
}
