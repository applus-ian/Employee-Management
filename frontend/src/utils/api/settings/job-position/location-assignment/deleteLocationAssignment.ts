import api from '@/utils/api/apiInstance';

export const deleteLocationAssignment = async (id: number) => {
  const response = await api.delete(`/location-assignments/delete/${id}`);
  return response.data;
};
