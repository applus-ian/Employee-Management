import { useQuery } from '@tanstack/react-query';
import { fetchAllPermissions } from '@/utils/api/settings/employee/role-and-permission/fetchAllPermissions';
import { Permission } from '@/types/settings/employee/roles-and-permission/roleAndPermission';

export const usePermissions = () => {
  return useQuery<Permission[]>({
    queryKey: ['permissions'],
    queryFn: fetchAllPermissions,
  });
};
