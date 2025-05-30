import { useQuery } from '@tanstack/react-query';
import { fetchRecord } from '@/utils/api/records/fetchRecord';
import { Record } from '@/types/records/record';

export const useRecordMoreDet = (id: string) => {
  return useQuery<Record>({
    queryKey: ['record', id],
    queryFn: () => fetchRecord({ id }), // TO BE MODIFED!!!!! NOT YET WORKING!
    enabled: !!id, // ensures the query runs only if `id` is truthy (avoid firing the query with an undefined ID.)
    // avoiding bugs or bad requests.
  });
};
