import { useQuery } from '@tanstack/react-query';
import { fetchOfficeAssigns } from '@/utils/api/settings/job-position/office-assign/fetchAllOfficeAssign';

export const useOfficeAssign = () => {
  return useQuery({
    queryKey: ['office-assigns'],
    queryFn: fetchOfficeAssigns,
  });
};
