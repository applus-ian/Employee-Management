import { z } from 'zod';

export const projectSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  start_date: z.string(),
  end_date: z.string(),
  employees: z
    .array(
      z.object({
        id: z.string().min(1, 'Employee ID is required'),
        profile: z.string().nullable(),
        full_name: z.string().min(1, 'Full name is required'),
        job_position: z.string().min(1, 'Job position is required'),
        department: z.string().min(1, 'Department is required'),
        project_role_id: z.number().min(1, 'Employee project role is required'),
      }),
    )
    .optional(),
});

export const projectArraySchema = z.array(projectSchema);

export type Project = z.infer<typeof projectSchema>;

export const createProjectSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  description: z.string().min(1, 'Description is required'),
  employees: z
    .array(
      z.object({
        id: z.string().min(1, 'Employee ID is required'),
        project_role_id: z.number().min(1, 'Employee project role is required'),
      }),
    )
    .min(1, 'At least one employee must be assigned'),
  start_date: z.string().min(1, 'Start date is required'),
  end_date: z.string().min(1, 'End date is required'),
});

export type CreateProjectSchema = z.infer<typeof createProjectSchema>;
