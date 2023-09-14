import { WithId } from 'mongodb';
import * as z from 'zod';

export const Product = z
  .object({
    image: z.string({ required_error: 'image is required', invalid_type_error: 'image must be a string' }).url('image must be a valid url'),
    name: z.string({ required_error: 'name is required', invalid_type_error: 'name must be a string' }),
    description: z.string({ required_error: 'description is required' }).min(10, 'description must be have at least 10 characters'),
    price: z.number({ required_error: 'price is required', invalid_type_error: 'price must be a number' }),
    currency: z.string({ required_error: 'currency is required' }),
    slug: z.string().optional()
  })
  .strict('the property you are trying to add in the body is not valid, this endpoint only accepts: image, name, description, price and currency');

export type Product = z.infer<typeof Product>;
export type ProductFromDB = WithId<Product>;
export interface ProductResponse {
  products: ProductFromDB[];
  meta: { current_page: number; total_pages: number; total_products: number } | null;
}
