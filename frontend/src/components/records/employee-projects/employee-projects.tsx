'use client';

import { useEmployeeProjects } from '@/hooks/projects/use-employee-projects';
import { DataTable } from './data-table';
import { columns } from './columns';
import { Project } from '@/types/projects/project';
import { AlertTriangle, Loader2 } from 'lucide-react';

interface EmployeeProjectsProps {
  employeeId: string;
}

export default function EmployeeProjects({ employeeId }: EmployeeProjectsProps) {
  const { data, isLoading, isError } = useEmployeeProjects(employeeId);

  const rows: Project[] =
    data?.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      start_date: item.start_date,
      end_date: item.end_date,
      employees:
        item.employees?.map((employee) => ({
          id: employee.id,
          profile: employee.profile || null,
          full_name: employee.full_name,
          job_position: employee.job_position,
          department: employee.department,
          project_role_id: employee.project_role_id,
        })) ?? [],
    })) ?? [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
        <span className="ml-2 text-sm text-gray-500">Loading projects...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-40 text-red-500">
        <AlertTriangle className="h-6 w-6 mr-2" />
        <span className="text-sm">Failed to load projects.</span>
      </div>
    );
  }

  return (
    <div>
      {/* Header Section */}
      <div className="space-y-5">
        <h2 className="text-lg font-semibold text-gray-800">Employee&apos;s Projects</h2>
      </div>

      {/* Table */}
      <div>
        <DataTable columns={columns} data={rows} />
      </div>
    </div>
  );
}
