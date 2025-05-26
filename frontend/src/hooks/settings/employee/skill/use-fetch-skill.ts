import { useQuery } from '@tanstack/react-query';
import { fetchSkills } from '@/utils/api/settings/employee/skill/fetchAllSkill';

export const useSkill = () => {
  return useQuery({
    queryKey: ['skills'],
    queryFn: fetchSkills,
  });
};
