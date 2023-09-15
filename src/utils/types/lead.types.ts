import { WithId } from 'mongodb';
import * as z from 'zod';

export const Lead = z
  .object({
    name: z.string({ required_error: 'name is required', invalid_type_error: 'name must be a string' }).min(3, 'name must have at least 3 characters'),
    lastname: z.string({ required_error: 'lastname is required', invalid_type_error: 'lastname must be a string' }).min(3, 'lastname must have at least 3 characters'),
    email: z.string({ required_error: 'email is required', invalid_type_error: 'email must be a string' }).email('email is invalid'),
    phone: z.string({ required_error: 'phone is required' }).min(10, 'phone must have at least 10 characters'),
    product_name: z.string({ required_error: 'product_name is required', invalid_type_error: 'product_name must be a string' }),
    product_id: z.string({ required_error: 'product_id is required', invalid_type_error: 'product_id must be a string' })
  })
  .strict('the property you are trying to add in the body is not valid, this endpoint only accepts: name, lastname, email, phone, product_name and product_id');

export type Lead = z.infer<typeof Lead>;
export type LeadFromDB = WithId<Lead>;
