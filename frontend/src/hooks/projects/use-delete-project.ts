import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProject } from '@/utils/api/projects/deleteProject';

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};
