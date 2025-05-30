import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEmploymentStatusHistory } from '@/utils/api/records/updateEmploymentStatusHistory';

export const useCreateEmploymentStatusHistory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEmploymentStatusHistory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employment-status-history'] });
    },
  });
};
