import { z } from 'zod';
import {
  countryAssignSchema,
  departmentAssignSchema,
  jobPositionSchema,
  officeAssignSchema,
  teamAssignSchema,
} from '@/schemas';
import { employeeSchema } from '@/schemas/userSchema';

export const locationAssignmentSchema = z.object({
  id: z.number(),
  job_position: z.nullable(jobPositionSchema),
  country_assign: z.nullable(countryAssignSchema),
  office_assign: z.nullable(officeAssignSchema),
  team_assign: z.nullable(teamAssignSchema),
  department_assign: z.nullable(departmentAssignSchema),
  employee: employeeSchema,
});

export const locationAssignmentArraySchema = z.array(locationAssignmentSchema);

export type LocationAssignment = z.infer<typeof locationAssignmentSchema>;

export const createLocationAssignmentInput = z.object({
  job_position_id: z.number(),
  country_assign_id: z.number().nullable().optional(),
  office_assign_id: z.number().nullable().optional(),
  team_assign_id: z.number().nullable().optional(),
  department_assign_id: z.number().nullable().optional(),
  employee_id: z.number(),
});

export type CreateLocationAssignment = z.infer<typeof createLocationAssignmentInput>;

export const updateLocationAssignmentInput = z.object({
  id: z.number(),
  job_position_id: z.number(),
  country_assign_id: z.number().nullable().optional(),
  office_assign_id: z.number().nullable().optional(),
  team_assign_id: z.number().nullable().optional(),
  department_assign_id: z.number().nullable().optional(),
  employee_id: z.number(),
});

export type UpdateLocationAssignment = z.infer<typeof updateLocationAssignmentInput>;
