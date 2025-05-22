import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteSkill } from '@/utils/api/settings/employee/skill/deleteSkill';

export const useDeleteSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSkill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
    },
  });
};
