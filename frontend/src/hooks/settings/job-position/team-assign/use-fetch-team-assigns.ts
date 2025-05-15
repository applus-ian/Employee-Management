import { useQuery } from '@tanstack/react-query';
import { fetchTeamAssigns } from '@/utils/api/settings/job-position/team-assign/fetchAllTeamAssign';

export const useFetchTeamAssign = () => {
  return useQuery({
    queryKey: ['team-assigns'],
    queryFn: fetchTeamAssigns,
  });
};
