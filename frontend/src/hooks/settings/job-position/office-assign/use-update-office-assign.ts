import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateOfficeAssign } from '@/utils/api/settings/job-position/office-assign/updateOfficeAssign';

export const useUpdateOfficeAssign = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateOfficeAssign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['office-assigns'] });
    },
  });
};
