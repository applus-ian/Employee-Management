import { api } from '@/utils/api/apiInstance';
import { projectArraySchema } from '@/schemas/projects/project';

export const fetchProjects = async () => {
  const response = await api.get('/projects/list');
  return projectArraySchema.parse(response.data);
};
