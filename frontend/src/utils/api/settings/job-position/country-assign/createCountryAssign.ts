import api from '@/utils/api/apiInstance';

export const createCountryAssign = async (data: { name: string }) => {
  const response = await api.post('/country-assigns/new', data);
  return response.data;
};
