import api from '@/utils/api/apiInstance';

export const deleteOfficeAssign = async (id: number) => {
  const response = await api.delete(`/office-assigns/delete/${id}`);
  return response.data;
};
