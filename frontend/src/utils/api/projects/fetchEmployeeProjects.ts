import api from '@/utils/api/apiInstance';
import { Project } from '@/types/projects/project';

export const fetchEmployeeProjects = async (employeeId: string): Promise<Project[]> => {
  const response = await api.get(`/employee-projects/list/${employeeId}`);
  return response.data;
};
