import { api } from '@/utils/api/apiInstance';
import { projectRoleArraySchema } from '@/schemas/settings/employee/project-role/projectRole';

export const fetchProjectRoles = async () => {
  const response = await api.get('/project-roles/list');
  return projectRoleArraySchema.parse(response.data); // Use Zod validation
};
