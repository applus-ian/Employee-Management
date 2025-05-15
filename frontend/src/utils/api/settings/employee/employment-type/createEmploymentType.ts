import api from '@/utils/api/apiInstance';

export const createEmploymentType = async (data: { name: string }) => {
  const response = await api.post('/employment-types/new', data);
  return response.data;
};
