import { NextFunction, Request, Response } from 'express';
import * as MotorcyclesModel from './motorcycles.model';
import { Product, ProductFromDB, ProductResponse } from '../../utils/types/product.types';
import { QueryParams } from '../../utils/types/query.types';
import { SortDirection } from 'mongodb';

export async function getMotorcycles(req: Request, res: Response<ProductResponse | ProductFromDB>) {
  const { page, limit, sort_by } = req.query as QueryParams;
  const { slug } = req.params;
  if (slug) {
    const motorcycle = await MotorcyclesModel.findOne(slug);
    res.json(motorcycle as ProductFromDB);
  } else {
    const motorcycles = await MotorcyclesModel.findAll(page, limit, sort_by as SortDirection);
    res.json(motorcycles);
  }
}

export async function postMotorcycles(req: Request<object, ProductFromDB, Product>, res: Response, next: NextFunction) {
  try {
    const motorcycleAdded = await MotorcyclesModel.insertOne(req.body);
    res.json(motorcycleAdded);
  } catch (error) {
    next(error);
  }
}
