import api from '@/utils/api/apiInstance';

export const createTeamAssign = async (data: { name: string }) => {
  const response = await api.post('/team-assigns/new', data);
  return response.data;
};
