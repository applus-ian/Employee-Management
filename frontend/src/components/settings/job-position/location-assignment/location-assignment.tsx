'use client';

import { useLocationAssignment } from '@/hooks/settings/job-position/location-assignment/use-fetch-location-assignments';
import { columns } from './columns';
import { DataTable } from './data-table';
import { LocationAssignment } from '@/types/settings/job-position/location-assignment/locationAssignment';
import { Loader2, AlertTriangle } from 'lucide-react';

export default function LocationAssignments() {
  const { data, isLoading, isError } = useLocationAssignment();

  const rows: LocationAssignment[] =
    data?.map((item) => ({
      id: item.id,
      employee: {
        id: item.employee.id,
        first_name: item.employee.first_name,
        last_name: item.employee.last_name,
      },
      job_position: {
        id: item.job_position.id,
        title: item.job_position.title,
      },
      country_assign: item.country_assign
        ? {
            id: item.country_assign.id,
            name: item.country_assign.name,
          }
        : null,
      office_assign: item.office_assign
        ? {
            id: item.office_assign.id,
            name: item.office_assign.name,
          }
        : null,
      team_assign: item.team_assign
        ? {
            id: item.team_assign.id,
            name: item.team_assign.name,
          }
        : null,
      department_assign: item.department_assign
        ? {
            id: item.department_assign.id,
            name: item.department_assign.name,
            parent_department: item.department_assign.parent_department
              ? {
                  id: item.department_assign.parent_department?.id,
                  name: item.department_assign.parent_department?.name,
                }
              : null,
          }
        : null,
    })) ?? [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
        <span className="ml-2 text-sm text-gray-500">Loading location assignments...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-40 text-red-500">
        <AlertTriangle className="h-6 w-6 mr-2" />
        <span className="text-sm">Failed to load location assignments.</span>
      </div>
    );
  }

  return (
    <div>
      <DataTable columns={columns} data={rows} />
    </div>
  );
}
