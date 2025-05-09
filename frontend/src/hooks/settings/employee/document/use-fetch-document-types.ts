import { useQuery } from '@tanstack/react-query';
import { fetchDocumentTypes } from '@/utils/api/settings/employee/document/fetchAllDocumentType';

export const useDocumentType = () => {
  return useQuery({
    queryKey: ['document-types'],
    queryFn: fetchDocumentTypes,
  });
};
