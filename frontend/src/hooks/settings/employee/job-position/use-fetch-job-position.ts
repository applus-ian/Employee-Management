import { useQuery } from '@tanstack/react-query';
import { fetchJobPositions } from '@/utils/api/settings/job-position/job-position/fetchAllJobPosition';
import { JobPosition } from '@/schemas/settings/job-position/job-position/jobPosition';

export const useJobPositions = () => {
  return useQuery<JobPosition[]>({
    queryKey: ['jobPositions'],
    queryFn: fetchJobPositions,
  });
};
