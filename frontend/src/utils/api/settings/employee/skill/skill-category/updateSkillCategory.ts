import api from '@/utils/api/apiInstance';

export const updateSkillCategory = async (data: { id: number; name: string }) => {
  const response = await api.put(`/skill-categories/update/${data.id}`, data);
  return response.data;
};
