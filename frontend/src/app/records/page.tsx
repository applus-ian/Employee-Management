'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import EmployeeTable from '@/components/records/EmployeeTable';
import { EditEmployeeForm } from '@/components/records/EditEmployeeForm';
import { NewEmployeeForm } from '@/components/records/NewEmployeeForm';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import '@pathofdev/react-tag-Input/build/index.css';

export default function RecordsPage() {
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState<null | 'new' | 'edit'>(null);

  const handleEditEmployee = () => {
    setFormType('edit');
    setShowForm(true);
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
          <div className="justify-center max-w-[100rem] mx-auto space-y-6 w-full h-full ">
            {/* Header */}

            <header className="flex h-16 shrink-0 items-center gap-2">
              <Separator orientation="vertical" className=" h-4" />
              <div>
                <h1 className="text-3xl font-semibold leading-none">Records</h1>
                <p className="text-muted-foreground text-sm mt-2 text-gray-500">Setup and edit employee records</p>
              </div>
            </header>
            <div className="border-b border-gray-300">
              <div className="text-sm text-orange-600 font-semibold border-b-2 border-orange-500 inline-block px-2 py-1">
                Employee Records
              </div>
            </div>
            {/* Table Card */}
            <Card className="w-full rounded-2xl border bg-white shadow-sm">
              {!showForm && (
                <CardHeader className="space-y-4">
                  <CardTitle className="text-lg font-semibold text-gray-800">Employee Record</CardTitle>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex gap-2 flex-wrap">
                      <Select>
                        <SelectTrigger className="ml-2 px-3 py-1 rounded-md bg-white text-sm flex items-center gap-2">
                          <SelectValue placeholder="All Departments" />
                        </SelectTrigger>
                        <SelectContent className="rounded-md bg-white shadow-md">
                          <SelectItem value="all_department">All Departments</SelectItem>
                          <SelectItem value="it">IT</SelectItem>
                          <SelectItem value="hr">HR</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select>
                        <SelectTrigger className="ml-2 px-3 py-1 rounded-md bg-white text-sm flex items-center gap-2">
                          <SelectValue placeholder="All Positions" />
                        </SelectTrigger>

                        <SelectContent className="rounded-md bg-white shadow-md">
                          <SelectItem value="allposition">All Positions</SelectItem>
                          <SelectItem value="manager">Manager</SelectItem>
                          <SelectItem value="developer">Developer</SelectItem>
                          <SelectItem value="recruiter">Recruiter</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select>
                        <SelectTrigger className="ml-2 px-3 py-1 rounded-md bg-white text-sm flex items-center gap-2">
                          <SelectValue placeholder="All Status" />
                        </SelectTrigger>

                        <SelectContent className="rounded-md bg-white shadow-md">
                          <SelectItem value="all_status">All Status</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="ml-auto">
                      {!showForm && (
                        <Button
                          variant="outline"
                          className="text-orange-600 border-orange-400 bg-white hover:bg-orange-500 hover:text-white"
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
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
