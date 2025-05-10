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
import { Trash2, Search } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';

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
      id: '5678',
      profileImg: 'https://randomuser.me/api/portraits/men/3.jpg',
      fullName: 'poppy',
      jobPosition: 'Project Manager',
      department: 'Management',
    },
    {
      id: '6789',
      profileImg: 'https://randomuser.me/api/portraits/men/4.jpg',
      fullName: 'wendy',
      jobPosition: 'Developer',
      department: 'Management',
    },
    {
      id: '7890',
      profileImg: 'https://randomuser.me/api/portraits/men/5.jpg',
      fullName: 'Bob ',
      jobPosition: 'Designer',
      department: 'Management',
    },
    {
      id: '8912',
      profileImg: 'https://randomuser.me/api/portraits/men/6.jpg',
      fullName: ' Johnson',
      jobPosition: 'Developer Manager',
      department: 'Management',
    },
    // Add more employee data as needed
  ];

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-black">wroject</h2>
        <div className="flex gap-2">
          <Button
            variant="destructive"
            className="bg-red-500 text-white hover:bg-red-600 shadow-lg"
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
          <Input defaultValue="Example Project" className="border rounded-xl hover:border-orange-300" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Start Date</label>
          <input type="date" className="border rounded-xl w-full px-3 py-2 hover:border-orange-400" />
        </div>

        <div className="md:col-span-1">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            className="w-full border px-3 py-2 text-sm resize-none h-[130px] rounded-xl hover:border-orange-300"
            placeholder="Project Description"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">End Date</label>
          <input type="date" className="border rounded-xl w-full px-3 py-2 hover:border-orange-400" />
        </div>
      </form>

      {/* Table for Assigned Employees */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-8 border-t pt-8 border-gray-400">
          <h3 className="text-lg font-semibold">wAssigned Employees</h3>
          <Button
            className="border-2 border-orange-500 text-orange-500 hover:text-white hover:bg-orange-600 shadow-lg"
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
              <TableRow key={emp.id} className="even:bg-[#ebeaf3] hover:bg-[#e3e0f5] cursor-pointer h-12 border-none">
                <TableCell>{emp.id}</TableCell>
                <TableCell>
                  <img src={emp.profileImg} alt={emp.fullName} className="w-8 h-8 rounded-full" />
                </TableCell>
                <TableCell>{emp.fullName}</TableCell>
                <TableCell>{emp.jobPosition}</TableCell>
                <TableCell>{emp.department}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-500 border-none bg-transparent hover:bg-red-100"
                  >
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
        <Button className="bg-orange-500 text-white hover:bg-orange-600 shadow-lg">Save Changes</Button>
        <Button variant="outline" onClick={onCancel} className="shadow-lg">
          Cancel
        </Button>
      </div>

      {/* Dialog for Assigning Employee */}
      <Dialog open={openAssignModal} onOpenChange={setOpenAssignModal}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-orange-500 text-center">AVAILABLE EMPLOYEES</DialogTitle>
            <p className="text-sm text-center mt-1 text-gray-600">Select an employee/s</p>
          </DialogHeader>

          <div className="p-2 border rounded-xl border-gray-350 bg-gray-100">
            {employees.map((emp) => (
              <label
                key={emp.id}
                className="flex items-center gap-3 text-sm cursor-pointer px-2 py-1 hover:bg-muted/50 rounded-md"
              >
                <Checkbox
                  className="w-5 h-5 border border-gray-400 focus:ring-0 focus:ring-offset-0 focus:outline-none data-[state=checked]:bg-orange-500 data-[state=checked]:text-white data-[state=checked]:border-orange-500"
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
      <div>
        <h2 className="text-xl font-bold">Add New Project</h2>
        <p className="text-sm text-muted-foreground mt-1">Fill in the basic project information below.</p>
      </div>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Project Name</label>
          <Input type="text" className="border rounded-xl hover:border-orange-400" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Start Date</label>
          <input type="date" className="border rounded-xl w-full px-3 py-2 hover:border-orange-400" />
        </div>

        <div className="md:col-span-1">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            className="w-full border rounded-xl px-3 py-2 text-sm resize-none hover:border-orange-400 h-[130px]"
            placeholder="Project Description"
          />
        </div>
        {/* End Date Picker */}
        <div>
          <label className="block text-sm font-medium mb-1">End Date</label>
          <input type="date" className="border rounded-xl w-full px-3 py-2 hover:border-orange-400" />
        </div>
      </form>

      <div className="border-t pt-10 border-gray-400">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-xl font-bold">Assigned Employees</h2>
            <p className="text-sm text-muted-foreground mt-1">Select team members to work on this project.</p>
          </div>

          <Button
            onClick={() => setOpenAssignModal(true)}
            className="border border-orange-400 text-orange-500 hover:bg-orange-400 hover:text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2"
          >
            Assign Employee
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 -960 960 960" fill="currentColor">
              <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Z" />
            </svg>
          </Button>
        </div>

        <Dialog open={openAssignModal} onOpenChange={setOpenAssignModal}>
          <DialogContent className="sm:max-w-md bg-white rounded-lg">
            <DialogHeader>
              <DialogTitle className="text-orange-500 text-center text-lg font-bold uppercase">
                Available Employees
              </DialogTitle>
              <p className="text-sm text-center mt-1 text-gray-600">Select an employee/s</p>
            </DialogHeader>

            <CardContent className="p-2 border rounded-xl border-gray-350 bg-gray-100 ">
              {/* Scrollable Box with shadow like in your screenshot */}
              <div className="max-h-80 overflow-y-auto rounded-md p-2 space-y-2 pt-3">
                {employees.map((emp) => (
                  <label
                    key={emp.id}
                    className="flex items-center gap-3 text-sm cursor-pointer px-2 py-1 hover:bg-muted/50 rounded-md"
                  >
                    <Checkbox
                      className="w-5 h-5 border border-gray-400 focus:ring-0 focus:ring-offset-0 focus:outline-none data-[state=checked]:bg-orange-500 data-[state=checked]:text-white data-[state=checked]:border-orange-500"
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
            </CardContent>
            {/* Action buttons */}
            <div className="mt-4 flex justify-center gap-2">
              <Button
                className="bg-orange-500 text-white hover:bg-orange-600 px-6"
                onClick={() => {
                  console.log('Assigned:', selectedEmployees);
                  setOpenAssignModal(false);
                }}
              >
                Assign
              </Button>
              <Button
                variant="outline"
                className="bg-white border-orange-400 text-orange-500 hover:bg-orange-50"
                onClick={() => setOpenAssignModal(false)}
              >
                Cancel
              </Button>
            </div>
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
        <Button className=" bg-orange-500 text-white hover:bg-orange-600 ">Create</Button>
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
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-gray-500 bg-white border-gray-300 shadow-sm hover:bg-orange-400 hover:text-white hover:border-orange-400 "
                          >
                            Start Date
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-64 bg-white border-gray-300">
                          <div>
                            <label className="block text-sm font-medium mb-1">Start Date From :</label>
                            <input type="date" className="border rounded-xl w-full px-3 py-2 hover:border-orange-400" />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-1">Start Date To :</label>
                            <input type="date" className="border rounded-xl w-full px-3 py-2 hover:border-orange-400" />
                          </div>
                        </PopoverContent>
                      </Popover>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-gray-500 bg-white border-gray-300 shadow-sm hover:bg-orange-400 hover:text-white hover:border-orange-400 "
                          >
                            End Date
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-64 bg-white border-gray-300">
                          <div>
                            <label className="block text-sm font-medium mb-1">End Date From :</label>
                            <input type="date" className="border rounded-xl w-full px-3 py-2 hover:border-orange-400" />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-1">End Date To :</label>
                            <input type="date" className="border rounded-xl w-full px-3 py-2 hover:border-orange-400" />
                          </div>
                        </PopoverContent>
                      </Popover>

                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <div onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-gray-500 bg-white border-gray-300 shadow-sm hover:bg-orange-400 hover:text-white hover:border-orange-400 "
                            >
                              Employees
                            </Button>
                          </div>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-64 bg-white border border-gray-300 p-3"
                          onMouseEnter={() => setOpen(true)}
                          onMouseLeave={() => setOpen(false)}
                        >
                          <div className="text-sm space-y-2">
                            {/* 🔍 Search Bar */}
                            <div className="relative">
                              <input
                                type="text"
                                placeholder="Search employees..."
                                className="w-full pl-10 pr-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-400"
                              />
                              <svg
                                className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                                />
                              </svg>
                            </div>

                            {/* 👥 Employee Options */}
                            <div>1 Employee</div>
                            <div>2 Employees</div>
                            <div>3 Employees</div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <Button
                      variant="outline"
                      className="text-orange-600 border-orange-400 bg-white hover:bg-orange-400 hover:text-white shadow-lg"
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
                    <select
                      id="entries"
                      className="border bg-gray-300 hover:border-orange-400 rounded-md px-2 py-1 text-sm"
                    >
                      <option>10</option>
                      <option>25</option>
                      <option>50</option>
                    </select>
                    <span className="text-sm text-muted-foreground">entries</span>
                    <div className="relative w-full ">
                      <Search className=" absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                      <Input type="text" placeholder="Search..." className="max-w-ful pl-10 hover:border-orange-400 " />
                    </div>
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
                          <TableHead className="text-center">No. of Employees Assigned</TableHead>
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
                          {
                            id: '#9878',
                            name: 'Cloud Migration',
                            desc: 'Migrate on-premises data to cloud.',
                            start: '2025-05-05',
                            end: '2025-07-10',
                            count: 6,
                          },
                          {
                            id: '#9879',
                            name: 'AI Integration',
                            desc: 'Integrate AI into business workflows.',
                            start: '2025-05-12',
                            end: '2025-07-20',
                            count: 7,
                          },
                          {
                            id: '#9880',
                            name: 'Security Audit',
                            desc: 'Conduct full IT security audit.',
                            start: '2025-05-15',
                            end: '2025-07-25',
                            count: 4,
                          },
                          {
                            id: '#9881',
                            name: 'App Modernization',
                            desc: 'Update legacy applications.',
                            start: '2025-05-18',
                            end: '2025-07-30',
                            count: 5,
                          },
                        ].map((proj, idx) => (
                          <TableRow
                            key={idx}
                            className="  bg-[#F7F6FE] hover:bg-[#e3e0f5] cursor-pointer h-12 border-none"
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
                            <TableCell className="text-center">{proj.count}</TableCell>
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
