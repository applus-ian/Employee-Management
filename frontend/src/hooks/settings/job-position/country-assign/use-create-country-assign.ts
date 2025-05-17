import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCountryAssign } from '@/utils/api/settings/job-position/country-assign/createCountryAssign';

export const useCreateCountryAssign = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCountryAssign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['country-assigns'] });
    },
  });
};
