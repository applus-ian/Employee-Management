import api from '@/utils/api/apiInstance';
import { CreateProject } from '@/types/projects/project';

export const createProject = async (data: CreateProject) => {
  const response = await api.post('/projects/new', data);
  return response.data;
};
