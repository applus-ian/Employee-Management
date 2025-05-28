import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createRoleWithPermissions } from '@/utils/api/settings/employee/role-and-permission/createRoleWithPermissions';

export const useCreateRoleWithPermissions = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRoleWithPermissions,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
    },
  });
};
