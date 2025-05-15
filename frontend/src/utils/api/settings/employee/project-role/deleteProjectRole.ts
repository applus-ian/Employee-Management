import api from '@/utils/api/apiInstance';

export const deleteProjectRole = async (id: number) => {
  const response = await api.delete(`/project-roles/delete/${id}`);
  return response.data;
};
