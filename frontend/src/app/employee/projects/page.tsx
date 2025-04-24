'use client';

import { useState } from 'react';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableFooter } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';

function EditProjectForm({ onCancel }: { onCancel: () => void }) {
  const [openAssignModal, setOpenAssignModal] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const employees = [
    {
      id: '1234',
      profileImg: 'https://randomuser.me/api/portraits/men/1.jpg',
      fullName: 'John Doe',
      jobPosition: 'Developer',
      department: 'Engineering',
    },
    {
      id: '2345',
      profileImg: 'https://randomuser.me/api/portraits/women/2.jpg',
      fullName: 'Jane Smith',
      jobPosition: 'Designer',
      department: 'Design',
    },
    {
      id: '3456',
      profileImg: 'https://randomuser.me/api/portraits/men/3.jpg',
      fullName: 'Bob Johnson',
      jobPosition: 'Project Manager',
      department: 'Management',
    },
    // Add more employee data as needed
  ];

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-black">View Project</h2>
        <div className="flex gap-2">
          <Button
            variant="destructive"
            className="bg-red-500 text-white hover:bg-red-600"
            onClick={() => setOpenDeleteDialog(true)} // Open delete confirmation dialog
          >
            Delete
          </Button>
        </div>
      </div>
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex justify-center items-center">
              <span className="text-[#EE7A2A] text-3xl font-lg text-center">Confirm Deletion?</span>
            </DialogTitle>
          </DialogHeader>
          <div className="flex justify-center items-center">
            <p className="text-center">Do you want to delete this Employee?</p>
          </div>
          <DialogClose asChild>
            <div className=" px-5 pt-5 flex justify-center gap-x-6">
              <Button className="bg-[#EE7A2A] text-white w-[10rem]">Save Changes</Button>
              <Button className="bg-white border-[#EE7A2A] border-2 text-[#EE7A2A] w-[10rem]">Cancel</Button>
            </div>
          </DialogClose>
        </DialogContent>
      </Dialog>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Project Name</label>
          <Input defaultValue="Example Project" className="border rounded-xl" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Start Date</label>
          <Input type="date" placeholder="dd/mm/yyyy" className="pr-10" />
        </div>

        <div className="md:col-span-1">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            className="w-full border rounded-xl px-3 py-2 text-sm resize-none h-[80px]"
            placeholder="Project Description"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">End Date</label>
          <Input type="date" placeholder="dd/mm/yyyy" className="pr-10" />
        </div>
      </form>

      {/* Table for Assigned Employees */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-8 border-t pt-8 border-gray-400">
          <h3 className="text-lg font-semibold">Assigned Employees</h3>
          <Button
            className="border-2 border-orange-500 text-orange-500 hover:text-white hover:bg-orange-600"
            onClick={() => setOpenAssignModal(true)} // Open the assign employee dialog
          >
            Assign Employee
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 -960 960 960" fill="currentColor">
              <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Z" />
            </svg>
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee ID</TableHead>
              <TableHead>Profile</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Job Position</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((emp) => (
              <TableRow key={emp.id}>
                <TableCell>{emp.id}</TableCell>
                <TableCell>
                  <img src={emp.profileImg} alt={emp.fullName} className="w-8 h-8 rounded-full" />
                </TableCell>
                <TableCell>{emp.fullName}</TableCell>
                <TableCell>{emp.jobPosition}</TableCell>
                <TableCell>{emp.department}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" className="text-red-500 border-none bg-white">
                    <Trash2 className="mr-2" /> {/* Icon with margin to the right */}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>{/* Optional footer, for example if you want to add a total */}</TableFooter>
        </Table>
      </div>

      <div className="flex gap-2 mt-6 pt-3">
        <Button className="bg-orange-500 text-white hover:bg-orange-600">Save Changes</Button>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>

      {/* Dialog for Assigning Employee */}
      <Dialog open={openAssignModal} onOpenChange={setOpenAssignModal}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-orange-500 text-center">AVAILABLE EMPLOYEES</DialogTitle>
            <p className="text-sm text-center mt-1">Select an employee/s</p>
          </DialogHeader>
          <div className="border-t bg-gray-300"></div>
          <div className="max-h-60 overflow-y-auto rounded-md p-2 space-y-2 pt-3">
            {employees.map((emp) => (
              <label
                key={emp.id}
                className="flex items-start gap-3 text-sm cursor-pointer px-2 py-1 hover:bg-muted/50 rounded-md pt-3"
              >
                <Checkbox
                  className="border border-gray-300 focus:ring-0 focus:ring-offset-0 focus:outline-none data-[state=checked]:bg-orange-500 data-[state=checked]:text-white"
                  checked={selectedEmployees.includes(emp.id)}
                  onCheckedChange={(checked) => {
                    setSelectedEmployees((prev) => (checked ? [...prev, emp.id] : prev.filter((id) => id !== emp.id)));
                  }}
                />
                <div>
                  <p className="font-medium">{emp.fullName}</p>
                  <p className="text-muted-foreground text-xs">{emp.jobPosition}</p>
                </div>
              </label>
            ))}
          </div>

          <DialogFooter className="mt-4 flex justify-center gap-2">
            <Button
              className="bg-orange-500 text-white hover:bg-orange-600 px-6"
              onClick={() => {
                console.log('Assigned:', selectedEmployees);
                setOpenAssignModal(false); // Close dialog after assignment
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
    </div>
  );
}

function NewProjectForm({ onCancel }: { onCancel: () => void }) {
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
          <Input type="date" placeholder="dd/mm/yyyy" className="pr-10" />
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
          <Input type="date" placeholder="dd/mm/yyyy" className="pr-10" />
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
  const [formType, setFormType] = useState<null | 'new' | 'edit'>(null);
  const [open, setOpen] = useState(false);
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
                {(showForm && formType === 'new' && <NewProjectForm onCancel={() => setShowForm(false)} />) ||
                  (showForm && formType === 'edit' && <EditProjectForm onCancel={() => setShowForm(false)} />)}
                {!showForm && (
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex flex-wrap gap-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Calendar />
                            Start Date
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-64 bg-white border-gray-300">
                          <Label htmlFor="start-date" className="block text-sm mb-2">
                            Start Date From :
                          </Label>
                          <Input id="start-date" type="date" />
                          <Label htmlFor="start-date" className="block text-sm mb-2 pt-3">
                            Start Date To :
                          </Label>
                          <Input id="start-date" type="date" />
                        </PopoverContent>
                      </Popover>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Calendar />
                            End Date
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-64 bg-white border-gray-300">
                          <Label htmlFor="end-date" className="block text-sm mb-2">
                            End Date From :
                          </Label>
                          <Input id="end-date" type="date" />
                          <Label htmlFor="end-date" className="block text-sm mb-2 pt-3">
                            End Date To :
                          </Label>
                          <Input id="end-date" type="date" />
                        </PopoverContent>
                      </Popover>

                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <div onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
                            <Button variant="outline" size="sm">
                              Employees
                            </Button>
                          </div>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-64 bg-white border-gray-300"
                          onMouseEnter={() => setOpen(true)}
                          onMouseLeave={() => setOpen(false)}
                        >
                          <div className="text-sm space-y-2">
                            <div>1 Employee</div>
                            <div>2 Employees</div>
                            <div>3 Employees</div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <Button
                      variant="outline"
                      className="text-orange-600 border-orange-400 bg-white"
                      onClick={() => {
                        setShowForm((prev) => !prev);
                        setFormType('new');
                      }}
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
                          <TableRow
                            key={idx}
                            className="even:bg-[#F7F6FE] cursor-pointer"
                            onClick={() => {
                              setShowForm((prev) => !prev);
                              setFormType('edit');
                            }}
                          >
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
                      <Badge className="bg-[#624DE3] text-white px-3 py-1">1</Badge>
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
