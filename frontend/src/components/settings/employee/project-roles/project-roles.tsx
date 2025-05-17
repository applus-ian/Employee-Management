'use client';

import { columns } from './columns';
import { DataTable } from './data-table';
import { ProjectRole } from '@/types/settings/employee/project-role/projectRole';
import { useProjectRole } from '@/hooks/settings/employee/project-role/use-fetch-project-roles';
import { AlertTriangle, Loader2 } from 'lucide-react';

export default function ProjectRoles() {
  const { data, isLoading, isError } = useProjectRole();

  const rows: ProjectRole[] =
    data?.map((item) => ({
      id: item.id,
      name: item.name,
    })) ?? [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
        <span className="ml-2 text-sm text-gray-500">Loading project roles...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-40 text-red-500">
        <AlertTriangle className="h-6 w-6 mr-2" />
        <span className="text-sm">Failed to load project roles.</span>
      </div>
    );
  }

  return (
    <div>
      <DataTable columns={columns} data={rows} />
    </div>
  );
}
