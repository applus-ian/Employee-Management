import { useQuery } from '@tanstack/react-query';
import { fetchEmployeeProjects } from '@/utils/api/projects/fetchEmployeeProjects';
import { Project } from '@/types/projects/project';

export const useEmployeeProjects = (employeeId: string) => {
  return useQuery<Project[]>({
    queryKey: ['employee-projects', employeeId],
    queryFn: () => fetchEmployeeProjects(employeeId),
  });
};
