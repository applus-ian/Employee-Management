'use client';
import { useEffect, useState } from 'react';
import { Job_Position, columns } from './columns';
import { DataTable } from './data-table';

export default function JobPosition() {
  const [data, setData] = useState<Job_Position[]>([]);

  useEffect(() => {
    async function fetchData() {
      const result = await getData();
      setData(result);
    }
    fetchData();
  }, []);

  async function getData(): Promise<Job_Position[]> {
    return [
      {
        job_positionName: 'Software Developer',
      },
      {
        job_positionName: 'Solutions Architect',
      },
      {
        job_positionName: 'Senior Software Developer',
      },
      {
        job_positionName: 'Software QA Systems Tester',
      },
      {
        job_positionName: 'Software QA Automation Tester',
      },
      {
        job_positionName: 'System Administrator',
      },
      {
        job_positionName: 'HR Officer',
      },
    ];
  }

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
