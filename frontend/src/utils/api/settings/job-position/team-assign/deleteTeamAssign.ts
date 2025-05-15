import api from '@/utils/api/apiInstance';

export const deleteTeamAssign = async (id: number) => {
  const response = await api.delete(`/team-assigns/delete/${id}`);
  return response.data;
};
