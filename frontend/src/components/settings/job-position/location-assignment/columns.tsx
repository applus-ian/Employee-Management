'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { EditLocationAssignmentForm } from './edit-form';
import { useState } from 'react';
import { LocationAssignment, UpdateLocationAssignmentInput } from '@/schemas';
import { useUpdateLocationAssignment } from '@/hooks/settings/job-position/location-assignment/use-update-location-assignment';
import { useDeleteLocationAssignment } from '@/hooks/settings/job-position/location-assignment/use-delete-location-assignment';
import toast from 'react-hot-toast';

export const columns: ColumnDef<LocationAssignment>[] = [
  {
    accessorFn: (row) => `${row.employee.first_name} ${row.employee.last_name}`,
    id: 'employee',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Employee
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: 'job_position.title',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Job Title
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: 'country_assign.name',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Country Assign
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: 'office_assign.name',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Office Assign
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: 'team_assign.name',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Team Assign
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: 'department_assign.name',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Department Assign
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const item = row.original;
      const [editOpen, setEditOpen] = useState(false);
      const [deleteOpen, setDeleteOpen] = useState(false);
      const { mutate: updateLocationAssignment } = useUpdateLocationAssignment();
      const { mutate: deleteLocationAssignment, isPending: isDeleting } = useDeleteLocationAssignment();

      const handleCancel = () => {
        setEditOpen(false);
      };

      const handleSave = async (updatedData: UpdateLocationAssignmentInput) => {
        try {
          await updateLocationAssignment(updatedData);
          console.log(updatedData);
          toast.success(`Location Assignment updated successfully!`);
          setEditOpen(false);
        } catch (error) {
          toast.error('Failed to update location assignment!');
          console.error('Failed to update location assignment:', error);
        }
      };

      const handleDelete = async () => {
        try {
          await deleteLocationAssignment(item.id);
          toast.success('Location Assignment deleted successfully!');
          setDeleteOpen(false);
        } catch (error) {
          toast.error('Failed to delete location assignment!');
          console.error('Failed to delete location assignment:', error);
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
            <DialogContent className="bg-white w-[50%]">
              <DialogHeader>
                <DialogTitle>Edit Location Assignment</DialogTitle>
              </DialogHeader>
              <EditLocationAssignmentForm location_assignment={item} onCancel={handleCancel} onSave={handleSave} />
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
                <p className="text-center">Do you want to delete this Location Assignment?</p>
              </div>
              <div className="px-5 pt-5 flex justify-center gap-x-6">
                <Button onClick={handleDelete} className="bg-[#EE7A2A] text-white w-[10rem]" disabled={isDeleting}>
                  {isDeleting ? 'Deleting...' : 'Delete'}
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
