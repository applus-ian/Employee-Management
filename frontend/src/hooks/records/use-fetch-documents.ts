import { useQuery } from '@tanstack/react-query';
import { fetchDocumentations } from '@/utils/api/records/fetchDocumentation';

export const useFetchDocuments = (employeeId: string) => {
  return useQuery({
    queryKey: ['documentations', employeeId],
    queryFn: () => fetchDocumentations(employeeId),
  });
};
