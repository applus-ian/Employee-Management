import api from '@/utils/api/apiInstance';

export const deleteSkillCategory = async (id: number) => {
  const response = await api.delete(`/skill-categories/delete/${id}`);
  return response.data;
};
