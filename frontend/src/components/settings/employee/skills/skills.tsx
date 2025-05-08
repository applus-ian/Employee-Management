'use client';
import { useEffect, useState } from 'react';
import { Skill, columns } from './columns';
import { DataTable } from './data-table';

export default function Skills() {
  const [data, setData] = useState<Skill[]>([]);

  useEffect(() => {
    async function fetchData() {
      const result = await getData();
      setData(result);
    }
    fetchData();
  }, []);

  async function getData(): Promise<Skill[]> {
    return [
      {
        skillName: 'JavaScript programming',
        description: 'Used in web development.',
        category: 'Technical',
      },
      {
        skillName: 'Database management',
        description: 'Organizing and querying data.',
        category: 'Technical',
      },
      {
        skillName: 'Time management',
        description: 'Prioritizing and completing tasks efficiently.',
        category: 'Functional',
      },
      {
        skillName: 'Documentation and reporting',
        description: 'Writing clear, concise records or reports.',
        category: 'Functional',
      },
      {
        skillName: 'Customer service',
        description: 'Handling client inquiries and providing solutions.',
        category: 'Functional',
      },
      {
        skillName: 'Strategic thinking',
        description: 'Planning long-term goals and direction.',
        category: 'Leadership',
      },
      {
        skillName: 'Team motivation',
        description: 'Inspiring productivity and collaboration.',
        category: 'Leadership',
      },
    ];
  }

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
