import { z } from 'zod';

export const departmentAssignSchema = z.object({
  id: z.number(),
  name: z.string(),
  parent_department: z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .nullable(),
});

export const departmentAssignArraySchema = z.array(departmentAssignSchema);

export type DepartmentAssign = z.infer<typeof departmentAssignSchema>;

export const createdepartmentAssignSchema = z.object({
  id: z.number(),
  name: z.string(),
  parent_department: z.object({
    id: z.number(),
    name: z.string(),
  }),
});

export type CreateDepartmentAssignSchema = z.infer<typeof createdepartmentAssignSchema>;

export const editDepartmentAssignSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Department name is required'),
  parent_department_id: z.coerce.number().nullable(),
});

export type EditDepartmentAssignInput = z.infer<typeof editDepartmentAssignSchema>;
