import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createRecord } from '@/utils/api/records/createRecord';

export const useCreateRecord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['records'] });
    },
  });
};
