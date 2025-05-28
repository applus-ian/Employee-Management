import api from '@/utils/api/apiInstance';
import { EmploymentStatusHistoryEntry } from '@/types/records/employment-status';
import { handleApiError } from '@/utils/api/handleApiError';

export const fetchEmploymentStatusHistory = async (employeeId: number): Promise<EmploymentStatusHistoryEntry[]> => {
  try {
    const response = await api.get(`/employment-status-histories/${employeeId}`);
    return response.data;
  } catch (error) {
    handleApiError(error, 'Failed to fetch employment status history');
    throw error;
  }
};
