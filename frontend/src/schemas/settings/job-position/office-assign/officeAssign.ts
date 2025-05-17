import { z } from 'zod';

export const officeAssignSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const officeAssignArraySchema = z.array(officeAssignSchema);

export type OfficeAssign = z.infer<typeof officeAssignSchema>;
