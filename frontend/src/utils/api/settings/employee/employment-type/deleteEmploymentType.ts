import api from '@/utils/api/apiInstance';

export const deleteEmploymentType = async (id: number) => {
  const response = await api.delete(`/employment-types/delete/${id}`);
  return response.data;
};
