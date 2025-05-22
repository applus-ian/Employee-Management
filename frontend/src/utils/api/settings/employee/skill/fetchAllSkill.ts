import { api } from '@/utils/api/apiInstance';
import { skillArraySchema } from '@/schemas/settings/employee/skill/skill';

export const fetchSkills = async () => {
  const response = await api.get('/skills/list');
  return skillArraySchema.parse(response.data); // Use Zod validation
};
