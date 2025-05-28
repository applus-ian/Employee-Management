import { z } from 'zod';
import { jobPositionSchema } from '@/schemas';

export const locationAssignmentSchema = z.object({
  id: z.number(),
  job_position: jobPositionSchema,
  country_assign: z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .nullable()
    .optional(),
  office_assign: z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .nullable()
    .optional(),
  team_assign: z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .nullable()
    .optional(),
  department_assign: z
    .object({
      id: z.number(),
      name: z.string(),
      parent_department: z
        .object({
          id: z.number(),
          name: z.string(),
        })
        .nullable()
        .optional(),
    })
    .nullable()
    .optional(),
  employee: z.object({
    id: z.string(),
    first_name: z.string(),
    last_name: z.string(),
  }),
});

export const locationAssignmentArraySchema = z.array(locationAssignmentSchema);

export type LocationAssignment = z.infer<typeof locationAssignmentSchema>;

export const createLocationAssignmentSchema = z.object({
  job_position_id: z.number(),
  country_assign_id: z.coerce.number().nullable(),
  office_assign_id: z.coerce.number().nullable(),
  team_assign_id: z.coerce.number().nullable(),
  department_assign_id: z.coerce.number().nullable(),
  employee_id: z.string(),
});

export type CreateLocationAssignmentInput = z.infer<typeof createLocationAssignmentSchema>;

export const updateLocationAssignmentSchema = z.object({
  id: z.number(),
  job_position_id: z.number(),
  country_assign_id: z.coerce.number().nullable(),
  office_assign_id: z.coerce.number().nullable(),
  team_assign_id: z.coerce.number().nullable(),
  department_assign_id: z.coerce.number().nullable(),
  employee_id: z.string(),
});

export type UpdateLocationAssignmentInput = z.infer<typeof updateLocationAssignmentSchema>;
