import { api } from '@/utils/api/apiInstance';
import { jobPositionArraySchema } from '@/schemas/settings/job-position/job-position/jobPosition';

export const fetchJobPositions = async () => {
  const response = await api.get('/job-positions/list');
  return jobPositionArraySchema.parse(response.data);
};
