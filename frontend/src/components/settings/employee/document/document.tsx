'use client';
import { useEffect, useState } from 'react';
import { Document, columns } from './columns';
import { DataTable } from './data-table';

export default function Documents() {
  const [data, setData] = useState<Document[]>([]);

  useEffect(() => {
    async function fetchData() {
      const result = await getData();
      setData(result);
    }
    fetchData();
  }, []);

  async function getData(): Promise<Document[]> {
    return [
      {
        documentName: 'JavaScript programming',
        description: 'Used in web development.',
      },
      {
        documentName: 'JavaScript programming',
        description: 'Used in web development.',
      },
      {
        documentName: 'JavaScript programming',
        description: 'Used in web development.',
      },
      {
        documentName: 'JavaScript programming',
        description: 'Used in web development.',
      },
      {
        documentName: 'JavaScript programming',
        description: 'Used in web development.',
      },
      {
        documentName: 'JavaScript programming',
        description: 'Used in web development.',
      },
      {
        documentName: 'JavaScript programming',
        description: 'Used in web development.',
      },
      {
        documentName: 'JavaScript programming',
        description: 'Used in web development.',
      },
      {
        documentName: 'JavaScript programming',
        description: 'Used in web development.',
      },
    ];
  }

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
