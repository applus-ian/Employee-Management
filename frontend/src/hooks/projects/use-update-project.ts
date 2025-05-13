import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProject } from '@/utils/api/projects/updateProject';

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};
