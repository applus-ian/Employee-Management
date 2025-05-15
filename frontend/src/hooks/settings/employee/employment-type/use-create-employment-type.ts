import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEmploymentType } from '@/utils/api/settings/employee/employment-type/createEmploymentType';

export const useCreateEmploymentType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEmploymentType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employment-types'] });
    },
  });
};
