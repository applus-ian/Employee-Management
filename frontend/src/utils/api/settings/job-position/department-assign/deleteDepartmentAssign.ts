import api from '@/utils/api/apiInstance';

export const deleteDepartmentAssign = async (id: number) => {
  const response = await api.delete(`/department-assigns/delete/${id}`);
  return response.data;
};
