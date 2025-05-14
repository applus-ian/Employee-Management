import { api } from '@/utils/api/apiInstance';
import { Record } from '@/types/records/record';

export const fetchRecords = async (): Promise<Record> => {
  const response = await api.get<Record>('/employees/list');
  return response.data;
};
