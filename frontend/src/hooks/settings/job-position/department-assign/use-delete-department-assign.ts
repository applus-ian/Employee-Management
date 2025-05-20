import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteDepartmentAssign } from '@/utils/api/settings/job-position/department-assign/deleteDepartmentAssign';

export const useDeleteDepartmentAssign = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDepartmentAssign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['department-assigns'] });
    },
  });
};
