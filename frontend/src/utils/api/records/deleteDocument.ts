import { api } from '@/utils/api/apiInstance';

export const deleteDocument = async (documentId: string): Promise<void> => {
  await api.delete(`/records/documents/${documentId}`);
};
