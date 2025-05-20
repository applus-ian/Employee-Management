import api from '@/utils/api/apiInstance';

export const deleteRecord = async (id: string) => {
  const response = await api.delete(`/records/delete/${id}`);
  return response.data;
};
