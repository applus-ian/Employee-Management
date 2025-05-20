import api from '@/utils/api/apiInstance';

export const createRecord = async (data: { name: string }) => {
  const response = await api.post('/records/new', data);
  return response.data;
};
