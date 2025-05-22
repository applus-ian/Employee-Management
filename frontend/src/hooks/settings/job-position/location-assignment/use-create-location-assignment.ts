import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createLocationAssignment } from '@/utils/api/settings/job-position/location-assignment/createLocationAssignment';

export const useCreateLocationAssignment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLocationAssignment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['location-assignments'] });
    },
  });
};
