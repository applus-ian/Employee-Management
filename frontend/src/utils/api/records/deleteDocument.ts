import { api } from '@/utils/api/apiInstance';

export const deleteDocument = async (documentId: number): Promise<void> => {
  await api.delete(`/documentations/delete/${documentId}`);
};
