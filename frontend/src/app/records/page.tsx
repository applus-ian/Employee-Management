'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrashIcon } from 'lucide-react';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { PencilIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

function EditRecordForm({ onCancel }: { onCancel: () => void }) {
  return (
    <div className="p-6 rounded-xl mb-6 pb-6">
      <h1 className="text-2xl font-semibold mb-8">Edit Employee Record</h1>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Row 1 */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">First Name</label>
          <input
            type="text"
            defaultValue="Cherry"
            className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Middle Name</label>
          <input
            type="text"
            defaultValue="Ann"
            className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
          />
        </div>

        {/* Row 2 */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">Last Name</label>
          <input
            type="text"
            defaultValue="Deloy"
            className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Suffix</label>
          <input
            type="text"
            defaultValue="Jr."
            className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
          />
        </div>

        {/* Row 3 */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            defaultValue="cherry@example.com"
            className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Phone No.</label>
          <input
            type="tel"
            defaultValue="09171234567"
            className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
          />
        </div>

        {/* Row 4 */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">Gender</label>
          <select
            defaultValue="Female"
            className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Date of Birth</label>
          <input
            type="date"
            defaultValue="1998-10-05"
            className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
          />
        </div>

        {/* Row 5 */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">Region</label>
          <input
            type="text"
            defaultValue="Region IV-A"
            className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Province</label>
          <input
            type="text"
            defaultValue="Laguna"
            className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
          />
        </div>

        {/* Row 6 */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">City/Municipality</label>
          <input
            type="text"
            defaultValue="Calamba"
            className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Barangay</label>
          <input
            type="text"
            defaultValue="Mamatid"
            className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
          />
        </div>

        {/* Row 7 */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">Street</label>
          <input
            type="text"
            defaultValue="123 F. Gomez"
            className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
          />
        </div>

        {/* Row 8 */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm text-gray-700 mb-1">Skills</label>
          <textarea
            defaultValue="UI/UX Design, Figma"
            className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
            rows={3}
          />
        </div>

        {/* Row 9 */}
        <div>
          <label className="block text-sm text-gray-800 mb-1">Job Position</label>
          <input
            type="text"
            defaultValue="UX Designer"
            className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-800 mb-1">Location Assignment</label>
          <input
            type="text"
            defaultValue="Design Department"
            className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
          />
        </div>
      </form>
      <div className="mt-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Upload Documents</h2>
          <button className="border border-orange-500 text-orange-500 px-4 py-1 text-sm rounded-full hover:bg-orange-500 hover:text-white">
            Upload Document
          </button>
        </div>

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
                    <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">Certificate</span>
                  </td>
                  <td className="px-4 py-2">
                    <input type="date" className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full" />
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
      </div>

      {/* Buttons */}
      <div className="col-span-1 md:col-span-2 flex gap-2 mt-10">
        <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded-xl hover:bg-orange-600 text-sm">
          Save Changes
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-300 text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

// Updated: New Employee Form Component with Cancel Button
function NewEmployeeForm({ onCancel }: { onCancel: () => void }) {
  return (
    <div className="p-6 rounded-xl mb-6 pb-6">
      <h1 className="text-2xl font-semibold mb-8">Create New Employee Records</h1>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Row 1 */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">First Name</label>
          <input
            type="text"
            className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Middle Name</label>
          <input
            type="text"
            className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
          />
        </div>

        {/* Row 2 */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">Last Name</label>
          <input
            type="text"
            className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Suffix</label>
          <input
            type="text"
            className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
          />
        </div>

        {/* Row 3 */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Phone No.</label>
          <input
            type="tel"
            className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
          />
        </div>

        {/* Row 4 */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">Gender</label>
          <select className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Date of Birth</label>
          <input
            type="date"
            className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
          />
        </div>

        {/* Row 5 */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">Region</label>
          <input
            type="text"
            className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Province</label>
          <input
            type="text"
            className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
          />
        </div>

        {/* Row 6 */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">City/Municipality</label>
          <input
            type="text"
            className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Barangay</label>
          <input
            type="text"
            className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
          />
        </div>

        {/* Row 7 */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">Street</label>
          <input
            type="text"
            className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
          />
        </div>

        {/* Row 8 */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm text-gray-700 mb-1">Skills</label>
          <textarea
            className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
            rows={3}
          />
        </div>

        {/* Row 9 */}
        <div>
          <label className="block text-sm text-gray-800 mb-1">Job Position</label>
          <input
            type="text"
            className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-800 mb-1">Location Assignment</label>
          <input
            type="text"
            className="border border-gray-300 rounded-xl px-4 py-2 text-sm w-full hover:border-orange-500"
          />
        </div>
      </form>

      {/* Upload Documents Section */}
      <div className="mt-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Upload Documents</h2>
          <button className="border border-orange-500 text-orange-500 px-4 py-1 text-sm rounded-full hover:bg-orange-500 hover:text-white">
            Upload Document
          </button>
        </div>

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
                    <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">Certificate</span>
                  </td>
                  <td className="px-4 py-2">
                    <input type="date" className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full" />
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
      </div>
      {/* Buttons */}
      <div className="col-span-1 md:col-span-2 flex gap-2 mt-10">
        <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded-xl hover:bg-orange-600 text-sm">
          Save Employee
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-300 text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default function RecordsPage() {
  const [showForm, setShowForm] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [activeTab, setActiveTab] = useState('Personal Info');
  const [formType, setFormType] = useState<null | 'new' | 'edit'>(null); // Track form type ('new' or 'edit')

  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<number | null>(null);

  const handleDelete = () => {
    if (employeeToDelete !== null) {
      console.log('Deleting employee with ID:', employeeToDelete);
      setShowDeleteDialog(false);
      setEmployeeToDelete(null);
    }
  };

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
        <div className="ml-0 lg:ml-[15rem] px-4 sm:px-6 py-6 bg-muted/40 h-full">
          <div className="max-w-[100rem] mx-auto space-y-6 w-full h-full flex flex-col">
            {/* Header */}
            <Dialog open={showDialog} onOpenChange={setShowDialog}>
              <DialogContent className="max-w-4xl px-10 py-12 bg-white  shadow-2xl flex w-[50%] h-[90%] overflow-y-auto ">
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
                    <TabsList className="flex gap-4 mt-1 mb-2 pb-[-0px] rounded-none border-b w-full justify-center">
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
                    <TabsContent value="personal" className="mt-8 ">
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
                    <TabsContent value="address" className="mt-8">
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
                    <TabsContent value="employment" className="mt-8">
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
                    <TabsContent value="documents" className="mt-8">
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
                                  <input type="date" className="border border-gray-300 rounded-md px-2 py-1 text-sm" />
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
                  {/* Top: Title */}

                  <CardTitle className="text-lg font-semibold text-gray-800">Employee Record</CardTitle>

                  {/* Filters + New Employee Button */}
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex gap-2 flex-wrap">
                      <select className="border rounded-md px-4 py-2 text-sm font-medium">
                        <option value="">All Departments</option>
                        <option value="IT">IT</option>
                        <option value="HR">HR</option>
                        <option value="Finance">Finance</option>
                      </select>
                      <select className="border rounded-md px-4 py-2 text-sm font-medium">
                        <option value="">All Positions</option>
                        <option value="Manager">Manager</option>
                        <option value="Developer">Developer</option>
                        <option value="Recruiter">Recruiter</option>
                      </select>
                      <select className="border rounded-md px-4 py-2 text-sm font-medium">
                        <option value="">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>

                    <div className="ml-auto">
                      {!showForm && (
                        <Button
                          variant="outline"
                          className="text-orange-600 border-orange-400 bg-white"
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
                  (showForm && formType === 'edit' && <EditRecordForm onCancel={() => setShowForm(false)} />)}

                {!showForm && (
                  <>
                    {/* Top bar: Show entries + Search */}
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
                            <TableRow
                              key={i}
                              className="even:bg-[#F7F6FE] cursor-pointer hover:bg-gray-100"
                              onClick={() => setShowDialog(true)}
                            >
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
                                {' '}
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-[#624DE3] border-none bg-white"
                                  onClick={(e) => {
                                    e.stopPropagation(); // Prevent row click
                                    handleEditEmployee();
                                  }}
                                >
                                  <PencilIcon className="w-8 h-8" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-red-600 border-none bg-white"
                                  onClick={(e) => {
                                    e.stopPropagation(); // Prevent row click
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
                      <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Employee Profile</DialogTitle>
                          </DialogHeader>
                          <div className="text-sm text-gray-600">Details about the employee here...</div>
                          <DialogFooter>
                            <Button onClick={() => setShowProfileDialog(false)}>Close</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      {/* Delete Confirmation Dialog */}
                      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                        <DialogContent>
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
                              className="bg-white border-[#EE7A2A] border-2 text-[#EE7A2A] w-[10rem]"
                            >
                              Delete
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
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
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
