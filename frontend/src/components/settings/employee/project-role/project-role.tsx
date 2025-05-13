'use client';
import { useEffect, useState } from 'react';
import { ProjectRole, columns } from './columns';
import { DataTable } from './data-table';

export default function ProjectRoles() {
  const [data, setData] = useState<ProjectRole[]>([]);

  useEffect(() => {
    async function fetchData() {
      const result = await getData();
      setData(result);
    }
    fetchData();
  }, []);

  async function getData(): Promise<ProjectRole[]> {
    return [
      {
        project_roleName: 'JavaScript programming',
      },
      {
        project_roleName: 'Database management',
      },
      {
        project_roleName: 'Time management',
      },
      {
        project_roleName: 'Documentation and reporting',
      },
      {
        project_roleName: 'Customer service',
      },
      {
        project_roleName: 'Strategic thinking',
      },
      {
        project_roleName: 'Team motivation',
      },
    ];
  }

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
