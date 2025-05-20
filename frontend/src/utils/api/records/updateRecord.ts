import api from '@/utils/api/apiInstance';

export const updateRecord = async (data: { id: string }) => {
  const response = await api.put(`/records/update/${data.id}`, data);
  return response.data;
};
