import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSkillCategory } from '@/utils/api/settings/employee/skill/skill-category/updateSkillCategory';

export const useUpdateSkillCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSkillCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skill-categories'] });
    },
  });
};
