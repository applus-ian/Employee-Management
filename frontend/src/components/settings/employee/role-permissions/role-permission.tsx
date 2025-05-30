'use client';

import { useRolesWithPermissions } from '@/hooks/settings/employee/role-and-permission/use-roles-with-permissions';
import { DataTable } from './data-table';
import { columns } from './columns';
import { RoleWithPermissions } from '@/types/settings/employee/roles-and-permission/roleAndPermission';
import { AlertTriangle, Loader2 } from 'lucide-react';

export default function RolesAndPermissions() {
  const { data, isLoading, isError } = useRolesWithPermissions();

  const rows: RoleWithPermissions[] =
    data?.map((role) => ({
      id: role.id,
      name: role.name,
      description: role.description,
      permissions: role.permissions,
    })) ?? [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
        <span className="ml-2 text-sm text-gray-500">Loading roles...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-40 text-red-500">
        <AlertTriangle className="h-6 w-6 mr-2" />
        <span className="text-sm">Failed to load roles.</span>
      </div>
    );
  }

  return (
    <div>
      <DataTable columns={columns} data={rows} />
    </div>
  );
}
