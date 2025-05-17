import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCountryAssign } from '@/utils/api/settings/job-position/country-assign/updateCountryAssign';

export const useUpdateCountryAssign = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCountryAssign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['country-assigns'] });
    },
  });
};
