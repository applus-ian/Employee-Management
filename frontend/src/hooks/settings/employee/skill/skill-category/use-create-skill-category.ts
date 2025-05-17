import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSkillCategory } from '@/utils/api/settings/employee/skill/skill-category/createSkillCategory';

export const useCreateSkillCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSkillCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skill-categories'] });
    },
  });
};
