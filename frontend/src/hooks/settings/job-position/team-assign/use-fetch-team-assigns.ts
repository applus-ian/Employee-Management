import { useQuery } from '@tanstack/react-query';
import { fetchTeamAssigns } from '@/utils/api/settings/job-position/team-assign/fetchAllTeamAssign';

export const useTeamAssign = () => {
  return useQuery({
    queryKey: ['team-assigns'],
    queryFn: fetchTeamAssigns,
  });
};
