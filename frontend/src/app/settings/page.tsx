'use client';

import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

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
      <div className="flex flex-col w-full lg:pl-[16rem] m-5">
        <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">System Settings</h1>
        <p className="text-gray-600">Setup and edit system settings and preferences</p>
      </div>
    </SidebarProvider>
  );
}
