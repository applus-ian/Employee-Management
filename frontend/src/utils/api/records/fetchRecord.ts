import { api } from '@/utils/api/apiInstance';

export const fetchRecord = async (data: { id: string }) => {
  const response = await api.get(`/employees/${data.id}`);
  return response.data.employee_data;
};
