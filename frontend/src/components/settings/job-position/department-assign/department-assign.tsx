'use client';

import { useDepartmentAssign } from '@/hooks/settings/job-position/department-assign/use-fetch-department-assigns';
import { columns } from './columns';
import { DataTable } from './data-table';
import { DepartmentAssign } from '@/types/settings/job-position/department-assign/departmentAssign';
import { Loader2, AlertTriangle } from 'lucide-react';

export default function DepartmentAssigns() {
  const { data, isLoading, isError } = useDepartmentAssign();

  const rows: DepartmentAssign[] =
    data?.map((item) => ({
      id: item.id,
      name: item.name,
      parent_department: item.parent_department
        ? {
            id: item.parent_department.id,
            name: item.parent_department.name,
          }
        : null,
    })) ?? [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
        <span className="ml-2 text-sm text-gray-500">Loading department assignments...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-40 text-red-500">
        <AlertTriangle className="h-6 w-6 mr-2" />
        <span className="text-sm">Failed to load department assignments.</span>
      </div>
    );
  }

  return (
    <div>
      <DataTable columns={columns} data={rows} />
    </div>
  );
}
