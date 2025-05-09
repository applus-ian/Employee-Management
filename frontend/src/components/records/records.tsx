'use client';

import { useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

import { PencilIcon, TrashIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@/components/ui/pagination';
type EmployeeTableProps = {
  onEdit: () => void;
};

export default function EmployeeTable({ onEdit }: EmployeeTableProps) {
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('Personal Info');
  const handleDelete = () => {
    if (employeeToDelete !== null) {
      console.log('Deleting employee with ID:', employeeToDelete);
      setShowDeleteDialog(false);
      setEmployeeToDelete(null);
    }
  };

  return (
    <>
      {/* Show entries + Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Show</span>
          <select className="border rounded-md px-2 py-1 text-sm">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          <span>entries</span>
        </div>

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
          <Input
            type="text"
            placeholder="Search employee..."
            className="w-full pl-10 pr-4 py-2 border hover:border-orange-500 rounded-md text-sm"
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
              <TableRow
                key={i}
                className="even:bg-[#F7F6FE] cursor-pointer hover:bg-gray-100"
                onClick={() => setShowProfileDialog(true)}
              >
                <TableCell className="font-medium">{i}</TableCell>
                <TableCell>
                  <img src="/applus-image1.png" alt="Profile" className="w-10 h-10 rounded-full object-cover" />
                </TableCell>
                <TableCell>Jane Doe</TableCell>
                <TableCell>HR</TableCell>
                <TableCell>IT</TableCell>
                <TableCell>jane@gmail.com</TableCell>
                <TableCell>Active</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-[#624DE3] border-none bg-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit();
                    }}
                  >
                    <PencilIcon className="w-8 h-8" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 border-none bg-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEmployeeToDelete(i);
                      setShowDeleteDialog(true);
                    }}
                  >
                    <TrashIcon className="w-8 h-8" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Profile Dialog */}

        <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
          <DialogContent className="max-w-10 px-10 py-12 bg-white  shadow-2xl flex w-[50%] h-[95%] overflow-y-auto ">
            <DialogHeader className="space-y-10 w-full ">
              {/* Profile Header */}
              <div className="flex items-center gap-6">
                <Avatar className="w-24 h-24 ring-2 ring-orange-300 shadow-lg">
                  <AvatarImage src="/applus-image1.png" alt="Profile" />
                  <AvatarFallback>JJ</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Julieza Jane Patac</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Role: <span className="font-medium text-gray-800">Employee</span> · Status:{' '}
                    <span className="ml-1 inline-block px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                      Active
                    </span>
                  </p>
                </div>
              </div>

              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="flex gap-4 mt-1 mb-2 pb-[-0px] rounded-none border-b w-full justify-center ">
                  {[
                    { value: 'personal', label: 'Personal Info' },
                    { value: 'address', label: 'Address' },
                    { value: 'employment', label: 'Employment Details' },
                    { value: 'documents', label: 'Documents' },
                  ].map(({ value, label }) => (
                    <TabsTrigger
                      key={value}
                      value={value}
                      className={`pb-2 text-sm font-medium border-b-2 rounded-none transition-colors ${
                        activeTab === value
                          ? 'text-orange-600 border-b-orange-600 data-[state=active]:bg-white rounded-none'
                          : 'text-gray-500 border-transparent hover:text-orange-500 hover:border-b-orange-500'
                      }`}
                    >
                      {label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {/* PERSONAL INFO */}
                <TabsContent value="personal">
                  <Card className="rounded-xl border shadow-sm ">
                    <CardHeader>
                      <h3 className="text-xl font-semibold text-gray-900 ">👤 Personal Information</h3>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-sm text-gray-800">
                      <div>
                        <p className="text-gray-500">First Name</p>
                        <p className="font-medium">Julieza Jane</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Middle Name</p>
                        <p className="font-medium">Bernardo</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Last Name</p>
                        <p className="font-medium">Patac</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Email Address</p>
                        <p className="font-medium">Juliezajanepatac@gmail.com</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Phone No.</p>
                        <p className="font-medium">+639768564738</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Gender</p>
                        <p className="font-medium">Female</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Date of Birth</p>
                        <p className="font-medium">August 02, 2003</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* ADDRESS */}
                <TabsContent value="address">
                  <Card className="rounded-xl border shadow-sm">
                    <CardHeader>
                      <h3 className="text-xl font-semibold text-gray-900">📍 Address Information</h3>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-sm text-gray-800">
                      <div>
                        <p className="text-gray-500">Region</p>
                        <p className="font-medium">Region VII - Central Visayas</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Province</p>
                        <p className="font-medium">Cebu</p>
                      </div>
                      <div>
                        <p className="text-gray-500">City</p>
                        <p className="font-medium">Cebu City</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Barangay</p>
                        <p className="font-medium">Lahug</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Street</p>
                        <p className="font-medium">Salinas Drive</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* EMPLOYMENT */}
                <TabsContent value="employment">
                  <Card className="rounded-xl border shadow-sm">
                    <CardHeader>
                      <h3 className="text-xl font-semibold text-gray-900">💼 Employment Details</h3>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-sm text-gray-800">
                      <div>
                        <p className="text-gray-500">Position</p>
                        <p className="font-medium">Software Engineer</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Department</p>
                        <p className="font-medium">IT</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Date Hired</p>
                        <p className="font-medium">February 15, 2022</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Status</p>
                        <p className="font-medium">Regular</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* DOCUMENTS */}
                <TabsContent value="documents">
                  <div className="overflow-x-auto rounded-xl border border-gray-200">
                    <table className="min-w-full text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-2 text-left">Uploaded File</th>
                          <th className="px-4 py-2 text-left">Name</th>
                          <th className="px-4 py-2 text-left">Description</th>
                          <th className="px-4 py-2 text-left">Type</th>
                          <th className="px-4 py-2 text-left">Expiry Date</th>
                          <th className="px-4 py-2 text-left">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[...Array(3)].map((_, idx) => (
                          <tr key={idx} className="even:bg-blue-50">
                            <td className="px-4 py-2">Deloy-Certificate.png</td>
                            <td className="px-4 py-2">Figma Certificate</td>
                            <td className="px-4 py-2">Cherry Ann Deloy’s Figma Certificate.</td>
                            <td className="px-4 py-2">
                              <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
                                Certificate
                              </span>
                            </td>
                            <td className="px-4 py-2">
                              <Input type="date" className="border border-gray-300 rounded-md px-2 py-1 text-sm" />
                            </td>
                            <td className="px-4 py-2">
                              <button className="text-red-500 hover:text-red-600 text-lg">
                                <TrashIcon className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
              </Tabs>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle className="flex justify-center items-center">
                <span className="text-[#EE7A2A] text-3xl font-lg text-center">Confirm Deletion?</span>
              </DialogTitle>
            </DialogHeader>
            <div className="flex justify-center items-center">
              <p className="text-center">Do you want to delete this Employee?</p>
            </div>
            <div className="w-full flex justify-center items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setShowDeleteDialog(false)}
                className="bg-[#EE7A2A] text-white w-[10rem]"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                className="bg-white border-[#EE7A2A] border-2 text-[#EE7A2A] w-[10rem]  hover:text-[#EE7A2A]"
              >
                Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Pagination */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" className="bg-[#624DE3]">
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
