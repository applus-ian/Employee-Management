'use client';

import GeneralSettingsPage from '@/components/settings/general/generalsettings';
import EmployeeRolePage from '@/components/settings/employee/employee-settings';
import JobPositionPage from '@/components/settings/job-position/job-position-settings';
import AuditLogPage from '@/components/settings/auditlog/auditlogsettings';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const navLinks = [
  { name: 'General Settings', href: 'general' },
  { name: 'Employee Settings', href: 'employee' },
  { name: 'Job Position Settings', href: 'job-position' },
  { name: 'Audit Logs', href: 'audit-logs' },
];

export default function Page() {
  const [activePage, setActivePage] = useState('general');

  return (
    <div className="flex flex-col w-full p-5">
      <nav className="bg-[#E8E8E8]">
        <h1 className="pb-2 text-3xl font-semibold tracking-tight first:mt-0">System Settings</h1>
        <div className="flex justify-between">
          <div className="order-1">
            <p className="text-gray-600 pb-8">Setup and edit system settings and preferences</p>
          </div>
        </div>

        {/* Nav links */}
        <ul className="flex gap-3 border-b-2 border-gray-300 pb-0 w-full mb-4">
          {navLinks.map((link) => {
            const isActive = activePage === link.href;

            return (
              <li key={link.name} className="flex items-center justify-center pr-5">
                <button
                  onClick={() => setActivePage(link.href)}
                  className={cn(
                    'inline-block items-center transition-colors font-medium text-sm pb-2 text-gray-500 hover:text-[#EE7A2A]',
                    isActive && 'text-[#EE7A2A] border-b-2 border-[#EE7A2A]',
                  )}
                >
                  {link.name}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="bg-white rounded-xl w-full p-5">
        {activePage === 'general' && <GeneralSettingsPage />}
        {activePage === 'employee' && <EmployeeRolePage />}
        {activePage === 'job-position' && <JobPositionPage />}
        {activePage === 'audit-logs' && <AuditLogPage />}
      </div>
    </div>
  );
}
