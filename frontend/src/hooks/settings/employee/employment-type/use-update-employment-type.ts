import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateEmploymentType } from '@/utils/api/settings/employee/employment-type/updateEmploymentType';

export const useUpdateEmploymentType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateEmploymentType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employment-types'] });
    },
  });
};
