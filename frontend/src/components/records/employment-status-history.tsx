import { useEmploymentStatusHistory } from '@/hooks/records/use-employment-status-history';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Loader2, AlertTriangle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

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

const formatDate = (dateString?: string) => {
  if (!dateString) return 'Unknown';
  // Replace space with 'T' for cross-browser compatibility
  const safeDateString = dateString.includes(' ') ? dateString.replace(' ', 'T') : dateString;
  const date = new Date(safeDateString);
  if (isNaN(date.getTime())) return dateString; // fallback to raw string if invalid
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

export function EmploymentStatusHistory({ employeeId }: { employeeId: string }) {
  const { data: historyRaw, isLoading: loading, error } = useEmploymentStatusHistory(employeeId);
  const history = historyRaw ?? [];

  // Find the latest status by created_at
  const latestStatus =
    history.length > 0
      ? [...history].sort((a, b) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const getTime = (entry: any) => {
            if (!entry.created_at) return 0;
            const safeDate = entry.created_at.includes(' ') ? entry.created_at.replace(' ', 'T') : entry.created_at;
            const t = new Date(safeDate).getTime();
            return isNaN(t) ? 0 : t;
          };
          return getTime(b) - getTime(a);
        })[0]
      : null;

  // Sort history by created_at descending for table display
  const sortedHistory =
    history.length > 0
      ? [...history].sort((a, b) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const getTime = (entry: any) => {
            if (!entry.created_at) return 0;
            const safeDate = entry.created_at.includes(' ') ? entry.created_at.replace(' ', 'T') : entry.created_at;
            const t = new Date(safeDate).getTime();
            return isNaN(t) ? 0 : t;
          };
          return getTime(b) - getTime(a);
        })
      : [];

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
        <span className="text-sm">{error.message}</span>
      </div>
    );
  }

  return (
    <Card className="rounded-xl border shadow-sm">
      <CardHeader>
        <h3 className="text-xl font-semibold text-gray-900">📋 Employment Status History</h3>
        {latestStatus && (
          <div className="mt-2">
            <span className="text-sm text-gray-600 mr-2">Latest Status:</span>
            <Badge className={getStatusColor(latestStatus.status_set)}>{latestStatus.status_set}</Badge>
          </div>
        )}
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
            {sortedHistory.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-gray-500">
                  No status history found.
                </TableCell>
              </TableRow>
            ) : (
              sortedHistory.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>
                    <Badge className={getStatusColor(entry.status_set)}>{entry.status_set}</Badge>
                  </TableCell>
                  <TableCell>{entry.effective_date ? formatDate(entry.effective_date) : 'Unknown'}</TableCell>
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
