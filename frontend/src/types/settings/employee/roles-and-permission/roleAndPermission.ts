export type Permission = {
  id: number;
  name: string;
  description: string;
};

export type RoleWithPermissions = {
  id: number;
  name: string;
  permissions: Permission[];
};
