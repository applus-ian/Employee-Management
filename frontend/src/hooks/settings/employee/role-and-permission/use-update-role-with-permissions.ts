import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateRole } from '@/utils/api/settings/employee/role-and-permission/updateRoleWithPermissions';

export const useUpdateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles-with-permissions'] });
    },
  });
};
