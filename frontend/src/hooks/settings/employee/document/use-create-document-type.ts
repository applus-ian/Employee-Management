import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createDocumentType } from '@/utils/api/settings/employee/document/createDocumentType';

export const useCreateDocumentType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDocumentType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['document-types'] });
    },
  });
};
