import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createDepartmentAssign } from '@/utils/api/settings/job-position/department-assign/createDepartmentAssign';

export const useCreateDepartmentAssign = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDepartmentAssign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['department-assigns'] });
    },
  });
};
