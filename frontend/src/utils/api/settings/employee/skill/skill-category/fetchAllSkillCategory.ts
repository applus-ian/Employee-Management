import { api } from '@/utils/api/apiInstance';
import { documentTypeArraySchema } from '@/schemas/settings/employee/document-type/documentType';

export const fetchSkillCategories = async () => {
  const response = await api.get('/skill-categories/list');
  return documentTypeArraySchema.parse(response.data); // Use Zod validation
};
