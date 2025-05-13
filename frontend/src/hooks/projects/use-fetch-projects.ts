import { useQuery } from '@tanstack/react-query';
import { fetchProjects } from '@/utils/api/projects/fetchAllProjects';

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });
};
