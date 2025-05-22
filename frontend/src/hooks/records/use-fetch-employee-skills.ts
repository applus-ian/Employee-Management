import { useQuery } from '@tanstack/react-query';
import { fetchAllEmployeeSkills } from '@/utils/api/records/fetchAllEmployeeSkill';

export const useEmployeeSkills = (id: string) => {
  return useQuery({
    queryKey: ['employee_skills', id],
    queryFn: () => fetchAllEmployeeSkills({ id }),
    enabled: !!id, // ensures the query runs only if `id` is truthy (avoid firing the query with an undefined ID.)
    // avoiding bugs or bad requests.
  });
};
