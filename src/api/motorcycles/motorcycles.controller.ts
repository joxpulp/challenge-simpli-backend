import { Request, Response } from 'express';
import * as MotorcyclesModel from './motorcycles.model';
import { Product, ProductResponse } from '../../utils/types/product.types';
import { ZodError } from 'zod';

export async function getMotorcycles(req: Request, res: Response<ProductResponse[]>) {
  const motorcycles = await MotorcyclesModel.findAll();
  res.json(motorcycles);
}

export async function postMotorcycles(req: Request<object, ProductResponse, Product>, res: Response) {
  try {
    const body = req.body;
    const validateMotorcycleData = await Product.parseAsync(body);
    const motorcycleAdded = await MotorcyclesModel.insertOne(validateMotorcycleData);
    res.json(motorcycleAdded);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(422);
    }
    res.json(error);
  }
}
