import { z } from 'zod';

export const employmentStatusHistorySchema = z.object({
  employee_id: z.string(),
  status_set: z.string(),
  effective_date: z.string(),
  remarks: z.string().optional(),
});
