export type Permission = {
  id: number;
  name: string;
  description: string;
};

export type RoleWithPermissions = {
  id: number;
  name: string;
  description: string;
  permissions: Permission[];
};

export type CreateRoleWithPermissions = {
  name: string;
  permissions: Permission[] | null;
};
