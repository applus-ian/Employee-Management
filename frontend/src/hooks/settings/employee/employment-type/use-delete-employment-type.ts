import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteEmploymentType } from '@/utils/api/settings/employee/employment-type/deleteEmploymentType';

export const useDeleteEmploymentType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEmploymentType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employment-types'] });
    },
  });
};
