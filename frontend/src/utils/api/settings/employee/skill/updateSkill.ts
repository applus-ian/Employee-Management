import { Skill } from '@/types/settings/employee/skill/skill';
import api from '@/utils/api/apiInstance';

export const updateSkill = async (data: Skill) => {
  const payload = {
    name: data.name,
    description: data.description,
    skill_category_id: data.skill_category.id,
  };

  const response = await api.put(`/skills/update/${data.id}`, payload);
  return response.data;
};
