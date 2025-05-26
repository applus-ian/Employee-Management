import { useQuery } from '@tanstack/react-query';
import { fetchLocationAssignments } from '@/utils/api/settings/job-position/location-assignment/fetchAllLocationAssignment';

export const useLocationAssignment = () => {
  return useQuery({
    queryKey: ['location-assignments'],
    queryFn: fetchLocationAssignments,
  });
};
