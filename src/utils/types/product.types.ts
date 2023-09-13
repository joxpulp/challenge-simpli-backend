import { WithId } from 'mongodb';
import * as z from 'zod';

export const Product = z.object({
  image: z.string({ required_error: 'Image is required' }),
  name: z.string({ required_error: 'Name is required' }),
  price: z.number({ required_error: 'Price is required' }),
  slug: z.string().optional()
});

export type Product = z.infer<typeof Product>;
export type ProductResponse = WithId<Product>;
