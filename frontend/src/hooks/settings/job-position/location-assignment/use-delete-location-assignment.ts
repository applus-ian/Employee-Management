import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteLocationAssignment } from '@/utils/api/settings/job-position/location-assignment/deleteLocationAssignment';

export const useDeleteLocationAssignment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLocationAssignment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['location-assignments'] });
    },
  });
};
