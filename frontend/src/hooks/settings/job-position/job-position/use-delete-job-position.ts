import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteJobPosition } from '@/utils/api/settings/job-position/job-position/deleteJobPosition';

export const useDeleteJobPosition = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteJobPosition,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job-positions'] });
    },
  });
};
