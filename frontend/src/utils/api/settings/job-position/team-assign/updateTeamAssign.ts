import api from '@/utils/api/apiInstance';

export const updateTeamAssign = async (data: { id: number; name: string }) => {
  const response = await api.put(`/team-assigns/update/${data.id}`, data);
  return response.data;
};
