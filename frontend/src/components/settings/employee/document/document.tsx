'use client';

import { useDocumentType } from '@/hooks/settings/employee/document/use-fetch-document-types';
import { DataTable } from './data-table';
import { columns } from './columns';
import { DocumentType } from '@/types/settings/employee/document/documentType';

export default function DocumentTypes() {
  const { data, isLoading, isError } = useDocumentType();

  const rows: DocumentType[] =
    data?.map((item) => ({
      id: item.id,
      name: item.name,
    })) ?? [];

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading document types.</p>;

  return (
    <div>
      <DataTable columns={columns} data={rows} />
    </div>
  );
}
