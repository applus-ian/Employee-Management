'use client';

import { AlertTriangle, Loader2 } from 'lucide-react';
import { columns } from './columns';
import { DataTable } from './data-table';
import { useSkill } from '@/hooks/settings/employee/skill/use-fetch-skill';
import { Skill } from '@/types/settings/employee/skill/skill';

export default function Skills() {
  const { data, isLoading, isError } = useSkill();

  const rows: Skill[] =
    data?.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description ?? '',
      skill_category: {
        id: item.skill_category.id,
        name: item.skill_category.name,
      },
    })) ?? [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
        <span className="ml-2 text-sm text-gray-500">Loading skills...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-40 text-red-500">
        <AlertTriangle className="h-6 w-6 mr-2" />
        <span className="text-sm">Failed to load skills.</span>
      </div>
    );
  }

  return (
    <div>
      <DataTable columns={columns} data={rows} />
    </div>
  );
}
