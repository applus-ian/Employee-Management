'use client';

import { useRecords } from '@/hooks/records/use-fetch-records';
import { DataTable } from './data-table';
import { columns } from './columns';
import { RecordCol } from '@/types/records/record';
import { AlertTriangle, Loader2 } from 'lucide-react';

export default function Records() {
  const { data, isLoading, isError } = useRecords();

  const rows: RecordCol[] =
    data?.records.users.map((item) => ({
      employee_id: item.employee.id,
      profile: item.employee.profile_pic_url || 'applus-image1.png',
      full_name: `${item.employee.first_name} ${item.employee.last_name}`,
      title: item.employee.job_position.title,
      email: item.email,
      user_role: item.roles.map((role) => role.name).join(', '),
    })) ?? [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
        <span className="ml-2 text-sm text-gray-500">Loading records...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-40 text-red-500">
        <AlertTriangle className="h-6 w-6 mr-2" />
        <span className="text-sm">Failed to load records.</span>
      </div>
    );
  }

  return (
    <div>
      <DataTable columns={columns} data={rows} />
    </div>
  );
}
