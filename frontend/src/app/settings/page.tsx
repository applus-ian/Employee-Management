'use client';

import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const navLinks = [
  { name: 'General Settings', href: '#' },
  { name: 'Employee Settings', href: '#' },
  { name: 'Job Position Settings', href: '#' },
  { name: 'Audit Logs', href: '#' },
];

export default function Page() {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': '19rem',
        } as React.CSSProperties
      }
    >
      <AppSidebar />

      <div className="flex flex-col w-full lg:pl-[16rem]">
        <nav className="w-full bg-[#E8E8E8] m-5">
          <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">System Settings</h1>
          <div className="flex justify-between">
            <div className="order-1">
              <p className="text-gray-600 pb-8">Setup and edit system settings and preferences</p>
            </div>
            <div className="order-2 pr-10">
              <div className="relative w-full bg-white rounded-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
                <Input type="text" placeholder="Search Settings..." className="pl-10 text-gray-500" />
              </div>
            </div>
          </div>

          {/* Nav links */}
          <ul className="flex gap-6 border-b-2 border-gray-300 p-4 pb-0">
            {navLinks.map((link) => (
              <li key={link.name} className="flex items-center justify-center pr-5">
                <Link
                  href={link.href}
                  className={cn(
                    'inline-block items-center focus:border-b-2 focus:border-[#EE7A2A] focus:text-[#EE7A2A] text-gray-500 hover:text-[#EE7A2A] transition-colors font-medium text-sm pb-2',
                  )}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </SidebarProvider>
  );
}
