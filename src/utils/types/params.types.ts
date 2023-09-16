import * as z from 'zod';

export const Params = z.object({
  slug: z.string().optional(),
  id: z.string().optional()
});

export type Params = z.infer<typeof Params>;
