import * as z from 'zod';

export const QueryParams = z
  .object({
    page: z.coerce.number().min(1, 'page param cannot be 0').optional(),
    limit: z.coerce.number().min(2, 'limit param must be equal or greater than 2').optional(),
    sort_by: z.enum(['asc', 'desc'], { errorMap: () => ({ message: 'sort_by param only accepts asc/desc as values' }) }).optional()
  })
  .strict('The query param entered is invalid, this endpoint only accepts page and limit query params');

export type QueryParams = z.infer<typeof QueryParams>;
