import { z } from 'zod';

export const countryAssignSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const countryAssignArraySchema = z.array(countryAssignSchema);

export type CountryAssign = z.infer<typeof countryAssignSchema>;
