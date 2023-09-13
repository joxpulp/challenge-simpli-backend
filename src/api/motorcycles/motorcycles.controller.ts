import { NextFunction, Request, Response } from 'express';
import * as MotorcyclesModel from './motorcycles.model';
import { Product, ProductResponse } from '../../utils/types/product.types';

export async function getMotorcycles(req: Request, res: Response<ProductResponse[]>) {
  const motorcycles = await MotorcyclesModel.findAll();
  res.json(motorcycles);
}

export async function postMotorcycles(req: Request<object, ProductResponse, Product>, res: Response, next: NextFunction) {
  try {
    const motorcycleAdded = await MotorcyclesModel.insertOne(req.body);
    res.json(motorcycleAdded);
  } catch (error) {
    next(error);
  }
}
