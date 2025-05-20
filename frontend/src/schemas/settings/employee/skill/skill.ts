import { z } from 'zod';
import { skillCategorySchema } from './skill-category/skillCategory';

export const skillSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  skill_category: skillCategorySchema,
});

export const skillArraySchema = z.array(skillSchema);

export type Skill = z.infer<typeof skillSchema>;

export const employeeSkillSchema = z.object({
  employee_id: z.string(),
  skill: skillSchema,
  years_of_experience: z.number(),
});

export const employeeSkillArraySchema = z.array(employeeSkillSchema);

export type EmployeeSkill = z.infer<typeof employeeSkillSchema>;
