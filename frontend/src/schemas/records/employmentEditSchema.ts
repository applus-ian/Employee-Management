import { z } from 'zod';

export const employmentEditSchema = z.object({
  job_position_id: z.number().min(1, 'Job position is required'),
  country_id: z.number().min(1, 'Country is required'),
  office_id: z.number().min(1, 'Office is required'),
  team_id: z.number().min(1, 'Team is required'),
  department_id: z.number().min(1, 'Department is required'),
  skills: z.array(z.number()).optional(),
  status_change: z
    .object({
      status: z.enum(['onboarding', 'account creation', 'active', 'terminated', 'inactive'] as const),
      remarks: z.string().min(1, 'Remarks are required for status changes').optional(),
    })
    .optional(),
});

export type EmploymentEditInput = z.infer<typeof employmentEditSchema>;
