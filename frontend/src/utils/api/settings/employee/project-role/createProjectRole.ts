import api from '@/utils/api/apiInstance';

export const createProjectRole = async (data: { name: string }) => {
  const response = await api.post('/project-roles/new', data);
  return response.data;
};
