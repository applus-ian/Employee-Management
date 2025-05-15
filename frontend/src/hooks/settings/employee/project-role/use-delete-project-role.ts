import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProjectRole } from '@/utils/api/settings/employee/project-role/deleteProjectRole';

export const useDeleteProjectRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProjectRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project-roles'] });
    },
  });
};
