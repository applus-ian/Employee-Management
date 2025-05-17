import { useQuery } from '@tanstack/react-query';
import { fetchSkillCategories } from '@/utils/api/settings/employee/skill/skill-category/fetchAllSkillCategory';

export const useSkillCategory = () => {
  return useQuery({
    queryKey: ['skill-categories'],
    queryFn: fetchSkillCategories,
  });
};
