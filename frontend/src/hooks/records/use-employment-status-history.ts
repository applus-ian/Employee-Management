import { useQuery } from '@tanstack/react-query';
import { EmploymentStatusHistoryEntry } from '@/types/records/employment-status';
import { fetchEmploymentStatusHistory } from '@/utils/api/records/fetchEmploymentStatusHistory';

export const useEmploymentStatusHistory = (employeeId: string) => {
  return useQuery<EmploymentStatusHistoryEntry[], Error>({
    queryKey: ['employment-status-history', employeeId],
    queryFn: () => fetchEmploymentStatusHistory(employeeId),
    enabled: !!employeeId,
  });
};
