import api from '@/utils/api/apiInstance';

export const deleteDocumentType = async (id: number) => {
  const response = await api.delete(`/document-types/delete/${id}`);
  return response.data;
};
