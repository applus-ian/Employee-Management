import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteDocument } from '@/utils/api/records/deleteDocument';

export const useDeleteDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
  });
};
