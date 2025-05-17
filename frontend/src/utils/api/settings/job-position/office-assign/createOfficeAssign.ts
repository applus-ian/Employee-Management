import api from '@/utils/api/apiInstance';

export const createOfficeAssign = async (data: { name: string }) => {
  const response = await api.post('/office-assigns/new', data);
  return response.data;
};
