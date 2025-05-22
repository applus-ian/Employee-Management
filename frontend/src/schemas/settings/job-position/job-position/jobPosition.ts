import { z } from 'zod';

export const jobPositionSchema = z.object({
  id: z.number(),
  title: z.string(),
});

export const jobPositionArraySchema = z.array(jobPositionSchema);

export type JobPosition = z.infer<typeof jobPositionSchema>;
