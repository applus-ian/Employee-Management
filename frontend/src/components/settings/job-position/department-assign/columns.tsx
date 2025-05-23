'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { EditDepartmentAssignForm } from './edit-form';
import { useState } from 'react';
import { DepartmentAssign, EditDepartmentAssignInput } from '@/schemas';
import { useUpdateDepartmentAssign } from '@/hooks/settings/job-position/department-assign/use-update-department-assign';
import { useDeleteDepartmentAssign } from '@/hooks/settings/job-position/department-assign/use-delete-department-assign';
import toast from 'react-hot-toast';

export const columns: ColumnDef<DepartmentAssign>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Department Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: 'parent_department.name',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Parent Department
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
      const { mutate: updateDepartmentAssign } = useUpdateDepartmentAssign();
      const { mutate: deleteDepartmentAssign, isPending: isDeleting } = useDeleteDepartmentAssign();

      const handleCancel = () => {
        setEditOpen(false);
      };

      const handleSave = async (updatedData: EditDepartmentAssignInput) => {
        try {
          await updateDepartmentAssign(updatedData);

          console.log(updatedData);
          toast.success(`Department Assign successfully updated!`);
          setEditOpen(false);
        } catch (error) {
          toast.error('Failed to update department assign!');
          console.error('Failed to update department assign:', error);
        }
      };

      const handleDelete = async () => {
        try {
          await deleteDepartmentAssign(item.id);
          toast.success('Department Assign successfully deleted!');
          setDeleteOpen(false);
        } catch (error) {
          toast.error('Failed to delete department assign!');
          console.error('Failed to delete department assign:', error);
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
                <DialogTitle>Edit Department Assign</DialogTitle>
              </DialogHeader>
              <EditDepartmentAssignForm department_assign={item} onCancel={handleCancel} onSave={handleSave} />
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
                <p className="text-center">Do you want to delete this Department?</p>
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
