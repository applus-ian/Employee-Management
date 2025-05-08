'use client';
import { useEffect, useState } from 'react';
import { Country_Assign, columns } from './columns';
import { DataTable } from './data-table';

export default function CountryAssign() {
  const [data, setData] = useState<Country_Assign[]>([]);

  useEffect(() => {
    async function fetchData() {
      const result = await getData();
      setData(result);
    }
    fetchData();
  }, []);

  async function getData(): Promise<Country_Assign[]> {
    return [
      {
        country_assignName: 'Australia',
      },
      {
        country_assignName: 'Spain',
      },
      {
        country_assignName: 'Malaysia',
      },
      {
        country_assignName: 'Philippines',
      },
      {
        country_assignName: 'Indonesia',
      },
      {
        country_assignName: 'Canada',
      },
      {
        country_assignName: 'Japan',
      },
    ];
  }

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
