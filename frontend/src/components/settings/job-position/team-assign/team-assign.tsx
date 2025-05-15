'use client';

import { useFetchTeamAssign } from '@/hooks/settings/job-position/team-assign/use-fetch-team-assigns';
import { columns } from './columns';
import { DataTable } from './data-table';
import { TeamAssign } from '@/types/settings/job-position/team-assign/teamAssign';
import { Loader2, AlertTriangle } from 'lucide-react';

export default function TeamAssigns() {
  const { data, isLoading, isError } = useFetchTeamAssign();

  const rows: TeamAssign[] =
    data?.map((item) => ({
      id: item.id,
      name: item.name,
    })) ?? [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
        <span className="ml-2 text-sm text-gray-500">Loading team assignments...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-40 text-red-500">
        <AlertTriangle className="h-6 w-6 mr-2" />
        <span className="text-sm">Failed to load team assignments.</span>
      </div>
    );
  }

  return (
    <div>
      <DataTable columns={columns} data={rows} />
    </div>
  );
}
