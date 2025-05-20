import api from '@/utils/api/apiInstance';

export const updateDepartmentAssign = async (data: { id: number; name: string; parent_id: number | null }) => {
  const response = await api.put(`/department-assigns/update/${data.id}`, data);
  return response.data;
};
