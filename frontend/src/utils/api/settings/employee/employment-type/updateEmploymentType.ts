import api from '@/utils/api/apiInstance';

export const updateEmploymentType = async (data: { id: number; name: string }) => {
  const response = await api.put(`/employment-types/update/${data.id}`, data);
  return response.data;
};
