// "use client";

import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import type { Metadata } from 'next';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'EMS',
  description: 'Employee Management System',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <SidebarProvider style={{ '--sidebar-width': '19rem' } as React.CSSProperties}>
          <AppSidebar />
          <div className="flex flex-col w-full lg:pl-[16rem] p-4">{children}</div>
        </SidebarProvider>
      </body>
    </html>
  );
}
