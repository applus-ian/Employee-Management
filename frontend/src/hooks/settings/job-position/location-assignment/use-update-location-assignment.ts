import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateLocationAssignment } from '@/utils/api/settings/job-position/location-assignment/updateLocationAssignment';

export const useUpdateLocationAssignment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateLocationAssignment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['location-assignments'] });
    },
  });
};
