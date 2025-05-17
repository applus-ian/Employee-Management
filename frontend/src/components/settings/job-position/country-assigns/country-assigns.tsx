'use client';

import { useCountryAssign } from '@/hooks/settings/job-position/country-assign/use-fetch-country-assigns';
import { DataTable } from './data-table';
import { columns } from './columns';
import { CountryAssign } from '@/types/settings/job-position/country-assign/countryAssign';
import { AlertTriangle, Loader2 } from 'lucide-react';

export default function CountryAssigns() {
  const { data, isLoading, isError } = useCountryAssign();

  const rows: CountryAssign[] =
    data?.map((item) => ({
      id: item.id,
      name: item.name,
    })) ?? [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
        <span className="ml-2 text-sm text-gray-500">Loading country assigns...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-40 text-red-500">
        <AlertTriangle className="h-6 w-6 mr-2" />
        <span className="text-sm">Failed to load country assigns.</span>
      </div>
    );
  }

  return (
    <div>
      <DataTable columns={columns} data={rows} />
    </div>
  );
}
