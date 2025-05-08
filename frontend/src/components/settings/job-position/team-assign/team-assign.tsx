'use client';
import { useEffect, useState } from 'react';
import { Team_Assign, columns } from './columns';
import { DataTable } from './data-table';

export default function TeamAssign() {
  const [data, setData] = useState<Team_Assign[]>([]);

  useEffect(() => {
    async function fetchData() {
      const result = await getData();
      setData(result);
    }
    fetchData();
  }, []);

  async function getData(): Promise<Team_Assign[]> {
    return [
      {
        team_assignName: 'Employee Management Team',
      },
      {
        team_assignName: 'Attendance Team',
      },
      {
        team_assignName: 'Recruitment Team',
      },
      {
        team_assignName: 'Onboarding Team',
      },
      {
        team_assignName: 'HR Team',
      },
      {
        team_assignName: 'Admin Team',
      },
      {
        team_assignName: 'Joshua Team',
      },
    ];
  }

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
