import { EditDepartmentAssignInput } from '@/schemas';
import api from '@/utils/api/apiInstance';

export const updateDepartmentAssign = async (data: EditDepartmentAssignInput) => {
  const response = await api.put(`/department-assigns/update/${data.id}`, data);
  return response.data;
};
