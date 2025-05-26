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

export const createLocationAssignmentInput = z.object({
  job_position_id: z.number(),
  country_assign_id: z
    .string()
    .transform((val) => (val === '' ? null : Number(val)))
    .refine((val) => val === null || !isNaN(val), {
      message: 'Invalid country',
    }),
  office_assign_id: z
    .string()
    .transform((val) => (val === '' ? null : Number(val)))
    .refine((val) => val === null || !isNaN(val), {
      message: 'Invalid office',
    }),
  team_assign_id: z
    .string()
    .transform((val) => (val === '' ? null : Number(val)))
    .refine((val) => val === null || !isNaN(val), {
      message: 'Invalid team',
    }),
  department_assign_id: z
    .string()
    .transform((val) => (val === '' ? null : Number(val)))
    .refine((val) => val === null || !isNaN(val), {
      message: 'Invalid department',
    }),
  employee_id: z.string(),
});

export type CreateLocationAssignment = z.infer<typeof createLocationAssignmentInput>;

export const updateLocationAssignmentInput = z.object({
  id: z.number(),
  job_position_id: z.number(),
  country_assign_id: z
    .string()
    .transform((val) => (val === '' ? null : Number(val)))
    .refine((val) => val === null || !isNaN(val), {
      message: 'Invalid country',
    }),
  office_assign_id: z
    .string()
    .transform((val) => (val === '' ? null : Number(val)))
    .refine((val) => val === null || !isNaN(val), {
      message: 'Invalid office',
    }),
  team_assign_id: z
    .string()
    .transform((val) => (val === '' ? null : Number(val)))
    .refine((val) => val === null || !isNaN(val), {
      message: 'Invalid team',
    }),
  department_assign_id: z
    .string()
    .transform((val) => (val === '' ? null : Number(val)))
    .refine((val) => val === null || !isNaN(val), {
      message: 'Invalid department',
    }),
  employee_id: z.string(),
});

export type UpdateLocationAssignment = z.infer<typeof updateLocationAssignmentInput>;
