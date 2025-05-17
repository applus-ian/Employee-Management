import api from '@/utils/api/apiInstance';

export const updateCountryAssign = async (data: { id: number; name: string }) => {
  const response = await api.put(`/country-assigns/update/${data.id}`, data);
  return response.data;
};
