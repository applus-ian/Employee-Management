'use client';
import { useEffect, useState } from 'react';
import { Location_Assign, columns } from './columns';
import { DataTable } from './data-table';

export default function LocationAssign() {
  const [data, setData] = useState<Location_Assign[]>([]);

  useEffect(() => {
    async function fetchData() {
      const result = await getData();
      setData(result);
    }
    fetchData();
  }, []);

  async function getData(): Promise<Location_Assign[]> {
    return [
      {
        job_positionName: 'Software Developer',
        country_assignName: 'Australia',
        office_assignName: '-',
        team_assignName: '-',
        department_assignName: 'Information Technology',
      },
      {
        job_positionName: 'Solutions Architect',
        country_assignName: 'Australia',
        office_assignName: '-',
        team_assignName: '-',
        department_assignName: 'Information Technology',
      },
      {
        job_positionName: 'Senior Software Developer',
        country_assignName: '-',
        office_assignName: '-',
        team_assignName: '-',
        department_assignName: 'Information Technology',
      },
      {
        job_positionName: 'Software QA Systems Tester',
        country_assignName: 'Australia',
        office_assignName: '-',
        team_assignName: '-',
        department_assignName: 'Information Technology',
      },
      {
        job_positionName: 'Software QA Automation Tester',
        country_assignName: '-',
        office_assignName: '-',
        team_assignName: '-',
        department_assignName: 'Information Technology',
      },
      {
        job_positionName: 'System Administrator',
        country_assignName: '-',
        office_assignName: '-',
        team_assignName: '-',
        department_assignName: 'Information Technology',
      },
    ];
  }

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
