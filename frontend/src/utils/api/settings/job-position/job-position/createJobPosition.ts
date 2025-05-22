import api from '@/utils/api/apiInstance';

export const createJobPosition = async (data: { title: string }) => {
  const response = await api.post('/job-positions/new', data);
  return response.data;
};
