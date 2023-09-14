import { WithId } from 'mongodb';
import * as z from 'zod';

export const Product = z.object({
  image: z.string({ required_error: 'image is required', invalid_type_error: 'image must be a string' }).url('image must be a valid url'),
  name: z.string({ required_error: 'name is required', invalid_type_error: 'name must be a string' }),
  price: z.number({ required_error: 'price is required', invalid_type_error: 'price must be a number' }),
  slug: z.string().optional()
});

export type Product = z.infer<typeof Product>;
// interface Products extends z.infer<typeof Product> {}
export type ProductFromDB = WithId<Product>;
export interface ProductResponse {
  products: ProductFromDB[];
  meta: { current_page: number; total_pages: number; total_products: number } | null;
}
