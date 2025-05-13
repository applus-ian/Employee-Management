import api from '@/utils/api/apiInstance';

export const deleteProject = async (id: number) => {
  const response = await api.delete(`/projects/delete/${id}`);
  return response.data;
};
