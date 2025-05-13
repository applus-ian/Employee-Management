import api from '@/utils/api/apiInstance';
import { Project } from '@/types/projects/project';

export const updateProject = async (data: Project) => {
  const response = await api.put(`/projects/update/${data.id}`, data);
  return response.data;
};
