import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createJobPosition } from '@/utils/api/settings/job-position/job-position/createJobPosition';

export const useCreateJobPosition = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createJobPosition,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job-positions'] });
    },
  });
};
