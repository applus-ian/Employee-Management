import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateDocumentType } from '@/utils/api/settings/employee/document-type/updateDocumentType';

export const useUpdateDocumentType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateDocumentType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['document-types'] });
    },
  });
};
