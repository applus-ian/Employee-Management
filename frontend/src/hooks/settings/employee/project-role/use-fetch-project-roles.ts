import { useQuery } from '@tanstack/react-query';
import { fetchProjectRoles } from '@/utils/api/settings/employee/project-role/fetchAllProjectRole';

export const useProjectRole = () => {
  return useQuery({
    queryKey: ['project-roles'],
    queryFn: fetchProjectRoles,
  });
};
