import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSkill } from '@/utils/api/settings/employee/skill/createSkill';

export const useCreateSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSkill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
    },
  });
};
