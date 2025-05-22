import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateRecord } from '@/utils/api/records/updateRecord';

export const useUpdateRecord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['records'] });
    },
  });
};
