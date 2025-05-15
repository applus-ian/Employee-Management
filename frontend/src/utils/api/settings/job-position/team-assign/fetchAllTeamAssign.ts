import { api } from '@/utils/api/apiInstance';
import { teamAssignArraySchema } from '@/schemas/settings/job-position/team-assign/teamAssign';

export const fetchTeamAssigns = async () => {
  const response = await api.get('/team-assigns/list');
  return teamAssignArraySchema.parse(response.data);
};
