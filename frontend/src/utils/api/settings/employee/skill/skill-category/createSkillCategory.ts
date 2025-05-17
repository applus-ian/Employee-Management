import api from '@/utils/api/apiInstance';

export const createSkillCategory = async (data: { name: string }) => {
  const response = await api.post('/skill-categories/new', data);
  return response.data;
};
