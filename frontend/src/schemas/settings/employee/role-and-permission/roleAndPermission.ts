import { z } from 'zod';

export const permissionSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
});

export const roleWithPermissionsSchema = z.object({
  id: z.number(),
  name: z.string(),
  permissions: z.array(permissionSchema),
});

export const rolesWithPermissionsArraySchema = z.array(roleWithPermissionsSchema);

export type RoleWithPermissions = z.infer<typeof roleWithPermissionsSchema>;
