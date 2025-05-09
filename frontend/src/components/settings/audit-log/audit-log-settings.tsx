'use client';
import { useEffect, useState } from 'react';
import { Audit_Log, columns } from './columns';
import { DataTable } from './data-table';

export default function AuditLogPage() {
  const [data, setData] = useState<Audit_Log[]>([]);

  useEffect(() => {
    async function fetchData() {
      const result = await getData();
      setData(result);
    }
    fetchData();
  }, []);

  async function getData(): Promise<Audit_Log[]> {
    return [
      {
        audit_logID: '#3457',
        userID: 'UUID1',
        changes_made: 'First Name, Last Name.',
        user_action: 'Update',
        date: '2025-05-20',
        affected_table: 'Employee Record',
      },
      {
        audit_logID: '#5643',
        userID: 'UUID1',
        changes_made: 'First Name, Last Name.',
        user_action: 'Update',
        date: '2025-06-01',
        affected_table: 'Employee Record',
      },
      {
        audit_logID: '#5684',
        userID: 'UUID1',
        changes_made: 'First Name, Last Name.',
        user_action: 'Update',
        date: '2025-05-25',
        affected_table: 'Employee Record',
      },
      {
        audit_logID: '#4363',
        userID: 'UUID1',
        changes_made: 'First Name, Last Name.',
        user_action: 'Update',
        date: '2025-06-05',
        affected_table: 'Employee Record',
      },
      {
        audit_logID: '#5745',
        userID: 'UUID1',
        changes_made: 'First Name, Last Name.',
        user_action: 'Update',
        date: '2025-06-10',
        affected_table: 'Employee Record',
      },
      {
        audit_logID: '#5795',
        userID: 'UUID1',
        changes_made: 'First Name, Last Name.',
        user_action: 'Update',
        date: '2025-06-20',
        affected_table: 'Employee Record',
      },
      {
        audit_logID: '#9767',
        userID: 'UUID1',
        changes_made: 'First Name, Last Name.',
        user_action: 'Update',
        date: '2025-06-25',
        affected_table: 'Employee Record',
      },
      {
        audit_logID: '#9878',
        userID: 'UUID1',
        changes_made: 'First Name, Last Name.',
        user_action: 'Update',
        date: '2025-07-01',
        affected_table: 'Employee Record',
      },
    ];
  }

  return (
    <div>
      <div>
        <h2 className="text-xl font-semibold text-[#454D5A]">Audit Logs</h2>
      </div>

      <div>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
