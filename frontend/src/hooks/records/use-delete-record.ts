import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteRecord } from '@/utils/api/records/deleteRecord';

export const useDeleteRecord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['records'] });
    },
  });
};
