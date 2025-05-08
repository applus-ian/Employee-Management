'use client';
import { useEffect, useState } from 'react';
import { Office_Assign, columns } from './columns';
import { DataTable } from './data-table';

export default function OfficeAssign() {
  const [data, setData] = useState<Office_Assign[]>([]);

  useEffect(() => {
    async function fetchData() {
      const result = await getData();
      setData(result);
    }
    fetchData();
  }, []);

  async function getData(): Promise<Office_Assign[]> {
    return [
      {
        office_assignName: 'Ayala Cebu Tower 1 Office',
      },
      {
        office_assignName: 'Subangdaku Mandaue Office',
      },
      {
        office_assignName: 'Basak Mandaue Office',
      },
      {
        office_assignName: 'Barili Office',
      },
      {
        office_assignName: 'Talisay Office',
      },
      {
        office_assignName: 'Moalboal Office',
      },
      {
        office_assignName: 'Bantayan Office',
      },
    ];
  }

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
