import * as z from 'zod';

export const QueryParams = z
  .object({
    page: z.coerce.number({ invalid_type_error: 'page must be a number' }).min(1, 'page param cannot be 0'),
    limit: z.coerce.number({ invalid_type_error: 'limit must be a number' }).min(2, 'limit param must be equal or greater than 2'),
    sort_by: z.enum(['asc', 'desc'], { errorMap: () => ({ message: 'sort_by param only accepts asc/desc as values' }) }),
    min_price: z.coerce.number({ invalid_type_error: 'min_price must be a number' }).min(1, 'min_price must be greater than 0'),
    max_price: z.coerce.number({ invalid_type_error: 'max_price must be a number' }).min(10, 'max_price must be greater than 9')
  })
  .partial()
  .strict('The query param entered is invalid, this endpoint only accepts page, limit, sort_by, max_price and min_price query params');

export type QueryParams = z.infer<typeof QueryParams>;
