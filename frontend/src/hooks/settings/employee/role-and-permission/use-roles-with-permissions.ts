import { useQuery } from '@tanstack/react-query';
import { fetchAllRolesWithPermissions } from '@/utils/api/settings/employee/role-and-permission/fetchAllRoleAndPermissions';
import { RoleWithPermissions } from '@/types/settings/employee/roles-and-permission/roleAndPermission';

export const useRolesWithPermissions = () => {
  return useQuery<RoleWithPermissions[]>({
    queryKey: ['roles-with-permissions'],
    queryFn: fetchAllRolesWithPermissions,
  });
};
