import { z } from 'zod';

export const employmentTypeSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const employmentTypeArraySchema = z.array(employmentTypeSchema);

export type EmploymentType = z.infer<typeof employmentTypeSchema>;
