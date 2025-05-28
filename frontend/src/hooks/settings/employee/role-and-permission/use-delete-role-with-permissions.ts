import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteRole } from '@/utils/api/settings/employee/role-and-permission/deleteRoleWithPermissions';

export const useDeleteRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
    },
  });
};
