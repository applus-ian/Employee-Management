import { api } from '@/utils/api/apiInstance';
import { employeeSkillArraySchema } from '@/schemas/settings/employee/skill/skill';

export const fetchAllEmployeeSkills = async (data: { id: string }) => {
  const response = await api.get(`/employee-skills/${data.id}`);
  return employeeSkillArraySchema.parse(response.data); // Use Zod validation
};
