import { z } from 'zod';

export const projectRoleSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const projectRoleArraySchema = z.array(projectRoleSchema);

export type ProjectRole = z.infer<typeof projectRoleSchema>;
