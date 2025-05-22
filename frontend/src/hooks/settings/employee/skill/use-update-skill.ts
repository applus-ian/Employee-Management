import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSkill } from '@/utils/api/settings/employee/skill/updateSkill';

export const useUpdateSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSkill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
    },
  });
};
