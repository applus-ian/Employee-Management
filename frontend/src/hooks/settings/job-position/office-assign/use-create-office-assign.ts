import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createOfficeAssign } from '@/utils/api/settings/job-position/office-assign/createOfficeAssign';

export const useCreateOfficeAssign = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOfficeAssign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['office-assigns'] });
    },
  });
};
