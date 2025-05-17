'use client';

import { useDocumentType } from '@/hooks/settings/employee/document-type/use-fetch-document-types';
import { DataTable } from './data-table';
import { columns } from './columns';
import { DocumentType } from '@/types/settings/employee/document/documentType';
import { AlertTriangle, Loader2 } from 'lucide-react';

export default function DocumentTypes() {
  const { data, isLoading, isError } = useDocumentType();

  const rows: DocumentType[] =
    data?.map((item) => ({
      id: item.id,
      name: item.name,
    })) ?? [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
        <span className="ml-2 text-sm text-gray-500">Loading document types...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-40 text-red-500">
        <AlertTriangle className="h-6 w-6 mr-2" />
        <span className="text-sm">Failed to load document types.</span>
      </div>
    );
  }

  return (
    <div>
      <DataTable columns={columns} data={rows} />
    </div>
  );
}
