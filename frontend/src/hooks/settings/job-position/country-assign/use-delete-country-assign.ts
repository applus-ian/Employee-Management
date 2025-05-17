import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCountryAssign } from '@/utils/api/settings/job-position/country-assign/deleteCountryAssign';

export const useDeleteCountryAssign = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCountryAssign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['country-assigns'] });
    },
  });
};
