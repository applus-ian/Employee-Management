import api from '@/utils/api/apiInstance';
import { Permission } from '@/types/settings/employee/roles-and-permission/roleAndPermission';

export const fetchAllPermissions = async (): Promise<Permission[]> => {
  const response = await api.get('/roles/all-permissions');
  return response.data;
};
