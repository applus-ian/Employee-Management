import api from '@/utils/api/apiInstance';

export const deleteRole = async (id: number) => {
  const response = await api.delete(`/roles/delete/${id}`);
  return response.data;
};
