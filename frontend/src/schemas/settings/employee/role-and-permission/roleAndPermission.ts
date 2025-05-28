import { z } from 'zod';

export const permissionSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
});

export const roleWithPermissionsSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  permissions: z.array(permissionSchema),
});

export const rolesWithPermissionsArraySchema = z.array(roleWithPermissionsSchema);

export type RoleWithPermissions = z.infer<typeof roleWithPermissionsSchema>;

export const createRoleWithPermissionsSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  permission_ids: z.array(z.number()).optional(),
});

export type RoleWithPermissionsInput = z.infer<typeof createRoleWithPermissionsSchema>;

export const updateRoleWithPermissionsSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional(),
  permission_ids: z.array(z.number()).optional(),
});

export type RoleWithPermissionsUpdate = z.infer<typeof updateRoleWithPermissionsSchema>;
