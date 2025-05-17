'use client';

import { useOfficeAssign } from '@/hooks/settings/job-position/office-assign/use-fetch-office-assigns';
import { DataTable } from './data-table';
import { columns } from './columns';
import { OfficeAssign } from '@/types/settings/job-position/office-assign/officeAssign';
import { AlertTriangle, Loader2 } from 'lucide-react';

export default function OfficeAssigns() {
  const { data, isLoading, isError } = useOfficeAssign();

  const rows: OfficeAssign[] =
    data?.map((item) => ({
      id: item.id,
      name: item.name,
    })) ?? [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
        <span className="ml-2 text-sm text-gray-500">Loading office assigns...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-40 text-red-500">
        <AlertTriangle className="h-6 w-6 mr-2" />
        <span className="text-sm">Failed to load office assigns.</span>
      </div>
    );
  }

  return (
    <div>
      <DataTable columns={columns} data={rows} />
    </div>
  );
}
