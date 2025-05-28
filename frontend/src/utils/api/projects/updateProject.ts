import api from '@/utils/api/apiInstance';
import { UpdateProject } from '@/types/projects/project';

export const updateProject = async (data: UpdateProject) => {
  const response = await api.put(`/projects/update/${data.id}`, data);
  return response.data;
};
