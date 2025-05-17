import api from '@/utils/api/apiInstance';

export const updateOfficeAssign = async (data: { id: number; name: string }) => {
  const response = await api.put(`/office-assigns/update/${data.id}`, data);
  return response.data;
};
