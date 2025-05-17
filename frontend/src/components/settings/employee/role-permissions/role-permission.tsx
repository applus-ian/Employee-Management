'use client';
import { useEffect, useState } from 'react';
import { Role_Permission, columns } from './columns';
import { DataTable } from './data-table';

export default function RolePermission() {
  const [data, setData] = useState<Role_Permission[]>([]);

  useEffect(() => {
    async function fetchData() {
      const result = await getData();
      setData(result);
    }
    fetchData();
  }, []);

  async function getData(): Promise<Role_Permission[]> {
    return [
      {
        role: '728ed52f',
        permission: 100,
      },
      {
        role: 'lug;ildhb',
        permission: 457,
      },
      {
        role: 'mdtbsfdwf',
        permission: 796,
      },
      {
        role: 'dygbnet3',
        permission: 246,
      },
      {
        role: 'dyfkawefg',
        permission: 425,
      },
      {
        role: 'dygbnet3',
        permission: 246,
      },
      {
        role: 'dyfkawefg',
        permission: 467,
      },
      {
        role: 'mdtbsfdwf',
        permission: 796,
      },
      {
        role: 'dygbnet3',
        permission: 246,
      },
      {
        role: 'dyfkawefg',
        permission: 425,
      },
      {
        role: 'dygbnet3',
        permission: 246,
      },
      {
        role: 'dyfkawefg',
        permission: 467,
      },
      {
        role: 'mdtbsfdwf',
        permission: 796,
      },
      {
        role: 'dygbnet3',
        permission: 246,
      },
      {
        role: 'dyfkawefg',
        permission: 425,
      },
      {
        role: 'dygbnet3',
        permission: 246,
      },
      {
        role: 'dyfkawefg',
        permission: 467,
      },
    ];
  }

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
