import { useQuery } from '@tanstack/react-query';
import { fetchCountryAssigns } from '@/utils/api/settings/job-position/country-assign/fetchAllCountryAssign';

export const useCountryAssign = () => {
  return useQuery({
    queryKey: ['country-assigns'],
    queryFn: fetchCountryAssigns,
  });
};
