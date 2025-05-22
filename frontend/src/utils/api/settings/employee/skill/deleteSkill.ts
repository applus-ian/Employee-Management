import api from '@/utils/api/apiInstance';

export const deleteSkill = async (id: number) => {
  const response = await api.delete(`/skills/delete/${id}`);
  return response.data;
};
