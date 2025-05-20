import api from '@/utils/api/apiInstance';

export const createDepartmentAssign = async (data: { name: string; parent_id: number | null }) => {
  const response = await api.post('/department-assigns/new', data);
  return response.data;
};
