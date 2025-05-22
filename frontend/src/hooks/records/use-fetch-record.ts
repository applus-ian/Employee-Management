import { useQuery } from '@tanstack/react-query';
import { fetchRecord } from '@/utils/api/records/fetchRecord';
import { UserSchema } from '@/schemas';

export const useRecord = (id: string) => {
  return useQuery<UserSchema>({
    queryKey: ['record', id],
    queryFn: () => fetchRecord({ id }),
    enabled: !!id, // ensures the query runs only if `id` is truthy (avoid firing the query with an undefined ID.)
    // avoiding bugs or bad requests.
  });
};
