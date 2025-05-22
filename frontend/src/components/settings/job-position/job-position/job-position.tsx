'use client';

import { useJobPosition } from '@/hooks/settings/job-position/job-position/use-fetch-job-positions';
import { DataTable } from './data-table';
import { columns } from './columns';
import { JobPosition } from '@/types/settings/job-position/job-position/jobPosition';
import { AlertTriangle, Loader2 } from 'lucide-react';

export default function JobPositions() {
  const { data, isLoading, isError } = useJobPosition();

  const rows: JobPosition[] =
    data?.map((item) => ({
      id: item.id,
      title: item.title,
    })) ?? [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
        <span className="ml-2 text-sm text-gray-500">Loading job positions...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-40 text-red-500">
        <AlertTriangle className="h-6 w-6 mr-2" />
        <span className="text-sm">Failed to load job positions.</span>
      </div>
    );
  }

  return (
    <div>
      <DataTable columns={columns} data={rows} />
    </div>
  );
}
