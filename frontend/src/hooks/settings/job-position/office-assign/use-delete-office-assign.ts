import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteOfficeAssign } from '@/utils/api/settings/job-position/office-assign/deleteOfficeAssign';

export const useDeleteOfficeAssign = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteOfficeAssign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['office-assigns'] });
    },
  });
};
