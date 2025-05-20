'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import ClientProviders from '@/context/ClientProviders';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const routesWithSidebar = ['/dashboard', '/employee/profile', '/projects', '/records', '/settings'];

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Check if current path exactly matches any sidebar-enabled route
  const showSidebar = routesWithSidebar.includes(pathname);

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <ClientProviders>
          {showSidebar ? (
            <SidebarProvider style={{ '--sidebar-width': '19rem' } as React.CSSProperties}>
              <AppSidebar />
              <div className="flex flex-col w-full lg:pl-[16rem]">{children}</div>
            </SidebarProvider>
          ) : (
            <div className="flex flex-col w-full">{children}</div>
          )}
        </ClientProviders>
      </body>
    </html>
  );
}
