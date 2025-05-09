import api from '@/utils/api/apiInstance';

export const createDocumentType = async (data: { name: string }) => {
  const response = await api.post('/document-types/new', data);
  return response.data;
};
