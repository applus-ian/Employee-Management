import { CreateSkill } from '@/types/settings/employee/skill/skill';
import api from '@/utils/api/apiInstance';

export const createSkill = async (data: CreateSkill) => {
  const response = await api.post('/skills/new', data);
  return response.data;
};
