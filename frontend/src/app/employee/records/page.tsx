'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrashIcon, PencilIcon } from 'lucide-react';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';

export default function RecordsPage() {
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
        <div className="ml-0 lg:ml-[15rem] px-4 sm:px-6 py-6 bg-muted/40">
          <div className="max-w-[100rem] mx-auto space-y-6 w-full">
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
              <CardHeader className="space-y-4">
                {/* Top: Title */}
                <CardTitle className="text-lg font-semibold text-gray-800">Employee Records</CardTitle>

                {/* Filters + Button */}
                <div className="flex items-center justify-between flex-wrap gap-4">
                  {/* Filters Section */}
                  <div className="flex gap-2 flex-wrap">
                    {/* Department Filter */}
                    <select className="border rounded-md px-4 py-2 text-sm font-medium">
                      <option value="">All Departments</option>
                      <option value="IT">IT</option>
                      <option value="HR">HR</option>
                      <option value="Finance">Finance</option>
                    </select>

                    {/* Job Position Filter */}
                    <select className="border rounded-md px-4 py-2 text-sm font-medium">
                      <option value="">All Positions</option>
                      <option value="Manager">Manager</option>
                      <option value="Developer">Developer</option>
                      <option value="Recruiter">Recruiter</option>
                    </select>

                    {/* Status Filter */}
                    <select className="border rounded-md px-4 py-2 text-sm font-medium">
                      <option value="">All Status</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  {/* New Employee Button */}
                  <Button className="border border-orange-400 text-orange-500 hover:bg-orange-50 px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2">
                    New Employee
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
                </div>
              </CardHeader>

              <CardContent>
                {/* Top bar: Show entries + Search */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
                  {/* Show entries */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Show</span>
                    <select className="border rounded-md px-2 py-1 text-sm">
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                    </select>
                    <span>entries</span>
                  </div>

                  {/* Search */}
                  <div className="relative w-full max-w-full">
                    <svg
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search employee..."
                      className="w-full pl-10 pr-4 py-2 border rounded-md text-sm"
                    />
                  </div>
                </div>

                {/* Table */}
                <div className="w-full overflow-x-auto rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Employee ID</TableHead>
                        <TableHead>Profile</TableHead>
                        <TableHead>Fullname</TableHead>
                        <TableHead>Job Position</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <TableRow key={i} className="even:bg-[#F7F6FE]">
                          <TableCell className="font-medium">{i}</TableCell>
                          <TableCell>
                            <img
                              src="/applus-image1.png"
                              alt="Profile"
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          </TableCell>
                          <TableCell>Jane Doe</TableCell>
                          <TableCell>HR</TableCell>
                          <TableCell>IT</TableCell>
                          <TableCell>jane@gmail.com</TableCell>
                          <TableCell>Active</TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button size="icon" variant="ghost" className="rounded-lg text-[#624DE3]" aria-label="Edit">
                              <PencilIcon className="w-4 h-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="rounded-lg text-red-500 hover:bg-destructive/10"
                              aria-label="Delete"
                            >
                              <TrashIcon className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
