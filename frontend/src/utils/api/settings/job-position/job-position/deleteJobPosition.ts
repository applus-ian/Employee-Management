import api from '@/utils/api/apiInstance';

export const deleteJobPosition = async (id: number) => {
  const response = await api.delete(`/job-positions/delete/${id}`);
  return response.data;
};
