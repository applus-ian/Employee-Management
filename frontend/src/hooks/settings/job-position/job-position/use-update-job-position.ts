import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateJobPosition } from '@/utils/api/settings/job-position/job-position/updateJobPosition';

export const useUpdateJobPosition = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateJobPosition,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job-positions'] });
    },
  });
};
