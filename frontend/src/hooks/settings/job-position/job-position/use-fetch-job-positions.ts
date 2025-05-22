import { useQuery } from '@tanstack/react-query';
import { fetchJobPositions } from '@/utils/api/settings/job-position/job-position/fetchAllJobPosition';

export const useJobPosition = () => {
  return useQuery({
    queryKey: ['job-positions'],
    queryFn: fetchJobPositions,
  });
};
