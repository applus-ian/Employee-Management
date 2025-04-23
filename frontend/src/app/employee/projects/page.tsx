'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { parse, isValid } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';

function NewProjectForm({ onCancel }: { onCancel: () => void }) {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [endDateInput, setEndDateInput] = useState('');
  const [openAssignModal, setOpenAssignModal] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

  const employees = [
    { id: '1', name: 'Angelo Fernandez', role: 'Software Developer' },
    { id: '2', name: 'Leon Monte', role: 'Engineer' },
    { id: '3', name: 'Carteris Cartezan', role: 'IT Manager' },
    { id: '4', name: 'Pierce Gonzalez', role: 'Software Developer' },
    { id: '5', name: 'Mac De Guzman', role: 'Software Developer' },
    { id: '6', name: 'Beau Santiago', role: 'Solutions Architect' },
    { id: '7', name: 'Shawn Murphy', role: 'Engineer' },
  ];

  return (
    <div className="p-4 mb-6 space-y-6">
      <h2 className="text-lg font-semibold mb-4">Add New Project</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Project Name</label>
          <Input type="text" className="border rounded-xl" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Start Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <div className="relative w-full">
                <Input
                  readOnly
                  value={startDate ? format(startDate, 'dd/MM/yyyy') : ''}
                  placeholder="dd/mm/yyyy"
                  className="pr-10 cursor-pointer"
                />
                <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
        <div className="md:col-span-1">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            className="w-full border rounded-xl px-3 py-2 text-sm resize-none h-[80px]"
            placeholder="Project Description"
          />
        </div>
        {/* End Date Picker */}
        <div>
          <label className="block text-sm font-medium mb-1">End Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <div className="relative w-full">
                <Input
                  value={endDateInput}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    setEndDateInput(inputValue); // always update the string

                    const parsed = parse(inputValue, 'dd/MM/yyyy', new Date());
                    if (isValid(parsed)) {
                      setEndDate(parsed);
                    }
                  }}
                  placeholder="dd/mm/yyyy"
                  className="pr-10"
                />

                <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
      </form>

      <div className="border-t pt-10 border-gray-400">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-lg font-semibold">Assigned Employees</h3>
          <Button
            onClick={() => setOpenAssignModal(true)}
            className="border border-orange-400 text-orange-500 hover:bg-orange-50 px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2"
          >
            Assign Employee
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 -960 960 960" fill="currentColor">
              <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Z" />
            </svg>
          </Button>
        </div>
        <Dialog open={openAssignModal} onOpenChange={setOpenAssignModal}>
          <DialogContent className="sm:max-w-md bg-white">
            <DialogHeader>
              <DialogTitle className="text-orange-500 text-center">AVAILABLE EMPLOYEES</DialogTitle>
              <p className="text-sm text-center mt-1 ">Select an employee/s</p>
            </DialogHeader>
            <div className="border-t bg-gray-300"></div>
            <div className="max-h-60 overflow-y-auto  rounded-md p-2 space-y-2 pt-3 ">
              {employees.map((emp) => (
                <label
                  key={emp.id}
                  className="flex items-start gap-3 text-sm cursor-pointer px-2 py-1 hover:bg-muted/50 rounded-md pt-3 "
                >
                  <Checkbox
                    className="border border-gray-300 focus:ring-0 focus:ring-offset-0 focus:outline-none data-[state=checked]:bg-orange-500 data-[state=checked]:text-white"
                    checked={selectedEmployees.includes(emp.id)}
                    onCheckedChange={(checked) => {
                      setSelectedEmployees((prev) =>
                        checked ? [...prev, emp.id] : prev.filter((id) => id !== emp.id),
                      );
                    }}
                  />

                  <div>
                    <p className="font-medium">{emp.name}</p>
                    <p className="text-muted-foreground text-xs">{emp.role}</p>
                  </div>
                </label>
              ))}
            </div>

            <DialogFooter className="mt-4 flex justify-center gap-2">
              <Button
                className="bg-orange-500 text-white hover:bg-orange-600 px-6"
                onClick={() => {
                  console.log('Assigned:', selectedEmployees);
                  setOpenAssignModal(false);
                }}
              >
                Assign
              </Button>
              <Button variant="outline" onClick={() => setOpenAssignModal(false)}>
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="overflow-x-auto rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee ID</TableHead>
                <TableHead>Profile</TableHead>
                <TableHead>Full Name</TableHead>
                <TableHead>Job Position</TableHead>
                <TableHead>Department</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  No Employees assigned
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex gap-2 mt-6 pt-3">
        <Button className="bg-orange-500 text-white hover:bg-orange-600">Save</Button>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <SidebarProvider style={{ '--sidebar-width': '19rem' } as React.CSSProperties}>
      <AppSidebar />
      <SidebarInset>
        <div className="ml-0 lg:ml-[15rem] px-4 sm:px-6 py-6 bg-muted/40">
          <div className="max-w-[100rem] mx-auto space-y-6 w-full">
            <header className="flex h-16 shrink-0 items-center gap-2">
              <Separator orientation="vertical" className=" h-4" />
              <div>
                <h1 className="text-3xl font-semibold leading-none">Projects</h1>
                <p className="text-muted-foreground text-sm mt-2 text-gray-500">Setup and manage projects</p>
              </div>
            </header>

            <div className="border-b border-gray-300">
              <div className="text-sm text-orange-600 font-semibold border-b-2 border-orange-500 inline-block px-2 py-1">
                Projects
              </div>
            </div>

            <Card className="w-full rounded-2xl border bg-white shadow-sm">
              {!showForm && (
                <CardHeader className="flex justify-between items-center">
                  <CardTitle className="text-xl font-semibold text-gray-800">Projects</CardTitle>
                </CardHeader>
              )}

              <CardContent className="space-y-6">
                {/* Toggleable Form */}
                {showForm && <NewProjectForm onCancel={() => setShowForm(false)} />}
                {!showForm && (
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm">
                        Start Date
                      </Button>
                      <Button variant="outline" size="sm">
                        End Date
                      </Button>
                      <Button variant="outline" size="sm">
                        Employees
                      </Button>
                    </div>
                    <Button
                      variant="outline"
                      className="text-orange-600 border-orange-400 bg-white"
                      onClick={() => setShowForm((prev) => !prev)}
                    >
                      {showForm ? 'Cancel' : 'New Project'}
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
                )}
                {!showForm && (
                  <div className="flex items-center gap-2">
                    <label htmlFor="entries" className="text-sm text-muted-foreground">
                      Show
                    </label>
                    <select id="entries" className="border rounded-md px-2 py-1 text-sm">
                      <option>10</option>
                      <option>25</option>
                      <option>50</option>
                    </select>
                    <span className="text-sm text-muted-foreground">entries</span>
                    <Input type="text" placeholder="Search..." className="max-w-full" />
                  </div>
                )}
                {!showForm && (
                  <div className="w-full overflow-x-auto rounded-lg">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Project ID</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Start Date</TableHead>
                          <TableHead>End Date</TableHead>
                          <TableHead>No. of Employees Assigned</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[
                          {
                            id: '#5437',
                            name: 'Pipeline Optimization',
                            desc: 'Enhance pipeline flow...',
                            start: '2025-04-10',
                            end: '2025-05-20',
                            count: 5,
                          },
                          {
                            id: '#5643',
                            name: 'DataStream Integrator',
                            desc: 'Integrate data pipelines...',
                            start: '2025-04-15',
                            end: '2025-06-01',
                            count: 3,
                          },
                          {
                            id: '#5684',
                            name: 'Flow Architecture',
                            desc: 'Design data flow systems...',
                            start: '2025-04-12',
                            end: '2025-05-25',
                            count: 4,
                          },
                          {
                            id: '#4363',
                            name: 'ETL Process Upgrade',
                            desc: 'Improve ETL efficiency...',
                            start: '2025-04-18',
                            end: '2025-06-05',
                            count: 8,
                          },
                        ].map((proj, idx) => (
                          <TableRow key={idx} className="even:bg-[#F7F6FE]">
                            <TableCell>{proj.id}</TableCell>
                            <TableCell>{proj.name}</TableCell>
                            <TableCell>{proj.desc}</TableCell>
                            <TableCell>{proj.start}</TableCell>
                            <TableCell>{proj.end}</TableCell>
                            <TableCell>{proj.count}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
                {!showForm && (
                  <div className="flex justify-between items-center pt-4 text-sm text-muted-foreground">
                    <div>Previous</div>
                    <div className="flex items-center gap-1">
                      <Badge className="bg-orange-600 text-white px-3 py-1">1</Badge>
                      <Button variant="ghost" size="sm">
                        2
                      </Button>
                      <Button variant="ghost" size="sm">
                        3
                      </Button>
                    </div>
                    <div>Next</div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
