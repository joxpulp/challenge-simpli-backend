import { NextFunction, Request, Response } from 'express';
import * as MotorcyclesModel from './motorcycles.model';
import { Product, ProductFromDB, ProductResponse } from '../../utils/types/product.types';

export async function getMotorcycles(req: Request, res: Response<ProductResponse>) {
  const page = parseInt(req.query.page as string) || 0;
  const limit = parseInt(req.query.limit as string) || 0;
  const motorcycles = await MotorcyclesModel.findAll(page, limit);
  res.json(motorcycles);
}

export async function postMotorcycles(req: Request<object, ProductFromDB, Product>, res: Response, next: NextFunction) {
  try {
    const motorcycleAdded = await MotorcyclesModel.insertOne(req.body);
    res.json(motorcycleAdded);
  } catch (error) {
    next(error);
  }
}
