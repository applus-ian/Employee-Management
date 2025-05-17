import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteSkillCategory } from '@/utils/api/settings/employee/skill/skill-category/deleteSkillCategory';

export const useDeleteSkillCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSkillCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skill-categories'] });
    },
  });
};
