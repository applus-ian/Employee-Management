import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProjectRole } from '@/utils/api/settings/employee/project-role/updateProjectRole';

export const useUpdateProjectRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProjectRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project-roles'] });
    },
  });
};
