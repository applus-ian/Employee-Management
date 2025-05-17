import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteDocumentType } from '@/utils/api/settings/employee/document-type/deleteDocumentType';

export const useDeleteDocumentType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDocumentType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['document-types'] });
    },
  });
};
