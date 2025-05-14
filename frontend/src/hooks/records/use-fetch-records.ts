import { useQuery } from '@tanstack/react-query';
import { fetchRecords } from '@/utils/api/records/fetchAllRecords';

export const useRecords = () => {
  return useQuery({
    queryKey: ['records'],
    queryFn: fetchRecords,
  });
};
