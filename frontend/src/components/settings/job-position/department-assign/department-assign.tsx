'use client';
import { useEffect, useState } from 'react';
import { Department_Assign, columns } from './columns';
import { DataTable } from './data-table';

export default function DepartmentAssign() {
  const [data, setData] = useState<Department_Assign[]>([]);

  useEffect(() => {
    async function fetchData() {
      const result = await getData();
      setData(result);
    }
    fetchData();
  }, []);

  async function getData(): Promise<Department_Assign[]> {
    return [
      {
        department_assignName: 'Information Technology',
        parent_departmentName: '-',
      },
      {
        department_assignName: 'Finance',
        parent_departmentName: '-',
      },
      {
        department_assignName: 'Human Resource',
        parent_departmentName: '-',
      },
      {
        department_assignName: 'IT Support',
        parent_departmentName: '-',
      },
      {
        department_assignName: 'Engineering',
        parent_departmentName: '-',
      },
      {
        department_assignName: 'Backend',
        parent_departmentName: 'Engineering',
      },
      {
        department_assignName: 'DevOps',
        parent_departmentName: 'Backend',
      },
    ];
  }

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
