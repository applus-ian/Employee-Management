'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { useState } from 'react';
import { RecordCol } from '@/schemas';
import { useDeleteRecord } from '@/hooks/records/use-delete-record';
import { EditInformation } from './edit-information';

export const columns: ColumnDef<RecordCol>[] = [
  {
    accessorKey: 'employee_id',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Employee ID
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    meta: {
      label: 'Employee ID',
    },
  },
  {
    accessorKey: 'profile',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Profile
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const url = row.original.profile;
      return <img src={url} alt="Profile" className="w-10 h-10 rounded-full object-cover" />;
    },
    meta: {
      label: 'Profile',
    },
  },
  {
    accessorKey: 'full_name',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Full Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    meta: {
      label: 'Full Name',
    },
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Job Position
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    meta: {
      label: 'Job Position',
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    meta: {
      label: 'Email',
    },
  },
  {
    accessorKey: 'user_role',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Role
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    meta: {
      label: 'Role',
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    meta: {
      label: 'Actions',
    },
    cell: ({ row }) => {
      const item = row.original;
      const [editOpen, setEditOpen] = useState(false);
      const [deleteOpen, setDeleteOpen] = useState(false);
      const { mutate: deleteRecord, isPending: isDeleting } = useDeleteRecord();

      // const handleCancel = () => {
      //   setEditOpen(false); // Close the edit dialog when cancel is clicked
      // };

      // const handleSave = async (updatedData: {}) => {
      //   //
      // };

      const handleDelete = async () => {
        try {
          await deleteRecord(item.employee_id);
          alert('Record deleted successfully!');
          setDeleteOpen(false);
        } catch (error) {
          console.error('Failed to delete record:', error);
        }
      };

      return (
        <div className="flex gap-2">
          {/* Edit Dialog */}
          <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogTrigger asChild>
              <button className="text-blue-500 hover:text-blue-700">
                <Edit size={18} />
              </button>
            </DialogTrigger>
            <DialogContent className="bg-white w-[75%]">
              <DialogHeader>
                <DialogTitle>Edit Record</DialogTitle>
              </DialogHeader>
              <EditInformation id={item.employee_id} />
            </DialogContent>
          </Dialog>

          {/* Delete Dialog */}
          <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
            <DialogTrigger asChild>
              <button className="text-red-500 hover:text-red-700">
                <Trash2 size={18} />
              </button>
            </DialogTrigger>
            <DialogContent className="bg-white">
              <DialogHeader>
                <DialogTitle className="flex justify-center items-center">
                  <span className="text-[#EE7A2A] text-3xl font-lg text-center">Confirm Deletion?</span>
                </DialogTitle>
              </DialogHeader>
              <div className="flex justify-center items-center">
                <p className="text-center">Do you want to delete this Document Type?</p>
              </div>
              <div className="px-5 pt-5 flex justify-center gap-x-6">
                <Button
                  onClick={handleDelete} // Call handleDelete to delete the record
                  className="bg-[#EE7A2A] text-white w-[10rem]"
                  disabled={isDeleting} // Disable button while deleting
                >
                  {isDeleting ? 'Deleting...' : 'Delete'} {/* Show 'Deleting...' while loading */}
                </Button>
                <DialogClose asChild>
                  <Button className="bg-white border-[#EE7A2A] border-2 text-[#EE7A2A] w-[10rem]" disabled={isDeleting}>
                    Cancel
                  </Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];
