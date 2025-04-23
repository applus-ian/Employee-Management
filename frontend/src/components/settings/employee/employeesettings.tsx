import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TextSearch, CirclePlus, Search, Edit, Trash2 } from 'lucide-react';
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// 🔐 TabKey now inferred from navLinks — no duplication needed
const navLinks = [
  { name: 'Roles & Permissions', href: 'Roles' },
  { name: 'Skills', href: 'Skills' },
  { name: 'Documents', href: 'Documents' },
] as const;

type TabKey = (typeof navLinks)[number]['href'];
type TableRow = Record<string, string>;

const tableDataConfig: Record<TabKey, { columns: string[]; rows: TableRow[] }> = {
  Roles: {
    columns: ['User Role', 'Permissions', 'Actions'],
    rows: [
      { name: 'View Users', scope: 'Read Only' },
      { name: 'Edit Users', scope: 'Full Access' },
    ],
  },
  Skills: {
    columns: ['Name', 'Description', 'Category', 'Action'],
    rows: [
      { id: 'S01', name: 'JavaScript', Category: 'Advanced' },
      { id: 'S02', name: 'React', Category: 'Intermediate' },
    ],
  },
  Documents: {
    columns: ['Name', 'Decription', 'Action'],
    rows: [
      { id: 'D01', title: 'Employee Handbook' },
      { id: 'D02', title: 'Safety Guidelines' },
    ],
  },
};

export default function EmployeeRolePage() {
  const [activeTab, setactiveTab] = useState<TabKey>('Roles');

  return (
    <div>
      <h2 className="text-xl font-semibold text-[#454D5A]">
        Employee {activeTab === 'Roles' ? 'Roles and Permissions' : activeTab} Settings
      </h2>

      {/* Nav */}
      <nav className="flex justify-between items-center w-full my-4">
        <ul className="flex">
          {navLinks.map((link) => {
            const isActive = activeTab === link.href;
            return (
              <li key={link.name} className="flex items-center justify-center pr-3">
                <button
                  onClick={() => setactiveTab(link.href)}
                  className={cn(
                    'inline-block items-center transition-colors font-medium text-xs px-2 py-1 text-[#344054] hover:text-[#EE7A2A] border rounded-md border-[#7E8899]',
                    isActive && 'text-black border-b-2 border-[#EE7A2A] bg-[#FFB582]',
                  )}
                >
                  {link.name}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Buttons for Skills */}
        <div className="flex gap-2">
          {/* Open Skills Dialog Button */}

          {activeTab === 'Skills' && (
            <Dialog>
              <DialogTrigger asChild>
                <button className="px-2 py-1 bg-[#EE7A2A] hover:bg-[#FFA161] text-white rounded-md text-xs font-medium">
                  <span className="flex items-center gap-1">
                    View Skill Category
                    <TextSearch size={18} strokeWidth={2} />
                  </span>
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Skills Dialog</DialogTitle>
                </DialogHeader>
                <div>
                  <p>This is a dialog specifically for the Skills tab.</p>
                </div>
              </DialogContent>
            </Dialog>
          )}

          {/* Add Button (only for Skills and Documents) */}
          <Dialog>
            <DialogTrigger asChild>
              <button className="px-2 py-1 text-[#EE7A2A] font-medium text-xs rounded-md hover:bg-[#FFA161] hover:text-white border border-[#EE7A2A] size-fit">
                <span className="flex items-center gap-1">
                  Add New {activeTab.slice(0, -1)}
                  <CirclePlus size={18} strokeWidth={2} />
                </span>
              </button>
            </DialogTrigger>
            <DialogContent className="w-full lg:!max-w-[45rem] lg:h-fit md:h-[90vh] sm:h-[90vh] h-[90vh] flex flex-col">
              <DialogHeader>
                <DialogTitle>Create New Employee {activeTab.slice(0, -1)}</DialogTitle>
              </DialogHeader>
              <div>
                {activeTab == 'Roles' && (
                  <form action="" method="post">
                    <div className="grid">
                      <div className="flex flex-col p-5">
                        <div>
                          <label>
                            <h3 className="text-black font-base">User Role</h3>
                          </label>
                        </div>
                        <div>
                          <input
                            type="text"
                            className="mt-2 px-4 py-2 pl-3 block w-full border rounded-xl bg-transparent border-gray-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter role name"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col p-5">
                        <label>
                          <h3 className="text-black font-base">Permissions</h3>
                        </label>
                        <div className="mt-2 px-4 py-2 pl-3 block w-full border rounded-xl bg-transparent border-gray-500 focus:border-indigo-500 sm:text-sm">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2"></div>
                        </div>
                      </div>
                      <div className=" px-5 pt-5 flex justify-center gap-x-6">
                        <Button className="bg-[#EE7A2A] text-white w-[10rem]">Save Changes</Button>
                        <Button className="bg-white border-[#EE7A2A] border-2 text-[#EE7A2A] w-[10rem]">Cancel</Button>
                      </div>
                    </div>
                  </form>
                )}

                {/* {activeTab == 'Skills' && (
                  
                  )}

                  {activeTab == 'Documents' && (
                  
                  )} */}
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
            <Input type="text" placeholder="Search Settings..." className="pl-10 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Table */}
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
                  {/* Render Category as a Badge */}
                  {key === 'Category' ? (
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
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Employee {activeTab}</DialogTitle>
                      </DialogHeader>
                      <div>
                        <p>Edit functionality for {activeTab} goes here.</p>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* Delete Dialog (only for Skills and Documents) */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="text-red-500 hover:text-red-700">
                        <Trash2 size={18} />
                      </button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Delete {activeTab}</DialogTitle>
                      </DialogHeader>
                      <div>
                        <p>Are you sure you want to delete this {activeTab.toLowerCase().slice(0, -1)}?</p>
                        <div className="flex justify-end gap-2 mt-4">
                          <button className="px-4 py-2 bg-gray-200 rounded-md">Cancel</button>
                          <button className="px-4 py-2 bg-red-500 text-white rounded-md">Delete</button>
                        </div>
                      </div>
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
    </div>
  );
}
