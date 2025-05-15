'use client';

import { useFetchEmploymentType } from '@/hooks/settings/employee/employment-type/use-fetch-employment-types';
import { columns } from './columns';
import { DataTable } from './data-table';
import { EmploymentType } from '@/types/settings/employee/employment-type/employmentType';
import { Loader2, AlertTriangle } from 'lucide-react';

export default function EmploymentTypes() {
  const { data, isLoading, isError } = useFetchEmploymentType();

  const rows: EmploymentType[] =
    data?.map((item) => ({
      id: item.id,
      name: item.name,
    })) ?? [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
        <span className="ml-2 text-sm text-gray-500">Loading employment types...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-40 text-red-500">
        <AlertTriangle className="h-6 w-6 mr-2" />
        <span className="text-sm">Failed to load employment types.</span>
      </div>
    );
  }

  return (
    <div>
      <DataTable columns={columns} data={rows} />
    </div>
  );
}
