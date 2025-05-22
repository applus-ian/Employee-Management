import { api } from '@/utils/api/apiInstance';
import { documentTypeArraySchema } from '@/schemas/settings/employee/document-type/documentType';

export const fetchDocumentTypes = async () => {
  const response = await api.get('/document-types/list');
  return documentTypeArraySchema.parse(response.data); // Use Zod validation
};
