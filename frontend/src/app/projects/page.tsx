'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import ProjectsPage from '@/components/projects/projects';

const navLinks = [{ name: 'Projects', href: 'project' }];

export default function Page() {
  const [activePage, setActivePage] = useState('project');

  return (
    <div className="flex flex-col w-full p-5">
      <nav className="bg-[#E8E8E8]">
        <h1 className="pb-2 text-3xl font-semibold tracking-tight first:mt-0">Projects</h1>
        <div className="flex justify-between">
          <div className="order-1">
            <p className="text-gray-600 pb-8">Setup and manage Projects</p>
          </div>
          <div className="order-2 pr-10"></div>
        </div>

        {/* Nav links */}
        <ul className="flex gap-3 border-b border-gray-300 pb-0 w-full mb-4">
          {navLinks.map((link) => {
            const isActive = activePage === link.href;

            return (
              <li key={link.name} className="flex items-center justify-center pr-5">
                <button
                  onClick={() => setActivePage(link.href)} // Update active page on click
                  className={cn(
                    'inline-block items-center transition-colors font-medium text-sm pb-2 text-gray-500 hover:text-[#EE7A2A]',
                    isActive && 'text-orange-600 border-b-2 border-orange-500',
                  )}
                >
                  {link.name}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Dynamic Content Rendering */}
      <div className="bg-white rounded-xl w-full p-5 shadow-sm">{activePage === 'project' && <ProjectsPage />}</div>
    </div>
  );
}
