import { RoleWithPermissionsInput } from '@/schemas/settings/employee/role-and-permission/roleAndPermission';
import api from '@/utils/api/apiInstance';

export const createRoleWithPermissions = async (data: RoleWithPermissionsInput) => {
  const response = await api.post('/roles/new', data);
  return response.data;
};

export const updateRoleWithPermissions = async (id: number, data: RoleWithPermissionsInput) => {
  const response = await api.put(`/roles/${id}`, data);
  return response.data;
};
