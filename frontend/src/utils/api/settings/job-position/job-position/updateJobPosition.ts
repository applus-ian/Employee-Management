import api from '@/utils/api/apiInstance';

export const updateJobPosition = async (data: { id: number; title: string }) => {
  const response = await api.put(`/job-positions/update/${data.id}`, data);
  return response.data;
};
