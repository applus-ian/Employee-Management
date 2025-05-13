import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProject } from '@/utils/api/projects/createProject';

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};
