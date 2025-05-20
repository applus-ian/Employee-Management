import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateDepartmentAssign } from '@/utils/api/settings/job-position/department-assign/updateDepartmentAssign';

export const useUpdateDepartmentAssign = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateDepartmentAssign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['department-assigns'] });
    },
  });
};
