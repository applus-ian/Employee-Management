import api from '@/utils/api/apiInstance';

export const updateProjectRole = async (data: { id: number; name: string }) => {
  const response = await api.put(`/project-roles/update/${data.id}`, data);
  return response.data;
};
