import api from '@/utils/api/apiInstance';

export const deleteCountryAssign = async (id: number) => {
  const response = await api.delete(`/country-assigns/delete/${id}`);
  return response.data;
};
