import type { Metadata } from 'next';
import LayoutClient from './layout-client'; // Import the real UI from a client component

export const metadata: Metadata = {
  title: 'EMS',
  description: 'Employee Management System',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <LayoutClient>{children}</LayoutClient>;
}
