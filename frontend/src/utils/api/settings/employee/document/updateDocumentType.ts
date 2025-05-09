import api from '@/utils/api/apiInstance';

export const updateDocumentType = async (data: { id: number; name: string }) => {
  // Change POST to PUT
  const response = await api.put(`/document-types/update/${data.id}`, data);
  return response.data;
};
