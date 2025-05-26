import api from '@/utils/api/apiInstance';
import { RoleWithPermissions } from '@/types/settings/employee/roles-and-permission/roleAndPermission';

export const fetchAllRolesWithPermissions = async (): Promise<RoleWithPermissions[]> => {
  const response = await api.get('/roles/all-roles-with-permissions');
  return response.data;
};
