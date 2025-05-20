import { z } from 'zod';

export const departmentAssignSchema = z.object({
  id: z.number(),
  name: z.string(),
  parent_department: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
      }),
    )
    .optional(),
});

export const departmentAssignArraySchema = z.array(departmentAssignSchema);

export type DepartmentAssign = z.infer<typeof departmentAssignSchema>;

export const createdepartmentAssignSchema = z.object({
  id: z.number(),
  name: z.string(),
  parent_department: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
      }),
    )
    .optional(),
});

export type CreateDepartmentAssignSchema = z.infer<typeof createdepartmentAssignSchema>;
