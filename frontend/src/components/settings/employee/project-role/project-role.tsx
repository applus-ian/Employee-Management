'use client';

import { columns } from './columns';
import { DataTable } from './data-table';
import { ProjectRole } from '@/types/settings/employee/project-role/projectRole';
import { useProjectRole } from '@/hooks/settings/employee/project-role/use-fetch-project-roles';

export default function ProjectRoles() {
  const { data, isLoading, isError } = useProjectRole();

  const rows: ProjectRole[] =
    data?.map((item) => ({
      id: item.id,
      name: item.name,
    })) ?? [];

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading project roles.</p>;

  return (
    <div>
      <DataTable columns={columns} data={rows} />
    </div>
  );
}
