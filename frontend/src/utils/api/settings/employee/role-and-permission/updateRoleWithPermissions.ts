import api from '@/utils/api/apiInstance';
import { RoleWithPermissionsUpdate } from '@/schemas/settings/employee/role-and-permission/roleAndPermission';

export const updateRole = async (data: RoleWithPermissionsUpdate) => {
  const response = await api.put(`/roles/update/${data.id}`, data);
  return response.data;
};
