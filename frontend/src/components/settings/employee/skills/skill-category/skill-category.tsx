'use client';
import { useEffect, useState } from 'react';
import { Skill_Category, columns } from './columns';
import { DataTable } from './data-table';

export default function Skill_Categories() {
  const [data, setData] = useState<Skill_Category[]>([]);

  useEffect(() => {
    async function fetchData() {
      const result = await getData();
      setData(result);
    }
    fetchData();
  }, []);

  async function getData(): Promise<Skill_Category[]> {
    return [
      {
        categoryName: 'Technical',
      },
      {
        categoryName: 'Functional',
      },
      {
        categoryName: 'Leadership',
      },
    ];
  }

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
