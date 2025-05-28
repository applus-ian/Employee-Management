import { useState, useEffect } from 'react';
import { EmploymentStatusHistoryEntry } from '@/types/records/employment-status';
import { fetchEmploymentStatusHistory } from '@/utils/api/records/fetchEmploymentStatusHistory';

export const useEmploymentStatusHistory = (employeeId: number) => {
  const [history, setHistory] = useState<EmploymentStatusHistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchEmploymentStatusHistory(employeeId);
        setHistory(data);
      } catch (err) {
        setError('Failed to load employment status history. Please try again later.');
        console.error('Error fetching employment status history:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadHistory();
  }, [employeeId]);

  return { history, isLoading, error };
};
