import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProjectRole } from '@/utils/api/settings/employee/project-role/createProjectRole';

export const useCreateProjectRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProjectRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project-roles'] });
    },
  });
};
