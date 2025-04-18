'use client';

import React from 'react';
import { FolderOpen, LayoutDashboard, Archive, Settings, LogOut, Menu } from 'lucide-react';

import { useContext, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const authContext = useContext(AuthContext);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    await authContext.logout(); // Log out the user
    router.push('/login'); // Redirect to the login page
  };

  const data = {
    navMain: [
      {
        id: 1,
        image: '/Superadmin.png',
        title: authContext.user?.name,
        subtitle: 'Super Admin',
        url: '#',
      },
      {
        id: 2,
        image: <LayoutDashboard size={22} strokeWidth={2} />,
        title: 'Dashboard',
        url: '#',
      },
      {
        id: 3,
        image: <FolderOpen size={22} strokeWidth={2} />,
        title: 'Projects',
        url: '#',
      },
      {
        id: 4,
        image: <Archive size={22} strokeWidth={2} />,
        title: 'Records',
        url: '#',
      },
      {
        id: 5,
        image: <Settings size={22} strokeWidth={2} />,
        title: 'Settings',
        url: '#',
      },
    ],
  };

  return (
    <div className="relative">
      {/* Mobile Menu Button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 text-black rounded-md lg:hidden bg-white shadow"
        onClick={toggleSidebar}
      >
        <Menu size={24} />
      </button>

      {/* Backdrop */}
      {isSidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden" onClick={toggleSidebar} />}

      {/* Sidebar */}
      <Sidebar
        variant="floating"
        className={cn(
          `inset-y-0 left-0 z-40 w-[250px] bg-white shadow-lg transition-transform duration-300 ease-in-out transform`,
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:translate-x-0 lg:fixed overflow-y-auto flex flex-col justify-between h-screen',
        )}
        {...props}
      >
        {/* Header */}
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <a href="#" className="justify-center">
                  <div className="flex flex-col gap-1 leading-none pt-6 pb-4">
                    <img
                      src="/logo-applus.png"
                      alt="Applus team"
                      className="w-32 h-auto drop-shadow-md justify-center"
                    />
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        {/* Main Content */}
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu className="gap-1 flex-1">
              {data.navMain.map((item, index) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild>
                    {index === 0 ? (
                      <a href={item.url} className="w-full text-left py-8 bg-[#EE7A2A] rounded-[25%]">
                        <div className="flex items-center gap-3 p-6">
                          {typeof item.image === 'string' ? (
                            <img src={item.image} alt={item.title} className="w-8 h-8" />
                          ) : (
                            <div className="w-8 h-8 flex items-center justify-center">{item.image}</div>
                          )}
                          <div>
                            <div className="font-semibold text-white">{item.title}</div>
                            <div className="text-sm text-white">{item.subtitle}</div>
                          </div>
                        </div>
                      </a>
                    ) : (
                      <a href={item.url} className="w-full text-left">
                        <div className="flex items-center gap-2 hover:bg-gray-300 rounded-md p-4 w-full">
                          {typeof item.image === 'string' ? (
                            <img src={item.image} alt={item.title} className="w-10 h-10" />
                          ) : (
                            <div className="w-10 h-10 flex items-center justify-center">{item.image}</div>
                          )}
                          <div>
                            <span className="font-medium py-0">{item.title}</span>
                          </div>
                        </div>
                      </a>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        {/* Footer */}
        <div className="mt-auto p-4">
          <img src="/motto.png" alt="Motto" className="w-32 h-auto mx-auto mb-4" />
          <div className="border-t border-gray-200">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleLogout();
              }}
              className="font-semibold"
            >
              <div className="flex justify-center items-center gap-3 p-2 rounded-md hover:bg-gray-300">
                <LogOut size={22} strokeWidth={2} />
                <span className="text-center">{isLoading ? 'Logging out...' : 'Logout'}</span>
              </div>
            </a>
          </div>
        </div>
      </Sidebar>
    </div>
  );
}
