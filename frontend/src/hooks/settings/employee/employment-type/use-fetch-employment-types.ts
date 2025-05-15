import { useQuery } from '@tanstack/react-query';
import { fetchEmploymentTypes } from '@/utils/api/settings/employee/employment-type/fetchAllEmploymentType';

export const useFetchEmploymentType = () => {
  return useQuery({
    queryKey: ['employment-types'],
    queryFn: fetchEmploymentTypes,
  });
};
