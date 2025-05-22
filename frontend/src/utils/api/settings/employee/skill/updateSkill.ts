import { Skill } from '@/types/settings/employee/skill/skill';
import api from '@/utils/api/apiInstance';

export const updateSkill = async (data: Skill) => {
  const response = await api.put(`/skills/update/${data.id}`, data);
  return response.data;
};
