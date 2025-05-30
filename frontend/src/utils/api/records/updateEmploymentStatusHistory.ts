import api from '@/utils/api/apiInstance';
import { EmploymentStatusHistoryPayload } from '@/types/records/employment-status-history';

export const createEmploymentStatusHistory = async (payload: EmploymentStatusHistoryPayload) => {
  const response = await api.post('/employment-status-histories/new-status-history', payload);
  return response.data;
};
