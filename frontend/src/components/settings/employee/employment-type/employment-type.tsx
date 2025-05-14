'use client';
import { useEffect, useState } from 'react';
import { EmploymentType, columns } from './columns';
import { DataTable } from './data-table';

export default function EmploymentTypes() {
  const [data, setData] = useState<EmploymentType[]>([]);

  useEffect(() => {
    async function fetchData() {
      const result = await getData();
      setData(result);
    }
    fetchData();
  }, []);

  async function getData(): Promise<EmploymentType[]> {
    return [
      {
        employment_typeName: 'JavaScript programming',
      },
      {
        employment_typeName: 'Database management',
      },
      {
        employment_typeName: 'Time management',
      },
      {
        employment_typeName: 'Documentation and reporting',
      },
      {
        employment_typeName: 'Customer service',
      },
      {
        employment_typeName: 'Strategic thinking',
      },
      {
        employment_typeName: 'Team motivation',
      },
    ];
  }

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
