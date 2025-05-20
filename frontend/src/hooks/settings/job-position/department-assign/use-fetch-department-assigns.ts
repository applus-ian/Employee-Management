import { useQuery } from '@tanstack/react-query';
import { fetchDepartmentAssigns } from '@/utils/api/settings/job-position/department-assign/fetchAllDepartmentAssign';

export const useDepartmentAssign = () => {
  return useQuery({
    queryKey: ['department-assigns'],
    queryFn: fetchDepartmentAssigns,
  });
};
