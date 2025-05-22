import { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Loader2, AlertTriangle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import api from '@/utils/api/apiInstance';

interface EmploymentStatusHistoryEntry {
  id: string;
  status: string;
  changed_at: string;
  changed_by: string;
  remarks?: string;
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'onboarding':
      return 'bg-blue-100 text-blue-800';
    case 'account creation':
      return 'bg-purple-100 text-purple-800';
    case 'active':
      return 'bg-green-100 text-green-800';
    case 'terminated':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export function EmploymentStatusHistory({ employeeId }: { employeeId: string }) {
  const [history, setHistory] = useState<EmploymentStatusHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    api
      .get(`/employees/${employeeId}/employment-status-history`)
      .then((res) => setHistory(res.data))
      .catch(() => setError('Failed to load employment status history.'))
      .finally(() => setLoading(false));
  }, [employeeId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
        <span className="ml-2 text-sm text-gray-500">Loading employment status history...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-40 text-red-500">
        <AlertTriangle className="h-6 w-6 mr-2" />
        <span className="text-sm">{error}</span>
      </div>
    );
  }

  return (
    <Card className="rounded-xl border shadow-sm">
      <CardHeader>
        <h3 className="text-xl font-semibold text-gray-900">📋 Employment Status History</h3>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Changed At</TableHead>
              <TableHead>Changed By</TableHead>
              <TableHead>Remarks</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-gray-500">
                  No status history found.
                </TableCell>
              </TableRow>
            ) : (
              history.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>
                    <Badge className={getStatusColor(entry.status)}>{entry.status}</Badge>
                  </TableCell>
                  <TableCell>{new Date(entry.changed_at).toLocaleDateString()}</TableCell>
                  <TableCell>{entry.changed_by}</TableCell>
                  <TableCell>{entry.remarks || '-'}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
