import { z } from 'zod';

export const skillCategorySchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const skillCategoryArraySchema = z.array(skillCategorySchema);

export type SkillCategory = z.infer<typeof skillCategorySchema>;
