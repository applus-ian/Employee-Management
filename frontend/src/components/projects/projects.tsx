import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CirclePlus, Search, Edit, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import NewProjectForm from './create-form';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const navLinks = [{ name: 'Projects', href: 'Projects' }] as const;

type TabKey = (typeof navLinks)[number]['href'];
type TableRow = Record<string, string>;

const tableDataConfig: Record<TabKey, { columns: string[]; rows: TableRow[] }> = {
  Projects: {
    columns: ['Project Name', 'Description', 'Status', 'Action'],
    rows: [
      { name: 'Project Alpha', description: 'Developing new features', status: 'Ongoing' },
      { name: 'Project Beta', description: 'Bug fixes and maintenance', status: 'Completed' },
    ],
  },
};

export default function EmployeeProjectsPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeTab, setActiveTab] = useState<TabKey>('Projects');

  // Placeholder functions for onCancel and onSave
  const handleCancel = () => {
    console.log('Cancelled');
  };

  const handleSave = () => {
    console.log('Saved');
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-[#454D5A]">Employee {activeTab} Settings</h2>

      {/* Navigation Tabs */}
      <nav className="flex justify-between items-center w-full my-4">
        <div className="flex gap-4">
          {/* Status Filter */}
          <div className="relative">
            <Select>
              <SelectTrigger className="ml-2 px-3 py-1 rounded-md bg-gray-100 text-sm flex items-center gap-2">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              {/* SelectContent to wrap the SelectItems */}
              <SelectContent className="rounded-md bg-white shadow-md">
                <SelectItem value="ongoing">Ongoing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="on_hold">On Hold</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Priority Filter */}
          <div className="relative">
            <Select>
              <SelectTrigger className="ml-2 px-3 py-1 rounded-md bg-gray-100 text-sm flex items-center gap-2">
                <SelectValue placeholder="All Priorities" />
              </SelectTrigger>
              {/* SelectContent to wrap the SelectItems */}
              <SelectContent className="rounded-md bg-white shadow-md">
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <button className="px-2 py-1 text-[#EE7A2A] font-medium text-xs rounded-md hover:bg-[#FFA161] hover:text-white border border-[#EE7A2A] flex items-center gap-1">
                Add New Project
                <CirclePlus size={18} strokeWidth={2} />
              </button>
            </DialogTrigger>
            <DialogContent className="w-full lg:!max-w-[45rem] h-fit flex flex-col">
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
              </DialogHeader>
              <div>
                <NewProjectForm onCancel={handleCancel} onSave={handleSave} />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </nav>

      {/* Filter Bar */}
      <div className="flex justify-between pb-3">
        <div className="order-1 pr-5">
          <div className="flex items-center gap-2">
            <span>Show</span>
            <select className="rounded-md bg-gray-200 px-2 py-1 text-sm">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <span>entries</span>
          </div>
        </div>
        <div className="order-2 pr-10 w-full">
          <div className="relative bg-white rounded-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
            <Input type="text" placeholder={`Search ${activeTab}...`} className="pl-10 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Data Table */}
      <Table>
        <TableHeader>
          <TableRow>
            {tableDataConfig[activeTab].columns.map((col, index) => (
              <TableHead
                key={index}
                className={index === tableDataConfig[activeTab].columns.length - 1 ? 'text-center' : ''}
              >
                {col}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableDataConfig[activeTab].rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {Object.entries(row).map(([key, value], cellIndex) => (
                <TableCell key={cellIndex}>
                  {/* Render Status or Category as a Badge */}
                  {key === 'status' || key === 'category' ? (
                    <Badge variant="outline" className="bg-gray-100 text-gray-800">
                      {value}
                    </Badge>
                  ) : (
                    String(value)
                  )}
                </TableCell>
              ))}

              {/* Action Column */}
              <TableCell className="text-center">
                <div className="flex items-center justify-center gap-2">
                  {/* Edit Dialog */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="text-blue-500 hover:text-blue-700">
                        <Edit size={18} />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="w-full lg:!max-w-[45rem] h-fit flex flex-col">
                      <DialogHeader>
                        <DialogTitle>Update Employee {activeTab.slice(0, -1)}</DialogTitle>
                      </DialogHeader>
                      <div>
                        {/* Add corresponding edit forms for each tab */}
                        {activeTab === 'Projects' && <NewProjectForm onCancel={handleCancel} onSave={handleSave} />}
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* Delete Dialog */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="text-red-500 hover:text-red-700">
                        <Trash2 size={18} />
                      </button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="flex justify-center items-center">
                          <span className="text-[#EE7A2A] text-3xl font-lg text-center">Confirm Deletion?</span>
                        </DialogTitle>
                      </DialogHeader>
                      <div className="flex justify-center items-center">
                        <p className="text-center">Do you want to delete this Employee {activeTab.slice(0, -1)}?</p>
                      </div>
                      <DialogClose asChild>
                        <div className=" px-5 pt-5 flex justify-center gap-x-6">
                          <Button className="bg-[#EE7A2A] text-white w-[10rem]">Delete</Button>
                          <Button className="bg-white border-[#EE7A2A] border-2 text-[#EE7A2A] w-[10rem]">
                            Cancel
                          </Button>
                        </div>
                      </DialogClose>
                    </DialogContent>
                  </Dialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
