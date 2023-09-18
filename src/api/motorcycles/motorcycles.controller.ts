import { NextFunction, Request, Response } from 'express';
import * as MotorcyclesModel from './motorcycles.model';
import { Product, ProductFromDB, ProductResponse } from '../../utils/types/product.types';
import { QueryParams } from '../../utils/types/query.types';
import { SortDirection } from 'mongodb';
import { Params } from '../../utils/types/params.types';
import { client } from '../../services/redis/redis';

export async function getMotorcycles(req: Request<Params, ProductResponse | ProductFromDB | null, Product, QueryParams>, res: Response<ProductResponse | ProductFromDB | null>) {
  const { page, limit, sort_by, min_price, max_price } = req.query;
  const { slug } = req.params;

  if (slug) {
    const motorcycle = await MotorcyclesModel.findOne(slug);
    client.setEx(req.originalUrl, 120, JSON.stringify(motorcycle));
    res.json(motorcycle);
  } else {
    const motorcycles = await MotorcyclesModel.findAll(page, limit, sort_by as SortDirection, min_price, max_price);
    client.setEx(req.originalUrl, 120, JSON.stringify(motorcycles));
    res.json(motorcycles);
  }
}

export async function postMotorcycles(req: Request<Params, ProductResponse | ProductFromDB, Product, QueryParams>, res: Response<ProductFromDB>, next: NextFunction) {
  try {
    const motorcycleAdded = await MotorcyclesModel.insertOne(req.body);
    res.status(201).json(motorcycleAdded);
  } catch (error) {
    next(error);
  }
}
