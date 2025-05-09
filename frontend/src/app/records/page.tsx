'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import EmployeeTable from '@/components/records/records';
import { EditEmployeeForm } from '@/components/records/edit-form';
import { NewEmployeeForm } from '@/components/records/create-form';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import '@pathofdev/react-tag-Input/build/index.css';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { XIcon } from 'lucide-react';

import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { FunnelIcon } from 'lucide-react';

type FilterState = {
  department?: string;
  position?: string;
  status?: string;
};

const navLinks = [{ name: 'Records', href: 'record' }];
export default function RecordsPage() {
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState<null | 'new' | 'edit'>(null);
  const [activePage, setActivePage] = useState('record');
  const handleEditEmployee = () => {
    setFormType('edit');
    setShowForm(true);
  };
  const [filters, setFilters] = useState<FilterState>({});

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value.startsWith('all') ? undefined : value,
    }));
  };

  const removeFilter = (key: keyof FilterState) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  };

  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': '19rem',
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-col w-full p-5">
          {/* Header */}

          <nav className="bg-[#E8E8E8]">
            <h1 className="pb-2 text-3xl font-semibold tracking-tight first:mt-0">Records</h1>
            <div className="flex justify-between">
              <div className="order-1">
                <p className="text-gray-600 pb-8">Setup and manage Records</p>
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
          {/* Table Card */}
          <Card className="w-full rounded-xl border bg-white shadow-sm">
            {!showForm && (
              <CardHeader className="space-y-4">
                <CardTitle className="text-lg font-semibold text-[#454D5A]">Employee Record</CardTitle>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex gap-2 flex-wrap">
                    <div className="space-y-3">
                      {/* Active filter tags */}
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(filters).map(([key, value]) => (
                          <Badge key={key} className="flex items-center gap-1 px-2 py-1 text-xs" variant="secondary">
                            {value}
                            <XIcon
                              className="w-3 h-3 cursor-pointer"
                              onClick={() => removeFilter(key as keyof FilterState)}
                            />
                          </Badge>
                        ))}
                      </div>

                      {/* Filter button */}
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="flex items-center gap-2 text-sm px-3 py-1">
                            <FunnelIcon className="w-4 h-4" />
                            Filter
                          </Button>
                        </PopoverTrigger>

                        <PopoverContent className="w-72 p-4 bg-white rounded-md shadow space-y-4">
                          {/* Department */}
                          <div className="space-y-1">
                            <label className="text-xs font-medium text-gray-600">Department</label>
                            <Select
                              value={filters.department ?? 'all_department'}
                              onValueChange={(val) => handleFilterChange('department', val)}
                            >
                              <SelectTrigger className="w-full px-3 py-1 text-sm">
                                <SelectValue placeholder="Select Department" />
                              </SelectTrigger>
                              <SelectContent className="bg-white">
                                <SelectItem value="all_department">All Departments</SelectItem>
                                <SelectItem value="IT">IT</SelectItem>
                                <SelectItem value="HR">HR</SelectItem>
                                <SelectItem value="Finance">Finance</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Position */}
                          <div className="space-y-1">
                            <label className="text-xs font-medium text-gray-600">Position</label>
                            <Select
                              value={filters.position ?? 'all_position'}
                              onValueChange={(val) => handleFilterChange('position', val)}
                            >
                              <SelectTrigger className="w-full px-3 py-1 text-sm">
                                <SelectValue placeholder="Select Position" />
                              </SelectTrigger>
                              <SelectContent className="bg-white">
                                <SelectItem value="all_position">All Positions</SelectItem>
                                <SelectItem value="Manager">Manager</SelectItem>
                                <SelectItem value="Developer">Developer</SelectItem>
                                <SelectItem value="Recruiter">Recruiter</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Status */}
                          <div className="space-y-1">
                            <label className="text-xs font-medium text-gray-600">Status</label>
                            <Select
                              value={filters.status ?? 'all_status'}
                              onValueChange={(val) => handleFilterChange('status', val)}
                            >
                              <SelectTrigger className="w-full px-3 py-1 text-sm">
                                <SelectValue placeholder="Select Status" />
                              </SelectTrigger>
                              <SelectContent className="bg-white">
                                <SelectItem value="all_status">All Status</SelectItem>
                                <SelectItem value="Active">Active</SelectItem>
                                <SelectItem value="Inactive">Inactive</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <div className="ml-auto">
                    {!showForm && (
                      <Button
                        variant="outline"
                        className="px-2 py-1 text-[#EE7A2A] font-medium text-xs rounded-md bg-white hover:bg-[#FFA161] hover:text-white border border-[#EE7A2A] flex items-center gap-1"
                        onClick={() => {
                          setShowForm((prev) => !prev);
                          setFormType('new');
                        }}
                      >
                        {showForm ? 'Cancel' : 'New Employee'}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="16"
                          width="16"
                          viewBox="0 -960 960 960"
                          fill="currentColor"
                        >
                          <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Z" />
                        </svg>
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
            )}

            <CardContent className="space-y-6">
              {/* Toggleable Form */}
              {(showForm && formType === 'new' && <NewEmployeeForm onCancel={() => setShowForm(false)} />) ||
                (showForm && formType === 'edit' && <EditEmployeeForm onCancel={() => setShowForm(false)} />)}
              {!showForm && <EmployeeTable onEdit={handleEditEmployee} />}
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
