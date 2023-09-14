import { AnyZodObject } from 'zod';

export interface ValidateData {
  body?: AnyZodObject;
  query?: AnyZodObject;
  params?: AnyZodObject;
}
