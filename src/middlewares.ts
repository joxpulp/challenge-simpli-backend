import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { ValidateData } from './utils/types/validateRequest.types';

export function validateRequest(validateData: ValidateData) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (validateData.body) {
        req.body = await validateData.body.parseAsync(req.body);
      }
      if (validateData.query) {
        req.query = await validateData.query.parseAsync(req.query);
      }
      if (validateData.params) {
        req.params = await validateData.params.parseAsync(req.params);
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(422);
        next(error.errors[0].message);
      }
    }
  };
}

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  next(`The route ${req.originalUrl} does not exist`);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err
  });
}
