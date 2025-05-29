import { useQuery } from '@tanstack/react-query';
import { fetchEmploymentStatusHistory } from '@/utils/api/records/fetchEmploymentStatusHistory';
import { EmploymentStatusHistoryEntry } from '@/types/records/employment-status';

export function useEmployeeCurrentStatus(employeeId: string) {
  return useQuery<EmploymentStatusHistoryEntry[] | null, Error>({
    queryKey: ['employment-status-history', employeeId],
    queryFn: () => fetchEmploymentStatusHistory(employeeId),
    enabled: !!employeeId,
    select: (history) => {
      if (!history || history.length === 0) return null;
      const sorted = [...history].sort((a, b) => {
        const getTime = (entry: EmploymentStatusHistoryEntry) => {
          if (!entry.created_at) return 0;
          const safeDate = entry.created_at.includes(' ') ? entry.created_at.replace(' ', 'T') : entry.created_at;
          const t = new Date(safeDate).getTime();
          return isNaN(t) ? 0 : t;
        };
        return getTime(b) - getTime(a);
      });
      return sorted;
    },
  });
}
