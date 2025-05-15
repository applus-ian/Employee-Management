import { z } from 'zod';

export const teamAssignSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const teamAssignArraySchema = z.array(teamAssignSchema);

export type TeamAssign = z.infer<typeof teamAssignSchema>;
